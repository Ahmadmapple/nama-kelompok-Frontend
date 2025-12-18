import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Users, BookOpen } from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  if (!user.isAdmin) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>

        <nav className="px-4 py-4 flex flex-col gap-2 text-sm">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/articles")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <FileText size={16} />
            Artikel
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <Users size={16} />
            User
          </button>
          
          <button
            onClick={() => navigate("/admin/quizzes")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <BookOpen size={16} />
            Kuis
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Artikel</p>
            <p className="text-3xl font-bold mt-2">{stats.articles}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Kuis</p>
            <p className="text-3xl font-bold mt-2">{stats.quizzes}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total User</p>
            <p className="text-3xl font-bold mt-2">{stats.users}</p>
          </div>
        </div>
      </main>

    </div>
  );
}
