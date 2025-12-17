import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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
          `http://localhost:3000/api/article/${id}`,
          { headers }
        );

        if (!isMounted) return;

        setArticle(res.data);
        setIsLiked(Boolean(res.data.is_liked));
        setLoading(false);

        // fire & forget view counter
        axios.post(`http://localhost:3000/api/article/${id}/view`).catch(() => {});
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

        const res = await axios.get("http://localhost:3000/api/kuis", {
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
      alert("Silakan login terlebih dahulu!");
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
        `http://localhost:3000/api/article/${id}/like`,
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

      <div className="container-custom py-10 mt-12">
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

              <h1 className="text-4xl font-bold mb-6">
                {article.nama_artikel}
              </h1>

              <div className="flex items-center gap-4 mb-6">
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
                className="w-full h-96 object-cover rounded-2xl mb-10"
              />

              <div
                className="prose prose-lg max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: article.isi_artikel }}
              />

              <button onClick={handleLike}>
                {isLiked ? "❤️ Disukai" : "🤍 Suka"}
              </button>
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