// src/components/quiz/EnhancedQuizResult.jsx
import React, { useState, useEffect } from 'react';
import { useEnhancedQuiz } from '../../context/EnhancedQuizContext';

const EnhancedQuizResult = ({ quiz, score, userAnswers, questions, onRetry, onBack }) => {
  const { saveQuizResult } = useEnhancedQuiz();
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [newBadges, setNewBadges] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const correctAnswers = userAnswers.filter((answer, index) => 
    answer === questions[index].correctAnswer
  ).length;

  useEffect(() => {
    const saveResult = async () => {
      setIsLoading(true);
      try {
        const result = await saveQuizResult({
          quizId: quiz.id,
          quizTitle: quiz.title,
          score: score,
          totalQuestions: questions.length,
          correctAnswers: correctAnswers,
          difficulty: quiz.difficulty,
          category: quiz.category,
          userAnswers: userAnswers,
          questions: questions
        });

        setNewBadges(result.newBadges || []);
        setXpEarned(result.quizResult.xpEarned);
      } catch (error) {
        console.error('Error saving quiz result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    saveResult();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-cyan-600';
    if (score >= 70) return 'from-yellow-500 to-amber-600';
    if (score >= 60) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return { 
      message: 'Luar Biasa!', 
      emoji: '🎉', 
      description: 'Penguasaan konsep yang sempurna!',
      color: 'text-green-600'
    };
    if (score >= 80) return { 
      message: 'Bagus Sekali!', 
      emoji: '👍', 
      description: 'Pemahaman yang sangat baik!',
      color: 'text-blue-600'
    };
    if (score >= 70) return { 
      message: 'Cukup Baik!', 
      emoji: '🙂', 
      description: 'Tingkatkan lagi untuk hasil terbaik!',
      color: 'text-yellow-600'
    };
    if (score >= 60) return { 
      message: 'Perlu Improvement', 
      emoji: '📚', 
      description: 'Butuh lebih banyak latihan',
      color: 'text-orange-600'
    };
    return { 
      message: 'Perlu Belajar Lagi', 
      emoji: '🎯', 
      description: 'Jangan menyerah, terus berlatih!',
      color: 'text-red-600'
    };
  };

  const getCategoryInsights = () => {
    const categoryStats = {};
    
    questions.forEach((question, index) => {
      const category = question.category || 'general';
      if (!categoryStats[category]) {
        categoryStats[category] = { total: 0, correct: 0 };
      }
      categoryStats[category].total++;
      if (userAnswers[index] === question.correctAnswer) {
        categoryStats[category].correct++;
      }
    });

    return Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total
    }));
  };

  const scoreInfo = getScoreMessage(score);
  const categoryInsights = getCategoryInsights();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Menyimpan hasil kuis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container-optimized max-w-6xl">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-strong border border-gray-100 p-6 mb-8">
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

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Score & Rewards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Score Card */}
            <div className={`bg-gradient-to-br ${getScoreColor(score)} text-white rounded-2xl p-8 text-center`}>
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={`${score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{score}%</div>
                  </div>
                </div>
              </div>
              
              <div className="text-4xl mb-4">{scoreInfo.emoji}</div>
              <h2 className="text-2xl font-bold mb-2">{scoreInfo.message}</h2>
              <p className="opacity-90">{scoreInfo.description}</p>
            </div>

            {/* XP & Rewards */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎁</span> 
                <span>Hadiah & XP</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-medium">XP Diperoleh</span>
                  <span className="text-blue-700 font-bold">+{xpEarned}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-700 font-medium">Jawaban Benar</span>
                  <span className="text-green-700 font-bold">{correctAnswers}/{questions.length}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="text-amber-700 font-medium">Akurasi</span>
                  <span className="text-amber-700 font-bold">{score}%</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-purple-700 font-medium">Kesulitan</span>
                  <span className="text-purple-700 font-bold capitalize">{quiz.difficulty}</span>
                </div>
              </div>
            </div>

            {/* New Badges */}
            {newBadges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>Lencana Baru!</span>
                </h3>
                <div className="space-y-3">
                  {newBadges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900">{badge.name}</div>
                        <div className="text-sm text-amber-700">{badge.description}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        badge.type === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                        badge.type === 'silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {badge.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <div className="space-y-3">
                <button
                  onClick={onRetry}
                  className="w-full btn btn-primary justify-center py-3 text-base font-semibold"
                >
                  <span className="text-lg">🔄</span>
                  Coba Lagi
                </button>
                <button
                  onClick={() => setShowDetailedReview(!showDetailedReview)}
                  className="w-full btn btn-secondary justify-center py-3 text-base font-semibold"
                >
                  <span className="text-lg">{showDetailedReview ? '📊' : '🔍'}</span>
                  {showDetailedReview ? 'Sembunyikan Review' : 'Lihat Review Detail'}
                </button>
                <button
                  onClick={onBack}
                  className="w-full btn btn-secondary justify-center py-3 text-base font-semibold"
                >
                  <span className="text-lg">📚</span>
                  Kuis Lainnya
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category Insights */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Analisis Kategori</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryInsights.map(insight => (
                  <div key={insight.category} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 capitalize">
                        {insight.category.replace('-', ' ')}
                      </span>
                      <span className={`font-bold text-lg ${
                        insight.accuracy >= 80 ? 'text-green-600' :
                        insight.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {insight.accuracy}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          insight.accuracy >= 80 ? 'bg-green-500' :
                          insight.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${insight.accuracy}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {insight.correct} dari {insight.total} soal benar
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Question Review */}
            {showDetailedReview && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">🔍 Review Detail Soal</h3>
                
                <div className="space-y-8">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    const userAnswerText = userAnswer !== undefined && userAnswer !== -1 
                      ? question.options[userAnswer] 
                      : 'Tidak dijawab';
                    const correctAnswerText = question.options[question.correctAnswer];

                    return (
                      <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-4 text-lg leading-relaxed">
                              Soal {index + 1}: {question.question}
                            </h4>
                            
                            {/* User's Answer */}
                            <div className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                              <div className="text-sm text-gray-600 mb-2 font-medium">Jawaban Anda:</div>
                              <div className={`font-medium text-lg ${
                                isCorrect ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {userAnswerText}
                              </div>
                            </div>
                            
                            {/* Correct Answer */}
                            <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200">
                              <div className="text-sm text-green-600 mb-2 font-medium">Jawaban Benar:</div>
                              <div className="font-medium text-lg text-green-700">{correctAnswerText}</div>
                            </div>
                            
                            {/* Detailed Explanation */}
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-blue-600 font-semibold text-lg">💡 Penjelasan Detail</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                {question.explanation}
                              </p>
                              
                              {/* Learning Tips */}
                              {question.learningTips && (
                                <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                                  <div className="text-blue-600 font-medium mb-2">🎯 Tips Belajar:</div>
                                  <p className="text-gray-600">{question.learningTips}</p>
                                </div>
                              )}
                              
                              {/* Related Concepts */}
                              {question.relatedConcepts && question.relatedConcepts.length > 0 && (
                                <div className="mt-4">
                                  <div className="text-blue-600 font-medium mb-2">📚 Konsep Terkait:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {question.relatedConcepts.map((concept, i) => (
                                      <span key={i} className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {concept}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Performance Summary */}
            {!showDetailedReview && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Ringkasan Performa</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                    <div className="text-sm text-green-700">Benar</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600 mb-1">{questions.length - correctAnswers}</div>
                    <div className="text-sm text-red-700">Salah</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{score}%</div>
                    <div className="text-sm text-blue-700">Akurasi</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-2xl font-bold text-amber-600 mb-1">{xpEarned}</div>
                    <div className="text-sm text-amber-700">XP Diperoleh</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuizResult;
//penanda