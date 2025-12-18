import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, Plus, Calendar, Target } from "lucide-react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export default function AdminWeeklyTarget() {
  const navigate = useNavigate();
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    targetArticles: 5,
    targetMinutesRead: 180,
    targetQuizzes: 5
  });

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mindloop_token");
      const response = await axios.get(`${API_BASE_URL}/api/weekly-target/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const nextTargets = (response.data.targets || []).map((t) => ({
        ...t,
        startDateKey: new Date(t.startDate).toISOString().slice(0, 10),
      }));
      setTargets(nextTargets);
    } catch (err) {
      setError("Gagal mengambil data target mingguan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateTarget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("mindloop_token");
      const now = new Date();
      const day = now.getDay();
      const diffToMonday = (day === 0 ? -6 : 1) - day;
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(now.getDate() + diffToMonday);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      await axios.post(
        `${API_BASE_URL}/api/weekly-target/admin/create`,
        {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          targetArticles: formData.targetArticles,
          targetHoursMinutes: formData.targetMinutesRead,
          targetQuizzes: formData.targetQuizzes,
        },
        {
        headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowCreateModal(false);
      setFormData({
        targetArticles: 5,
        targetMinutesRead: 180,
        targetQuizzes: 5
      });
      fetchTargets();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat target mingguan");
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("mindloop_token");
      await axios.delete(`${API_BASE_URL}/api/weekly-target/admin/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTargets((prev) => prev.filter((t) => t.startDateKey !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Gagal menghapus target mingguan");
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

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm shadow flex items-center gap-2"
        >
          <Plus size={18} />
          Buat Target Mingguan
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Kelola Target Mingguan
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
                  <th className="p-4 text-left">Periode</th>
                  <th className="p-4 text-center">Target Artikel</th>
                  <th className="p-4 text-center">Target Jam Baca</th>
                  <th className="p-4 text-center">Target Kuis</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {targets.map((t) => (
                  <tr key={t.startDateKey} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="text-sm">
                        {new Date(t.startDate).toLocaleDateString('id-ID')} - {new Date(t.endDate).toLocaleDateString('id-ID')}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-indigo-600">{t.targetArticles}</span> artikel
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-indigo-600">{Math.round(t.targetHoursMinutes / 60)}</span> jam
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-indigo-600">{t.targetQuizzes}</span> kuis
                    </td>
                    <td className="p-4 text-center">
                      {t.status === 'active' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Aktif
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                          Selesai
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setDeleteId(t.startDateKey)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {targets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500">
                      Belum ada target mingguan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Buat Target Mingguan Baru</h2>
            
            <form onSubmit={handleCreateTarget} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Info:</strong> Target mingguan akan otomatis dibuat untuk minggu ini dan diterapkan ke semua user.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baca <span className="text-indigo-600 font-bold">berapa</span> artikel minggu ini?
                </label>
                <input
                  type="number"
                  value={formData.targetArticles}
                  onChange={(e) => setFormData({...formData, targetArticles: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Contoh: 5 artikel</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Habiskan <span className="text-indigo-600 font-bold">berapa jam</span> membaca minggu ini?
                </label>
                <input
                  type="number"
                  value={Math.round(formData.targetMinutesRead / 60)}
                  onChange={(e) => setFormData({...formData, targetMinutesRead: (parseInt(e.target.value) || 0) * 60})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Contoh: 3 jam (akan disimpan sebagai {formData.targetMinutesRead} menit)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selesaikan <span className="text-indigo-600 font-bold">berapa</span> kuis minggu ini?
                </label>
                <input
                  type="number"
                  value={formData.targetQuizzes}
                  onChange={(e) => setFormData({...formData, targetQuizzes: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Contoh: 5 kuis</p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Buat Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Hapus Target Mingguan?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Target yang dihapus tidak bisa dikembalikan dan akan menghapus semua progress pengguna.
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
