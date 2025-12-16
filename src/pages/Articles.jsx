import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "digital-literacy", name: "Literasi Digital" },
    { id: "critical-thinking", name: "Berpikir Kritis" },
    { id: "reading-techniques", name: "Teknik Membaca" },
    { id: "research-skills", name: "Skill Research" },
    { id: "fact-checking", name: "Fact-Checking" },
  ];

  // ================= FETCH =================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/article/");
        setArticles(res.data);
      } catch (err) {
        console.error("Gagal ambil artikel:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ================= FILTER =================
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.kategori === activeCategory);

  const searchedArticles = searchQuery
    ? filteredArticles.filter(
        (a) =>
          a.nama_artikel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags?.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : filteredArticles;

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
            className="w-full max-w-2xl px-6 py-4 border rounded-2xl"
          />
        </div>
      </section>

      {/* CATEGORY */}
      <section className="py-6 bg-white border-b">
        <div className="container-optimized flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container-optimized">

          {loading && (
            <p className="text-center text-gray-500">Memuat artikel...</p>
          )}

          {!loading && searchedArticles.length === 0 && (
            <p className="text-center text-gray-500">
              Tidak ada artikel ditemukan
            </p>
          )}

          {!loading && searchedArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedArticles.map((article) => (
                <Link
                  key={article.id_artikel}
                  to={`/articles/${article.id_artikel}`}
                  className="bg-white rounded-2xl shadow-soft border overflow-hidden hover:shadow-strong transition group"
                >
                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.gambar_artikel || "/placeholder.jpg"}
                      alt={article.nama_artikel}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />

                    {/* BADGE */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                        {
                          categories.find(
                            (c) => c.id === article.kategori
                          )?.name
                        }
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
                        <p className="text-sm font-medium">
                          {article.author?.nama}
                        </p>
                        <p className="text-xs text-gray-500">Penulis</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;