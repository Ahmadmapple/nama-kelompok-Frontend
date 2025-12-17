import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEnhancedQuiz } from "../context/EnhancedQuizContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import QuizCard from "../components/quiz/QuizCard";
import QuizQuestion from "../components/quiz/QuizQuestion";
import EnhancedQuizResult from "../components/quiz/EnhancedQuizResult";

const STATIC_CATEGORIES = [
  { id: "digital-literacy", name: "Literasi Digital" },
  { id: "fact-checking", name: "Fact-Checking" },
  { id: "reading-techniques", name: "Teknik Membaca" },
  { id: "skill-research", name: "Skill Research" },
  { id: "critical-thinking", name: "Berpikir Kritis" },
];

const Quiz = () => {
  const { user } = useAuth(); // Status login
  const { quizHistory } = useEnhancedQuiz(); // Data riwayat dari database

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();

  // 1. Fetch data kuis dari backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/kuis/");
        if (Array.isArray(response.data)) {
          const processedQuizzes = response.data.map((quiz) => ({
            ...quiz,
            questions: quiz.questions.map((q) => ({
              ...q,
              score: Number(q.score) || 0,
              correctAnswer: Number(q.correctAnswer) || 0,
              timeLimit: Number(q.timeLimit) || 30,
            })),
          }));
          setQuizzes(processedQuizzes);
        }
      } catch (error) {
        console.error("Gagal mengambil data kuis:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // 2. Handle deep link (?start=ID_KUIS)
  useEffect(() => {
    if (loading || quizzes.length === 0) return;
    const startId = searchParams.get("start");
    if (startId) {
      const quiz = quizzes.find((q) => q.id === startId);
      if (quiz) startQuiz(startId);
    }
  }, [loading, quizzes, searchParams]);

  // 3. Menghitung Kategori (useMemo agar tidak re-render berat)
  const quizCategories = useMemo(() => {
    const categoryCounts = quizzes.reduce((acc, quiz) => {
      acc[quiz.category] = (acc[quiz.category] || 0) + 1;
      return acc;
    }, {});

    const categoriesWithCount = STATIC_CATEGORIES.map((cat) => ({
      ...cat,
      count: categoryCounts[cat.id] || 0,
    }));

    return [
      { id: "all", name: "Semua Kuis", count: quizzes.length },
      ...categoriesWithCount,
    ];
  }, [quizzes]);

  // 4. Filter Kategori & Search
  const searchedQuizzes = useMemo(() => {
    let result = selectedCategory === "all" 
      ? quizzes 
      : quizzes.filter((q) => q.category === selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query) ||
          (q.tags && q.tags.some(t => t.toLowerCase().includes(query)))
      );
    }
    return result;
  }, [quizzes, selectedCategory, searchQuery]);

  // Logic Kuis
  const startQuiz = (quizId) => {
    const quizData = quizzes.find((q) => q.id === quizId);
    if (!quizData || !quizData.questions?.length) return;
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
    if (!activeQuiz) return 0;
    let totalScore = 0;
    activeQuiz.questions.forEach((q, i) => {
      if (userAnswers[i] === Number(q.correctAnswer)) {
        totalScore += Number(q.score) || 0;
      }
    });
    return Math.min(Math.round(totalScore), 100);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setQuizCompleted(false);
  };

  // RENDER: Tampilan Saat Mengerjakan
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

  // RENDER: Tampilan Hasil (EnhancedQuizResult)
  if (quizCompleted) {
    return (
      <EnhancedQuizResult
        quiz={activeQuiz}
        score={calculateScore()}
        userAnswers={userAnswers}
        questions={activeQuiz.questions}
        isGuest={!user} // Penting: Memberitahu jika ini tamu agar tidak simpan ke DB
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

      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Tantangan Literasi
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Uji <span className="gradient-text">Kemampuan Literasi</span> Anda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tantang diri Anda dan tingkatkan pemahaman bacaan Anda melalui kuis interaktif kami.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-gray-200 top-[72px] z-20">
        <div className="container-optimized flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-64">
            <input
              type="text"
              placeholder="Cari kuis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full lg:w-auto">
            {quizCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? "bg-white/20" : "bg-gray-300"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Kuis */}
      <section className="py-16">
        <div className="container-optimized">
          {loading ? (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">Memuat kuis...</p>
            </div>
          ) : searchedQuizzes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-500">Tidak ada kuis yang cocok dengan pencarian Anda.</p>
               <button onClick={() => {setSearchQuery(""); setSelectedCategory("all");}} className="mt-4 text-indigo-600 font-semibold">Lihat Semua Kuis</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedQuizzes.map((quiz) => {
                // LOGIKA SAKTI: Cek status selesai berdasarkan USER AKTIF
                // Jika user logout, quizHistory dari context akan kosong/reset, 
                // sehingga button otomatis kembali ke "Mulai Kuis"
                const historyEntry = user ? quizHistory.find((h) => h.quizId === quiz.id) : null;
                const isCompleted = !!historyEntry;

                return (
                  <QuizCard
                    key={quiz.id}
                    quiz={{
                      ...quiz,
                      questionsCount: quiz.questions?.length || 0,
                      duration: quiz.totaltime,
                      categoryName: STATIC_CATEGORIES.find(c => c.id === quiz.category)?.name || "Umum",
                      creatorName: quiz.creatorname || "MindLoop Team",
                      creatorImage: quiz.creatorimage,
                      completed: isCompleted, // Menentukan teks tombol "Mulai" vs "Coba Lagi"
                      score: isCompleted ? historyEntry.score : null,
                    }}
                    onStart={() => startQuiz(quiz.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quiz;