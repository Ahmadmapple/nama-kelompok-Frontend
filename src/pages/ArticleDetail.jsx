import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch article with optional auth token
  useEffect(() => {
    let mounted = true;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("mindloop_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://localhost:3000/api/article/${id}`,
          { headers }
        );

        if (!mounted) return;

        setArticle(response.data);
        setIsLiked(response.data.is_liked || false);
        setLoading(false);

        // Increment view (no need to await blocking)
        axios.post(`http://localhost:3000/api/article/${id}/view`).catch(console.error);
      } catch (err) {
        if (!mounted) return;
        console.error("Fetch article error:", err);
        setError("Gagal memuat artikel.");
        setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Handle like/unlike
  const handleLike = async () => {
    if (!article) return;

    const token = localStorage.getItem("mindloop_token");
    if (!token) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    try {
      // Optimistic UI update
      const newLikeState = !isLiked;
      setIsLiked(newLikeState);
      setArticle((prev) => ({
        ...prev,
        like_artikel: newLikeState
          ? prev.like_artikel + 1
          : prev.like_artikel - 1,
      }));

      const response = await axios.post(
        `http://localhost:3000/api/article/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Sync with backend
      setIsLiked(response.data.is_liked);
      setArticle((prev) => ({
        ...prev,
        like_artikel: response.data.like_artikel,
      }));
    } catch (err) {
      console.error("Like toggle error:", err);
      alert("Gagal melakukan like. Silakan coba lagi.");

      // Revert optimistic update on failure
      setIsLiked((prev) => !prev);
      setArticle((prev) => ({
        ...prev,
        like_artikel: isLiked
          ? prev.like_artikel + 1
          : prev.like_artikel - 1,
      }));
    }
  };

  // Copy URL automatically
  useEffect(() => {
    if (article) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [article]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-300 rounded w-1/4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-64 bg-gray-300 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="container-custom py-8 mt-6">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <nav className="flex items-center gap-2 text-sm text-text-light mb-2 mt-6 py-2 relative z-10">
                  <Link to="/" className="hover:text-dark-brown transition-colors">Beranda</Link>
                  <span>›</span>
                  <Link to="/articles" className="hover:text-dark-brown transition-colors">Artikel</Link>
                  <span>›</span>
                  <span className="text-dark-brown font-medium">{article.kategori}</span>
                </nav>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-6 leading-tight">{article.nama_artikel}</h1>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={article.author?.avatar || "/default-avatar.png"}
                    alt={article.author?.nama || "Author"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-text-dark">{article.author?.nama || "Unknown"}</p>
                    <p className="text-sm text-text-light">{formatDate(article.tanggal_publish)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-text-light border-y border-light-brown py-4">
                  <span className="flex items-center gap-2">⏱️ {article.perkiraan_waktu_menit} menit</span>
                  <span className="flex items-center gap-2">👁️ {article.view_artikel} dilihat</span>
                  <span className="flex items-center gap-2">❤️ {article.like_artikel} suka</span>
                </div>

                {article.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="bg-light-brown text-dark-brown px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                )}
              </>
            )}
          </header>

          {loading ? (
            <div className="h-64 md:h-96 bg-gray-300 rounded-2xl mb-8 animate-pulse"></div>
          ) : (
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={article.gambar_artikel} alt={article.nama_artikel} className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}

          {!loading && (
            <div className="prose prose-lg max-w-none mb-8 animate-fade-in" dangerouslySetInnerHTML={{ __html: article.isi_artikel }} />
          )}

          {!loading && (
            <div className="flex flex-wrap gap-4 py-6 border-t border-light-brown">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:text-black"
              >
                {isLiked ? "❤️ Disukai" : "🤍 Suka"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link artikel telah disalin!");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold hover:text-black transition-all duration-300"
              >
                🔗 Bagikan
              </button>
            </div>
          )}
        </article>

        <div className="text-center mt-12">
          <Link to="/articles" className="inline-flex items-center gap-2 px-8 py-4 bg-dark-brown text-white rounded-xl font-semibold hover:bg-medium-brown transition-all duration-300 hover:-translate-y-1">
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;