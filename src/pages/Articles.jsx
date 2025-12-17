import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const STATIC_CATEGORIES = [
    { id: "digital-literacy", name: "Literasi Digital" },
    { id: "critical-thinking", name: "Berpikir Kritis" },
    { id: "reading-tech", name: "Teknik Membaca" },
    { id: "research-skills", name: "Skill Research" },
    { id: "fact-checking", name: "Fact-Checking" },
  ];

  // ================= FETCH ARTICLES =================
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/article/");
        setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal ambil artikel:", err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // ================= HITUNG JUMLAH ARTIKEL PER KATEGORI =================
  const articleCategories = useMemo(() => {
    const categoryCounts = articles.reduce((acc, article) => {
      const categoryId = article.kategori;
      if (categoryId) acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {});

    const categoriesWithCount = STATIC_CATEGORIES.map((cat) => ({
      ...cat,
      count: categoryCounts[cat.id] || 0,
    }));

    return [
      { id: "all", name: "Semua Kategori", count: articles.length },
      ...categoriesWithCount,
    ];
  }, [articles]);

  // ================= FILTERING =================
  const filteredArticles = useMemo(() => {
    return activeCategory === "all"
      ? articles
      : articles.filter((a) => a.kategori === activeCategory);
  }, [articles, activeCategory]);

  const searchedArticles = useMemo(() => {
    if (!searchQuery) return filteredArticles;
    const query = searchQuery.toLowerCase();
    return filteredArticles.filter(
      (a) =>
        a.nama_artikel?.toLowerCase().includes(query) ||
        a.deskripsi?.toLowerCase().includes(query) ||
        a.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [filteredArticles, searchQuery]);

  // ================= HANDLE ARTICLE CLICK =================
  const handleArticleClick = async (article) => {
    const token = localStorage.getItem("mindloop_token");

    // Jika user login, update riwayat dan progres
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // 1️⃣ Catat riwayat baca artikel
        await axios.post(
          `http://localhost:3000/api/article/${article.id_artikel}/riwayat-baca`,
          {},
          { headers }
        );

        // 2️⃣ Update progres pengguna (waktu membaca & jumlah artikel dibuka)
        await axios.post(
          `http://localhost:3000/api/article/${article.id_artikel}/progres`,
          { durasi: Number(article.perkiraan_waktu_menit) },
          { headers }
        );
      } catch (err) {
        console.error("Gagal update riwayat/progres:", err.message);
      }
    }

    // 3️⃣ Navigate ke detail artikel (guest dan user login sama-sama bisa)
    navigate(`/articles/${article.id_artikel}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Perpustakaan <span className="gradient-text">Artikel Literasi</span>
          </h1>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="py-6 bg-white border-b">
        <div className="container-optimized flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
          {articleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container-optimized">
          {loading && <p className="text-center text-gray-500">Memuat artikel...</p>}
          {!loading && searchedArticles.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada artikel ditemukan</p>
          )}

          {!loading && searchedArticles.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {articleCategories.find((c) => c.id === activeCategory)?.name} (
                {searchedArticles.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchedArticles.map((article) => (
                  <div
                    key={article.id_artikel}
                    onClick={() => handleArticleClick(article)}
                    className="cursor-pointer bg-white rounded-2xl shadow-soft border overflow-hidden hover:shadow-strong transition group"
                  >
                    {/* IMAGE */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.gambar_artikel || "/placeholder.jpg"}
                        alt={article.nama_artikel}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                          {articleCategories.find((c) => c.id === article.kategori)?.name}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            article.kesulitan === "Pemula"
                              ? "bg-green-100 text-green-800"
                              : article.kesulitan === "Menengah"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {article.kesulitan}
                        </span>
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600">
                        {article.nama_artikel}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.deskripsi}
                      </p>

                      {/* TAGS */}
                      {article.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* META */}
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{article.perkiraan_waktu_menit} min read</span>
                        <span>❤️ {article.like_artikel}</span>
                      </div>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <img
                          src={article.author?.avatar || "/avatar-default.png"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{article.author?.nama}</p>
                          <p className="text-xs text-gray-500">Penulis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
