import React from 'react';

const QuizResult = ({ quiz, score, userAnswers, questions, onRetry, onBack }) => {
  const correctAnswers = userAnswers.filter((answer, index) => 
    answer === questions[index].correctAnswer
  ).length;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return 'Luar Biasa!';
    if (score >= 80) return 'Bagus Sekali!';
    if (score >= 70) return 'Cukup Baik!';
    if (score >= 60) return 'Perlu Improvement';
    return 'Perlu Belajar Lagi';
  };

  const getScoreEmoji = (score) => {
    if (score >= 90) return '🎉';
    if (score >= 80) return '👍';
    if (score >= 70) return '🙂';
    if (score >= 60) return '😐';
    return '📚';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-optimized max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Kuis
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600 text-center">Kuis Selesai!</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 mb-8 text-center">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeDasharray={`${score}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-4xl mb-4">{getScoreEmoji(score)}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getScoreMessage(score)}
          </h2>
          <p className="text-gray-600 mb-6">
            Anda menjawab {correctAnswers} dari {questions.length} soal dengan benar
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="btn btn-primary px-8"
            >
              Coba Lagi
            </button>
            <button
              onClick={onBack}
              className="btn btn-secondary px-8"
            >
              Kuis Lainnya
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detail Jawaban</h3>
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm ${
                    userAnswers[index] === question.correctAnswer 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  }`}>
                    {userAnswers[index] === question.correctAnswer ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Soal {index + 1}: {question.question}
                    </h4>
                    
                    {/* User's Answer */}
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Jawaban Anda: </span>
                      <span className={`text-sm font-medium ${
                        userAnswers[index] === question.correctAnswer 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {userAnswers[index] !== undefined 
                          ? question.options[userAnswers[index]]
                          : 'Tidak dijawab'
                        }
                      </span>
                    </div>
                    
                    {/* Correct Answer */}
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Jawaban Benar: </span>
                      <span className="text-sm font-medium text-green-600">
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                    
                    {/* Explanation */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Results */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Bagikan hasil kuis Anda</p>
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              Facebook
            </button>
            <button className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Twitter
            </button>
            <button className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
//penanda