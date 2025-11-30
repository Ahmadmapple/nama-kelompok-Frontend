import React, { useState, useEffect } from 'react';
import QuizProgress from './QuizProgress';

const QuizQuestion = ({ quiz, question, currentQuestion, totalQuestions, onAnswer, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(question.timeLimit || 30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state ketika question berubah
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
    const currentQuestionTime = question.timeLimit || 30;
    setTimeLeft(currentQuestionTime);
  }, [currentQuestion, question]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Timeout
      return;
    }

    const timer = setTimeout(() => {
      if (!isAnswered) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleAnswer = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);

    // Auto proceed setelah 3 detik melihat penjelasan
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 3000);
  };

  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const getOptionStyle = (index) => {
    if (!isAnswered) {
      return selectedAnswer === index
        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
    }

    // Setelah dijawab
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 ring-2 ring-green-200';
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 ring-2 ring-red-200';
    } else {
      return 'border-gray-200 bg-gray-50 opacity-70';
    }
  };

  const getOptionTextStyle = (index) => {
    if (!isAnswered) return 'text-gray-700';
    
    if (index === question.correctAnswer) {
      return 'text-green-700';
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'text-red-700';
    } else {
      return 'text-gray-500';
    }
  };

  const getOptionIcon = (index) => {
    if (!isAnswered) {
      return selectedAnswer === index ? '⏳' : getOptionLetter(index);
    }

    if (index === question.correctAnswer) {
      return '✅';
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return '❌';
    } else {
      return getOptionLetter(index);
    }
  };

  const getOptionIconStyle = (index) => {
    if (!isAnswered) {
      return selectedAnswer === index
        ? 'bg-indigo-500 text-white'
        : 'bg-gray-100 text-gray-700';
    }

    if (index === question.correctAnswer) {
      return 'bg-green-500 text-white';
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-gray-200 text-gray-500';
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container-optimized">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-strong border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              disabled={isAnswered}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Keluar Kuis
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600 text-sm">
                Soal {currentQuestion + 1} dari {totalQuestions}
              </p>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${
                timeLeft > 10 ? 'text-green-600' : 
                timeLeft > 5 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {timeLeft}s
              </div>
              <div className="text-xs text-gray-500">Sisa waktu</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <QuizProgress
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              quiz={quiz}
              userAnswer={selectedAnswer}
              correctAnswer={question.correctAnswer}
              isAnswered={isAnswered}
            />
          </div>

          {/* Question Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-strong border border-gray-100 p-8">
              
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {question.difficulty === 'easy' ? 'M' : 
                   question.difficulty === 'medium' ? 'S' : 'H'}
                </div>
                <div>
                  <div className="text-sm text-gray-500 capitalize">{question.difficulty}</div>
                  <div className="text-sm text-gray-600">{question.timeLimit || 30} detik</div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                  {question.question}
                </h2>
                
                {/* Options */}
                <div className="space-y-4">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${getOptionStyle(index)} ${
                        !isAnswered ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${getOptionIconStyle(index)}`}>
                          {getOptionIcon(index)}
                        </div>
                        <span className={`font-medium text-lg leading-relaxed ${getOptionTextStyle(index)}`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Explanation (shown after answering) */}
              {showExplanation && (
                <div className={`p-6 rounded-xl border-2 transition-all duration-500 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xl ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '🎉' : '💡'}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-3 ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isCorrect ? 'Jawaban Benar!' : 'Yuk, Pelajari Lagi!'}
                      </h4>
                      
                      <div className="prose prose-green max-w-none">
                        <p className={`text-lg leading-relaxed ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {question.explanation}
                        </p>
                        
                        {question.learningTips && (
                          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                            <div className="font-semibold text-green-800 mb-2">💡 Tips Belajar:</div>
                            <p className="text-green-700">{question.learningTips}</p>
                          </div>
                        )}
                      </div>

                      {/* Auto-progress indicator */}
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Lanjut ke soal berikutnya dalam 3 detik...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Tags */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {question.tags && question.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Hint */}
            {!isAnswered && (
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Pilih salah satu jawaban di atas atau tunggu waktu habis untuk lanjut otomatis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
