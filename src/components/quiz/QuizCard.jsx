import React from 'react';

// QuizCard sekarang menerima properti quiz yang berisi data lengkap (termasuk categoryName dan creatorName)
const QuizCard = ({ quiz, onStart }) => {
  const getDifficultyColor = (difficulty) => {
    // Mengubah 'easy', 'medium', 'hard' menjadi 'Pemula', 'Menengah', 'Lanjutan'
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'pemula':
        return 'bg-green-100 text-green-800';
      case 'medium':
      case 'menengah':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
      case 'lanjutan':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Menangani kasus jika quiz atau properti penting tidak ada
  if (!quiz) return null;

  // Menghitung jumlah soal (menggunakan data questions yang sudah tersedia)
  const questionsCount = quiz.questions?.length || 0;
  // Menghitung total waktu (menggunakan totalTime, asumsi sudah dalam menit)
  const duration = quiz.totaltime || 0;


  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all duration-300 group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={quiz.image} 
          alt={quiz.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {/* Tampilkan Kategori di bagian atas kiri */}
          {quiz.categoryName && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500 text-white shadow-md">
              {quiz.categoryName}
            </span>
          )}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          {/* Tampilkan Tingkat Kesulitan */}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
          {/* Tampilkan Status Selesai */}
          {quiz.completed && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              ✓ Selesai
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {quiz.title}
        </h3>
        
        {/* Baris Pembuat Kuis - MODIFIKASI DIMULAI DI SINI */}
        {quiz.creatorName && (
          <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
            <span className="text-gray-900">
                {/* Gambar Profil Pengguna */}
                {quiz.creatorImage ? (
                    <img 
                        src={quiz.creatorImage} 
                        alt={quiz.creatorName}
                        className="w-5 h-5 rounded-full object-cover border border-gray-200"
                    />
                ) : (
                    // Fallback jika tidak ada gambar (bisa pakai ikon user default)
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" />
                    </svg>
                )}
            </span>
            Dibuat oleh: <span className="font-medium text-gray-700">{quiz.creatorName}</span>
          </p>
        )}
        {/* MODIFIKASI SELESAI DI SINI */}

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {quiz.description}
        </p>
        
        {/* Quiz Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 border-t pt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {questionsCount} soal
            </span>

              {/* Tambahkan pemisah visual (Separator) hanya jika ada durasi */}
              {duration > 0 && ( // Perbaikan pengecekan
                <span className="text-gray-300">|</span>
              )}
              
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration} menit
            </span>
          </div>
          
          {/* Skor yang sudah dicapai */}
          {quiz.completed && quiz.score !== null && (
            <span className="font-bold text-lg text-green-600">
              {quiz.score}%
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <button
          onClick={onStart}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg ${
            quiz.completed 
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
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