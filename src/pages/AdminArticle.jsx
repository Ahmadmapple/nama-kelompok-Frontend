import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export default function AdminArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mindloop_token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/api/admin/articles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles(response.data.articles || []);

    } catch (err) {
      setError("Gagal mengambil data artikel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("mindloop_token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.delete(`${API_BASE_URL}/api/admin/articles/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);

    } catch (err) {
      setError("Gagal menghapus artikel");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          Kembali ke Admin Panel
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Kelola Artikel
      </h1>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-max w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Judul</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{a.title}</td>
                    <td className="p-4">{a.author_name || "Unknown"}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setDeleteId(a.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {articles.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-gray-500">
                      Tidak ada artikel
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI DELETE */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">
              Hapus Artikel?
            </h2>
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
      )}
    </div>
  );
}
