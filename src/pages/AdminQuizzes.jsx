import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";

export default function AdminQuizzes() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // dummy data (nanti ganti dari API)
    setQuizzes([
      { id: 1, title: "Kuis Literasi Digital", level: "Pemula" },
      { id: 2, title: "Kuis Mental Health", level: "Menengah" },
    ]);
  }, []);

  const confirmDelete = () => {
    setQuizzes((prev) => prev.filter((q) => q.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          Kembali ke Admin Panel
        </button>

        <button
          onClick={() => navigate("/create-quiz")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
          + Tambah Kuis
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Kelola Kuis
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Judul Kuis</th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((q) => (
              <tr key={q.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{q.title}</td>
                <td className="p-4">{q.level}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setDeleteId(q.id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {quizzes.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  Tidak ada kuis
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL KONFIRMASI */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">
              Hapus Kuis?
            </h2>
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
      )}
    </div>
  );
}
