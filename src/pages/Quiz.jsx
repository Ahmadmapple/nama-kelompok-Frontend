import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEnhancedQuiz } from "../context/EnhancedQuizContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import QuizCard from "../components/quiz/QuizCard";
import QuizQuestion from "../components/quiz/QuizQuestion";
import EnhancedQuizResult from "../components/quiz/EnhancedQuizResult";

// Definisikan 5 Kategori Hardcode (ID harus sesuai dengan nilai 'category' di backend Anda)
const STATIC_CATEGORIES = [
  // Pastikan ID ini cocok dengan nilai 'category' yang dikirim dari backend
  { id: "literasi-digital", name: "Literasi Digital" },
  { id: "fact-checking", name: "Fact-Checking" },
  { id: "teknik-membaca", name: "Teknik Membaca" },
  { id: "skill-research", name: "Skill Research" },
  { id: "berpikir-kritis", name: "Berpikir Kritis" },
];

const Quiz = () => {
  const { user } = useAuth();
  const { quizHistory } = useEnhancedQuiz();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data dari backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/kuis/");
        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data kuis:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // 1. Definisikan dan Hitung Kategori Berdasarkan List Hardcode (useMemo)
  const quizCategories = useMemo(() => {
    // Hitung berapa banyak kuis yang dimiliki setiap kategori
    const categoryCounts = quizzes.reduce((acc, quiz) => {
      acc[quiz.category] = (acc[quiz.category] || 0) + 1;
      return acc;
    }, {});

    // Gabungkan list hardcode dengan jumlah (count) kuis yang sebenarnya
    const categoriesWithCount = STATIC_CATEGORIES.map((cat) => ({
      ...cat,
      count: categoryCounts[cat.id] || 0, // Dapatkan count, jika 0 maka tampilkan 0
    }));

    // Tambahkan kategori "Semua Kuis" di awal
    return [
      { id: "all", name: "Semua Kuis", count: quizzes.length },
      ...categoriesWithCount,
    ];
  }, [quizzes]);

  // 2. Filter Kategori
  const filteredQuizzes = useMemo(() => {
    return selectedCategory === "all"
      ? quizzes
      : quizzes.filter((quiz) => quiz.category === selectedCategory);
  }, [quizzes, selectedCategory]);

  // 3. Filter Search
  const searchedQuizzes = useMemo(() => {
    if (!searchQuery) return filteredQuizzes;

    const query = searchQuery.toLowerCase();
    return filteredQuizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.description.toLowerCase().includes(query) ||
        (quiz.tags &&
          quiz.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  }, [filteredQuizzes, searchQuery]);

  // Logic Kuis (start, answer, score, reset)
  const startQuiz = (quizId) => {
    const quizData = quizzes.find((q) => q.id === quizId);
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error("No questions found for quiz:", quizId);
      return;
    }
    setActiveQuiz(quizData);
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
    let correctAnswers = 0;

    activeQuiz.questions.forEach((q, i) => {
      // FIX PENTING: Konversi kunci jawaban dari string ke angka
      const correctAnswerIndex = Number(q.correctAnswer);

      // Bandingkan angka dengan angka
      if (userAnswers[i] === correctAnswerIndex) {
        correctAnswers++;
      }
    });

    return Math.round((correctAnswers / activeQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  // --- RENDERING LOGIC ---

  // 1. Render QuizQuestion (Sedang Mengerjakan)
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

  // 2. Render EnhancedQuizResult (Selesai)
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

  // 3. Render Daftar Kuis (Halaman Utama)
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
              Tantang diri Anda dengan kuis interaktif yang dirancang untuk
              meningkatkan kemampuan membaca kritis, analisis informasi, dan
              berpikir logis.
            </p>

          </div>
        </div>
      </section>

      {/* Category Filter & Search */}
      <section className="py-8 bg-white border-b border-gray-200">
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
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-2 py-1 flex-nowrap whitespace-nowrap max-w-full">
              {quizCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 lg:px-4 lg:py-2 lg:text-sm lg:gap-2 ${
                    selectedCategory === category.id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                  {/* Menampilkan jumlah kuis (count) di kategori tersebut */}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
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
          {loading ? (
            <p className="text-center text-gray-500 py-16">Memuat kuis...</p>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {/* Menggunakan nama kategori dari list hardcode */}
                    {quizCategories.find((cat) => cat.id === selectedCategory)
                      ?.name || "Kuis"}
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
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Tidak ada kuis ditemukan
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Coba gunakan kata kunci lain atau pilih kategori yang
                    berbeda
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Tampilkan Semua Kuis
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchedQuizzes.map((quiz) => (
                    <QuizCard
                      key={quiz.id}
                      quiz={{
                        ...quiz,
                        questionsCount: quiz.questions?.length || 0,
                        duration: quiz.totaltime, // Mengirim totalTime sebagai duration
                        completed: quizHistory.some(
                          (h) => h.quizId === quiz.id
                        ),
                        score:
                          quizHistory.find((h) => h.quizId === quiz.id)
                            ?.score || null,
                      }}
                      onStart={() => startQuiz(quiz.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Motivation Section for New Users */}
          {(!user || quizHistory.length === 0) && (
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Siap Memulai Perjalanan Literasi?
                </h3>
                <p className="opacity-90 mb-6 text-white">
                  Mulai dengan kuis pertama Anda dan dapatkan XP, lencana, serta
                  track progress belajar Anda.
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
                  <p className="text-lg text-white font-semibold">
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
