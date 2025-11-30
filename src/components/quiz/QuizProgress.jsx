import React from 'react';

const QuizProgress = ({ currentQuestion, totalQuestions, quiz, userAnswer, correctAnswer, isAnswered }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAnswerStatus = () => {
    if (!isAnswered) return null;
    
    if (userAnswer === correctAnswer) {
      return { text: 'Benar!', color: 'text-green-600', bg: 'bg-green-50', emoji: '✅' };
    } else {
      return { text: 'Salah', color: 'text-red-600', bg: 'bg-red-50', emoji: '❌' };
    }
  };

  const answerStatus = getAnswerStatus();

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 sticky top-6">
      <h3 className="font-bold text-gray-900 mb-4">Progress Kuis</h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-1">
          Soal {currentQuestion + 1} dari {totalQuestions}
        </div>
      </div>

      {/* Answer Status */}
      {answerStatus && (
        <div className={`mb-4 p-3 rounded-lg text-center font-semibold ${answerStatus.bg} ${answerStatus.color}`}>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">{answerStatus.emoji}</span>
            <span>{answerStatus.text}</span>
          </div>
        </div>
      )}

      {/* Quiz Info */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Kesulitan</span>
          <span className={`font-semibold capitalize ${getDifficultyColor(quiz.difficulty)} px-2 py-1 rounded`}>
            {quiz.difficulty}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Kategori</span>
          <span className="font-semibold text-gray-900 capitalize">{quiz.category?.replace('-', ' ') || 'General'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Durasi</span>
          <span className="font-semibold text-gray-900">{quiz.duration} menit</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
          <span>💡</span> Tips Mengerjakan
        </h4>
        <ul className="text-blue-800 text-xs space-y-1">
          <li>• Baca pertanyaan dengan teliti</li>
          <li>• Perhatikan kata kunci seperti "BUKAN" atau "PALING"</li>
          <li>• Eliminasi jawaban yang jelas salah</li>
          <li>• Manfaatkan waktu dengan bijak</li>
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-center">
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold text-gray-900">{currentQuestion + 1}</div>
            <div className="text-gray-600">Soal</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold text-gray-900">{totalQuestions - currentQuestion - 1}</div>
            <div className="text-gray-600">Tersisa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
