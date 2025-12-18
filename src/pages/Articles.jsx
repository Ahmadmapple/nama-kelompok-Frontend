import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [ownershipFilter, setOwnershipFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [editForm, setEditForm] = useState({
    nama_artikel: "",
    deskripsi: "",
    kategori: "",
    kesulitan: "Pemula",
    perkiraan_waktu_menit: "",
    tags: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth();
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
        const res = await axios.get(`${API_BASE_URL}/api/article/`);
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
    let result =
      activeCategory === "all"
        ? articles
        : articles.filter((a) => a.kategori === activeCategory);

    if (ownershipFilter === "mine") {
      if (!user?.id) return [];
      result = result.filter((a) => a.author?.id === user.id);
    }

    return result;
  }, [articles, activeCategory, ownershipFilter, user]);

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
          `${API_BASE_URL}/api/article/${article.id_artikel}/riwayat-baca`,
          {},
          { headers }
        );

        // 2️⃣ Update progres pengguna (waktu membaca & jumlah artikel dibuka)
        await axios.post(
          `${API_BASE_URL}/api/article/${article.id_artikel}/progres`,
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

  const openEdit = (article) => {
    setEditingArticle(article);
    setEditForm({
      nama_artikel: article.nama_artikel || "",
      deskripsi: article.deskripsi || "",
      kategori: article.kategori || "digital-literacy",
      kesulitan: article.kesulitan || "Pemula",
      perkiraan_waktu_menit: String(article.perkiraan_waktu_menit ?? ""),
      tags: Array.isArray(article.tags) ? article.tags.join(", ") : "",
    });
  };

  const submitEdit = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("mindloop_token");

      const tagsArray = editForm.tags
        ? editForm.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      await axios.put(
        `${API_BASE_URL}/api/article/${editingArticle.id_artikel}`,
        {
          nama_artikel: editForm.nama_artikel,
          deskripsi: editForm.deskripsi,
          kategori: editForm.kategori,
          kesulitan: editForm.kesulitan,
          perkiraan_waktu_menit: editForm.perkiraan_waktu_menit,
          tags: tagsArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setArticles((prev) =>
        prev.map((a) =>
          a.id_artikel === editingArticle.id_artikel
            ? {
                ...a,
                nama_artikel: editForm.nama_artikel,
                deskripsi: editForm.deskripsi,
                kategori: editForm.kategori,
                kesulitan: editForm.kesulitan,
                perkiraan_waktu_menit: Number(editForm.perkiraan_waktu_menit) || a.perkiraan_waktu_menit,
                tags: tagsArray,
              }
            : a
        )
      );

      setEditingArticle(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("mindloop_token");
      await axios.delete(`${API_BASE_URL}/api/article/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id_artikel !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized text-center max-w-4xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-6 break-words">
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
        <div className="container-optimized flex flex-col gap-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
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

                      {user?.id && article.author?.id === user.id && (
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(article);
                            }}
                            className="bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(article.id_artikel);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
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

          {editingArticle && (
            <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
              <div className="min-h-full flex items-start sm:items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">Edit Artikel</h2>

                  <div className="grid grid-cols-1 gap-3">
                    <input
                      value={editForm.nama_artikel}
                      onChange={(e) => setEditForm((p) => ({ ...p, nama_artikel: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Judul"
                    />
                    <textarea
                      value={editForm.deskripsi}
                      onChange={(e) => setEditForm((p) => ({ ...p, deskripsi: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Deskripsi"
                      rows={3}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        value={editForm.kategori}
                        onChange={(e) => setEditForm((p) => ({ ...p, kategori: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        {STATIC_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={editForm.kesulitan}
                        onChange={(e) => setEditForm((p) => ({ ...p, kesulitan: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="Pemula">Pemula</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Lanjutan">Lanjutan</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        value={editForm.perkiraan_waktu_menit}
                        onChange={(e) => setEditForm((p) => ({ ...p, perkiraan_waktu_menit: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Perkiraan waktu (menit)"
                        inputMode="numeric"
                      />
                      <input
                        value={editForm.tags}
                        onChange={(e) => setEditForm((p) => ({ ...p, tags: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Tags (pisahkan dengan koma)"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setEditingArticle(null)}
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
                  <h2 className="text-lg font-semibold mb-2">Hapus Artikel?</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Artikel yang dihapus tidak bisa dikembalikan.
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
