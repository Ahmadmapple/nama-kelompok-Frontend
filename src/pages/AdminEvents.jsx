import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export default function AdminEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mindloop_token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/api/admin/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.events || []);
    } catch (err) {
      setError("Gagal mengambil data event");
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
      await axios.delete(`${API_BASE_URL}/api/admin/events/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Gagal menghapus event");
      console.error(err);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          Kembali ke Admin Panel
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">Kelola Event</h1>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

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
                  <th className="p-4 text-left">Penyelenggara</th>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{e.title}</td>
                    <td className="p-4">{e.organizer_name || "-"}</td>
                    <td className="p-4">{formatDate(e.date || e.time)}</td>
                    <td className="p-4">{e.status || "-"}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setDeleteId(e.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {events.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      Tidak ada event
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Hapus Event?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Event yang dihapus tidak bisa dikembalikan.
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
