import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEnhancedQuiz } from "../context/EnhancedQuizContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import QuizCard from "../components/quiz/QuizCard";
import QuizQuestion from "../components/quiz/QuizQuestion";
import EnhancedQuizResult from "../components/quiz/EnhancedQuizResult";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

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
  const [ownershipFilter, setOwnershipFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
    status: "aktif",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchParams] = useSearchParams();

  // 1. Fetch data kuis dari backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/kuis/`);
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
    let result =
      selectedCategory === "all"
        ? quizzes
        : quizzes.filter((q) => q.category === selectedCategory);

    if (ownershipFilter === "mine") {
      if (!user?.id) return [];
      result = result.filter((q) => q.creatorid === user.id);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query) ||
          (q.tags && q.tags.some((t) => t.toLowerCase().includes(query)))
      );
    }
    return result;
  }, [quizzes, selectedCategory, ownershipFilter, searchQuery, user]);

  const openEdit = (quiz) => {
    setEditingQuiz(quiz);
    setEditForm({
      title: quiz.title || "",
      description: quiz.description || "",
      category: quiz.category || "digital-literacy",
      difficulty: quiz.difficulty || "easy",
      status: quiz.status || "aktif",
    });
  };

  const submitEdit = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("mindloop_token");
      await axios.put(
        `${API_BASE_URL}/api/kuis/${editingQuiz.id}`,
        {
          title: editForm.title,
          description: editForm.description,
          category: editForm.category,
          difficulty: editForm.difficulty,
          status: editForm.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === editingQuiz.id
            ? {
                ...q,
                title: editForm.title,
                description: editForm.description,
                category: editForm.category,
                difficulty: editForm.difficulty,
                status: editForm.status,
              }
            : q
        )
      );

      setEditingQuiz(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("mindloop_token");
      await axios.delete(`${API_BASE_URL}/api/kuis/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className="container-optimized flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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

          <div className="flex justify-end">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setOwnershipFilter("all")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  ownershipFilter === "all"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setOwnershipFilter("mine")}
                disabled={!user}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  ownershipFilter === "mine"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600 hover:text-gray-900"
                } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Buatan Saya
              </button>
            </div>
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
                const historyEntry = user ? quizHistory.find((h) => h.quizId === quiz.id) : null;
                const isCompleted = !!historyEntry;

                const isOwner = user?.id && quiz.creatorid === user.id;

                return (
                  <div key={quiz.id} className="relative">
                    <QuizCard
                      quiz={{
                        ...quiz,
                        questionsCount: quiz.questions?.length || 0,
                        duration: quiz.totaltime,
                        categoryName:
                          STATIC_CATEGORIES.find((c) => c.id === quiz.category)?.name ||
                          "Umum",
                        creatorName: quiz.creatorname || "MindLoop Team",
                        creatorImage: quiz.creatorimage,
                        completed: isCompleted,
                        score: isCompleted ? historyEntry.score : null,
                      }}
                      onStart={() => startQuiz(quiz.id)}
                    />

                    {isOwner && (
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openEdit(quiz);
                          }}
                          className="bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteId(quiz.id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {editingQuiz && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start sm:items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-lg font-semibold mb-4">Edit Kuis</h2>

              <div className="grid grid-cols-1 gap-3">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Judul"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Deskripsi"
                  rows={3}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {STATIC_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editForm.difficulty}
                    onChange={(e) => setEditForm((p) => ({ ...p, difficulty: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingQuiz(null)}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                  disabled={isSaving}
                >
                  Batal
                </button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  disabled={isSaving}
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start sm:items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-2">Hapus Kuis?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Kuis yang dihapus tidak bisa dikembalikan.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Quiz;