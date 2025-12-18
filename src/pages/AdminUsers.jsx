import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, UserX } from "lucide-react";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // dummy data (nanti ganti API)
    setUsers([
      { id: 1, name: "Admin", email: "admin@test.com", verified: true },
      { id: 2, name: "User A", email: "a@test.com", verified: true },
      { id: 3, name: "User B", email: "b@test.com", verified: false },
    ]);
  }, []);

  const openDelete = (user) => {
    if (!user.verified) {
      setError("User belum terverifikasi dan tidak bisa dihapus.");
      return;
    }
    setSelectedUser(user);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setSelectedUser(null);
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
        Kelola User
      </h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 text-center">
                  {u.verified ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                      Unverified
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openDelete(u)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm
                      ${
                        u.verified
                          ? "text-red-600 hover:text-red-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  Tidak ada user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL KONFIRMASI DELETE */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <UserX className="text-red-600" />
              <h2 className="text-lg font-semibold">
                Hapus User
              </h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Yakin ingin menghapus user <b>{selectedUser.name}</b>?  
              Tindakan ini tidak bisa dibatalkan.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
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
