// src/components/quiz/ProgressDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useEnhancedQuiz } from '../../context/EnhancedQuizContext';
import { useAuth } from '../../context/AuthContext';

const ProgressDashboard = () => {
  const { userStats, quizHistory, getPerformanceAnalytics, getCategoryPerformance, resetProgress } = useEnhancedQuiz();
  const { user } = useAuth();
  const analytics = getPerformanceAnalytics();
  const categoryPerformance = getCategoryPerformance();

  const levelProgress = Math.round((userStats.totalXP / userStats.xpToNextLevel) * 100);

  const getBadgeColor = (type) => {
    switch (type) {
      case 'gold': return 'from-yellow-400 to-amber-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'bronze': return 'from-amber-600 to-orange-600';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getCategoryColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-optimized">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Dashboard Progress Kuis</h1>
          <p className="text-gray-600">Pantau perkembangan kemampuan literasi Anda</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 text-center hover:shadow-strong transition-shadow">
            <div className="text-2xl font-bold text-indigo-600 mb-2">{userStats.totalQuizzes}</div>
            <div className="text-gray-600">Total Kuis</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 text-center hover:shadow-strong transition-shadow">
            <div className="text-2xl font-bold text-green-600 mb-2">{userStats.averageScore}%</div>
            <div className="text-gray-600">Rata-rata Nilai</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 text-center hover:shadow-strong transition-shadow">
            <div className="text-2xl font-bold text-amber-600 mb-2">{userStats.currentStreak}</div>
            <div className="text-gray-600">Hari Beruntun</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 text-center hover:shadow-strong transition-shadow">
            <div className="text-2xl font-bold text-blue-600 mb-2">Level {userStats.currentLevel}</div>
            <div className="text-gray-600">Level Saat Ini</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* XP Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Progress Level</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Level {userStats.currentLevel}</span>
                  <span className="text-gray-600 font-medium">Level {userStats.currentLevel + 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-4 rounded-full transition-all duration-1000 shadow-inner"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{userStats.totalXP} XP</span>
                  <span>{userStats.xpToNextLevel} XP untuk naik level</span>
                </div>
                <div className="text-center">
                  <span className="text-amber-600 font-semibold">
                    {levelProgress}% menuju Level {userStats.currentLevel + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Accuracy Stats */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Statistik Akurasi</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{userStats.accuracy}%</div>
                <div className="text-gray-600">Akurasi Keseluruhan</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">{userStats.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Jawaban Benar</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{userStats.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Soal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Badges Collection */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Koleksi Lencana</h3>
            {userStats.badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userStats.badges.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`text-center p-4 rounded-xl bg-gradient-to-br ${getBadgeColor(badge.type)} text-white transform hover:scale-105 transition-transform`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="font-semibold text-sm mb-1">{badge.name}</div>
                    <div className="text-xs opacity-90">{badge.type}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🏅</div>
                <p className="mb-2">Belum ada lencana</p>
                <p className="text-sm">Ayo kerjakan lebih banyak kuis untuk mendapatkan lencana!</p>
                <Link to="/quiz" className="btn btn-primary mt-4">
                  Mulai Kuis
                </Link>
              </div>
            )}
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Performa per Kategori</h3>
            {categoryPerformance.length > 0 ? (
              <div className="space-y-4">
                {categoryPerformance.map(category => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 capitalize">
                        {category.category.replace('-', ' ')}
                      </span>
                      <span className={`font-bold ${getCategoryColor(category.averageScore)}`}>
                        {category.averageScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getCategoryBgColor(category.averageScore)} transition-all duration-1000`}
                        style={{ width: `${category.averageScore}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {category.quizCount} kuis diselesaikan
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📊</div>
                <p>Belum ada data performa kategori</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Quiz History */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">📋 Riwayat Kuis Terbaru</h3>
            {quizHistory.length > 0 && (
              <button
                onClick={resetProgress}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Reset Progress
              </button>
            )}
          </div>
          
          {quizHistory.length > 0 ? (
            <div className="space-y-3">
              {quizHistory.slice(0, 10).map(quiz => (
                <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{quiz.quizTitle}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                      <span className="capitalize">{quiz.category?.replace('-', ' ') || 'General'}</span>
                      <span>•</span>
                      <span>{new Date(quiz.completedAt).toLocaleDateString('id-ID', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      quiz.score >= 80 ? 'text-green-600' :
                      quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quiz.score}%
                    </div>
                    <div className="text-sm text-gray-600">+{quiz.xpEarned} XP</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p className="mb-2">Belum ada riwayat kuis</p>
              <p className="text-sm mb-4">Ayo mulai kuis pertama Anda dan lihat progress Anda di sini!</p>
              <Link to="/quiz" className="btn btn-primary">
                Mulai Kuis Pertama
              </Link>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Selamat Datang, {user?.name}!</h3>
          <p className="opacity-90">
            Anda telah menyelesaikan {userStats.totalQuizzes} kuis dengan akurasi {userStats.accuracy}%
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <span>🔥 {userStats.currentStreak} hari beruntun</span>
            <span>⭐ Level {userStats.currentLevel}</span>
            <span>💎 {userStats.totalXP} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
//penanda