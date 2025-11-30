import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEnhancedQuiz } from '../context/EnhancedQuizContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuizCard from '../components/quiz/QuizCard';
import QuizQuestion from '../components/quiz/QuizQuestion';
import EnhancedQuizResult from '../components/quiz/EnhancedQuizResult';
import { 
  getQuizQuestions, 
  getQuizQuestionsCount, 
  getQuizDuration,
  getQuizDifficulty 
} from '../data/enhancedQuizData';

const Quiz = () => {
  const { user } = useAuth();
  const { quizHistory } = useEnhancedQuiz();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data kuis sample dengan enhanced data
  const quizCategories = [
    { id: 'all', name: 'Semua Kuis', count: 3 },
    { id: 'digital-literacy', name: 'Literasi Digital', count: 1 },
    { id: 'fact-checking', name: 'Fact-Checking', count: 1 },
    { id: 'reading-techniques', name: 'Teknik Membaca', count: 1 },
    { id: 'critical-thinking', name: 'Berpikir Kritis', count: 1 }
  ];

  // Enhanced quizzes data dengan dynamic calculations
  const quizzes = [
    {
      id: 1,
      title: 'Literasi Digital Dasar',
      description: 'Uji kemampuan Anda dalam mengenali informasi digital yang terpercaya. Pelajari cara membedakan sumber informasi yang kredibel dan menghindari misinformasi.',
      category: 'digital-literacy',
      difficulty: getQuizDifficulty(1),
      questionsCount: getQuizQuestionsCount(1),
      duration: getQuizDuration(1),
      completed: quizHistory.some(quiz => quiz.quizId === 1),
      score: quizHistory.find(quiz => quiz.quizId === 1)?.score || null,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      tags: ['digital-literacy', 'critical-thinking', 'media-literacy']
    },
    {
      id: 2,
      title: 'Teknik Fact-Checking',
      description: 'Pelajari cara memverifikasi informasi dengan benar menggunakan tools dan metodologi yang terpercaya. Essential skill di era informasi digital.',
      category: 'fact-checking',
      difficulty: getQuizDifficulty(2),
      questionsCount: getQuizQuestionsCount(2),
      duration: getQuizDuration(2),
      completed: quizHistory.some(quiz => quiz.quizId === 2),
      score: quizHistory.find(quiz => quiz.quizId === 2)?.score || null,
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997cc6?auto=format&fit=crop&w=400&q=80',
      tags: ['fact-checking', 'verification', 'research']
    },
    {
      id: 3,
      title: 'Teknik Membaca Efektif',
      description: 'Tingkatkan kemampuan membaca dengan teknik skimming, scanning, dan speed reading yang tepat untuk efisiensi belajar yang maksimal.',
      category: 'reading-techniques',
      difficulty: getQuizDifficulty(3),
      questionsCount: getQuizQuestionsCount(3),
      duration: getQuizDuration(3),
      completed: quizHistory.some(quiz => quiz.quizId === 3),
      score: quizHistory.find(quiz => quiz.quizId === 3)?.score || null,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
      tags: ['reading-techniques', 'efficiency', 'learning']
    }
  ];

  const filteredQuizzes = selectedCategory === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);

  const searchedQuizzes = searchQuery 
    ? filteredQuizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredQuizzes;

  const startQuiz = (quizId) => {
    const questions = getQuizQuestions(quizId);
    const quizData = quizzes.find(q => q.id === quizId);
    
    if (questions.length === 0) {
      console.error('No questions found for quiz:', quizId);
      return;
    }
    
    setActiveQuiz({
      ...quizData,
      questions: questions
    });
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    if (!activeQuiz || !quizCompleted) return 0;
    
    const questions = activeQuiz.questions;
    let correctAnswers = 0;
    
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  // Jika sedang mengerjakan kuis, tampilkan component QuizQuestion
  if (activeQuiz && !quizCompleted) {
    return (
      <QuizQuestion
        quiz={activeQuiz}
        question={activeQuiz.questions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={activeQuiz.questions.length}
        onAnswer={handleAnswer}
        onBack={resetQuiz}
      />
    );
  }

  // Jika kuis selesai, tampilkan EnhancedQuizResult
  if (quizCompleted) {
    return (
      <EnhancedQuizResult
        quiz={activeQuiz}
        score={calculateScore()}
        userAnswers={userAnswers}
        questions={activeQuiz.questions}
        onRetry={() => {
          resetQuiz();
          startQuiz(activeQuiz.id);
        }}
        onBack={resetQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Tantangan Literasi
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Uji <span className="gradient-text">Kemampuan Literasi</span> Anda
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Tantang diri Anda dengan kuis interaktif yang dirancang untuk meningkatkan 
              kemampuan membaca kritis, analisis informasi, dan berpikir logis.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{quizzes.length} Kuis Tersedia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{quizHistory.length} Kuis Diselesaikan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Level {user?.profileData?.level || 1}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-optimized">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari kuis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quizCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-16">
        <div className="container-optimized">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Semua Kuis' : quizCategories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {searchedQuizzes.length} kuis tersedia
                {searchQuery && ` untuk "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Selesai
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Tersedia
              </span>
            </div>
          </div>

          {searchedQuizzes.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada kuis ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="btn btn-primary"
              >
                Tampilkan Semua Kuis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedQuizzes.map(quiz => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={() => startQuiz(quiz.id)}
                />
              ))}
            </div>
          )}

          {/* Progress CTA */}
          {user && quizHistory.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Lihat Progress Belajar Anda
                </h3>
                <p className="text-gray-600 mb-6">
                  Pantau perkembangan kemampuan literasi Anda dengan detail analytics dan achievement tracking.
                </p>
                <Link 
                  to="/progress" 
                  className="btn btn-primary btn-lg inline-flex items-center gap-2"
                >
                  <span>📊</span>
                  Lihat Dashboard Progress
                </Link>
              </div>
            </div>
          )}

          {/* Motivation Section for New Users */}
          {(!user || quizHistory.length === 0) && (
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Siap Memulai Perjalanan Literasi?
                </h3>
                <p className="opacity-90 mb-6">
                  Mulai dengan kuis pertama Anda dan dapatkan XP, lencana, serta track progress belajar Anda.
                </p>
                {!user ? (
                  <Link 
                    to="/register" 
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                  >
                    <span>🚀</span>
                    Daftar Gratis untuk Mulai
                  </Link>
                ) : (
                  <p className="text-lg font-semibold">
                    Pilih kuis di atas untuk memulai!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Quiz;
