import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAlert } from "../context/AlertContext";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

/* ================================
   🔹 KATEGORI MAPPING
================================ */
const CATEGORY_LABEL = {
  "digital-literacy": "Literasi Digital",
  "fact-checking": "Fact Checking",
  "reading-tech": "Teknik Membaca",
  "skill-research": "Skill Research",
  "critical-thinking": "Berpikir Kritis",
};

const ArticleDetail = () => {
  const { id } = useParams();
  const { showAlert } = useAlert();

  const [article, setArticle] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🔹 RELATED QUIZ */
  const [relatedQuiz, setRelatedQuiz] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);

  /* ================================
     🔹 FETCH ARTICLE
  ================================ */
  useEffect(() => {
    let isMounted = true;

    const fetchArticle = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("mindloop_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(
          `${API_BASE_URL}/api/article/${id}`,
          { headers }
        );

        if (!isMounted) return;

        console.log('Article data:', res.data);
        console.log('is_liked from backend:', res.data.is_liked);
        
        setArticle(res.data);
        setIsLiked(res.data.is_liked === true);
        setLoading(false);

        // fire & forget view counter
        axios.post(`${API_BASE_URL}/api/article/${id}/view`).catch(() => {});
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
        setError("Gagal memuat artikel.");
        setLoading(false);
      }
    };

    fetchArticle();
    return () => (isMounted = false);
  }, [id]);

  /* ================================
     🔹 FETCH RELATED QUIZ
  ================================ */
  useEffect(() => {
    if (!article?.kategori) return;

    const fetchRelatedQuiz = async () => {
      try {
        setQuizLoading(true);

        const res = await axios.get(`${API_BASE_URL}/api/kuis`, {
          params: {
            category: article.kategori,
            limit: 3,
            simple: true,
          },
        });

        setRelatedQuiz(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Related quiz error:", err);
        setRelatedQuiz([]);
      } finally {
        setQuizLoading(false);
      }
    };

    fetchRelatedQuiz();
  }, [article?.kategori]);

  /* ================================
     🔹 LIKE HANDLER
  ================================ */
  const handleLike = async () => {
    if (!article) return;

    const token = localStorage.getItem("mindloop_token");
    if (!token) {
      showAlert({
        title: "Login Diperlukan",
        message: "Silakan login terlebih dahulu untuk menyukai artikel!",
        type: "warning"
      });
      return;
    }

    const prevLiked = isLiked;

    setIsLiked(!prevLiked);
    setArticle((prev) => ({
      ...prev,
      like_artikel: prevLiked
        ? prev.like_artikel - 1
        : prev.like_artikel + 1,
    }));

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/article/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLiked(res.data.is_liked);
      setArticle((prev) => ({
        ...prev,
        like_artikel: res.data.like_artikel,
      }));
    } catch {
      // rollback
      setIsLiked(prevLiked);
      setArticle((prev) => ({
        ...prev,
        like_artikel: prevLiked
          ? prev.like_artikel + 1
          : prev.like_artikel - 1,
      }));
    }
  };

  /* ================================
     🔹 HELPERS
  ================================ */
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const categoryLabel =
    CATEGORY_LABEL[article?.kategori] || article?.kategori;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="container-custom pt-24 pb-10">
        <article className="max-w-4xl mx-auto">
          {!loading && (
            <>
              <nav className="text-sm text-text-light flex gap-2 mb-4">
                <Link to="/">Beranda</Link>
                <span>›</span>
                <Link to="/articles">Artikel</Link>
                <span>›</span>
                <span className="font-medium text-dark-brown">
                  {categoryLabel}
                </span>
              </nav>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {article.nama_artikel}
              </h1>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <img
                  src={article.author?.avatar || "/default-avatar.png"}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {article.author?.nama}
                  </p>
                  <p className="text-sm text-text-light">
                    {formatDate(article.tanggal_publish)}
                  </p>
                </div>
              </div>

              <img
                src={article.gambar_artikel}
                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-2xl mb-10"
              />

              <div
                className="prose prose-lg max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: article.isi_artikel }}
              />

              {/* Stats & Actions */}
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👁️</span>
                      <span className="text-gray-600">{article.view_artikel || 0} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">❤️</span>
                      <span className="text-gray-600">{article.like_artikel || 0} likes</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      onClick={handleLike}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 w-full sm:w-auto ${
                        isLiked 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isLiked ? "❤️ Disukai" : "🤍 Suka"}
                    </button>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showAlert({
                          title: "Link Disalin!",
                          message: "Link artikel telah disalin ke clipboard",
                          type: "success"
                        });
                      }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 w-full sm:w-auto"
                    >
                      🔗 Share
                    </button>
                  </div>
                </div>
              </div>

            </>
          )}
        </article>

        {/* ================= RELATED QUIZ ================= */}
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-6">🎯 Kuis Terkait</h2>

          {quizLoading && <p className="text-center">Memuat kuis...</p>}

          {!quizLoading && relatedQuiz.length === 0 && (
            <p className="text-center italic">
              Tidak ada kuis terkait
            </p>
          )}

          {!quizLoading && relatedQuiz.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {relatedQuiz.map((quiz) => (
                <Link
                  key={quiz.id_kuis}
                  to={`/quiz?start=${quiz.id_kuis}`}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={quiz.gambar || "/quiz-placeholder.jpg"}
                    className="h-40 w-full object-cover rounded-t-2xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">
                      {quiz.judul_kuis}
                    </h3>
                    <div className="text-sm flex justify-between">
                      <span>
                        📝 {quiz.jumlah_soal ?? "-"} soal
                      </span>
                      <span>
                        ⏱️ {quiz.waktu_pengerjaan_menit ?? "-"} menit
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="text-center mt-16">
          <Link to="/articles" className="px-8 py-4 bg-dark-brown text-white rounded-xl">
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;