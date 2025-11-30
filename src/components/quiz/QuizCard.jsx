import React from 'react';

const QuizCard = ({ quiz, onStart }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula':
        return 'bg-green-100 text-green-800';
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all duration-300 group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={quiz.image} 
          alt={quiz.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
          {quiz.completed && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              ✓ Selesai
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
          {quiz.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {quiz.description}
        </p>
        
        {/* Quiz Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {quiz.questionsCount} soal
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {quiz.duration} menit
            </span>
          </div>
          
          {quiz.completed && quiz.score && (
            <span className="font-semibold text-green-600">
              {quiz.score}%
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <button
          onClick={onStart}
          className="w-full btn btn-primary justify-center py-3 group"
        >
          {quiz.completed ? 'Coba Lagi' : 'Mulai Kuis'}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
//penanda