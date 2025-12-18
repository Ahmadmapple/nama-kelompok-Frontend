import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Users, FileText, HelpCircle, LogOut, CalendarDays } from "lucide-react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ users: 0, articles: 0, quizzes: 0, events: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("mindloop_token");
        const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats || { users: 0, articles: 0, quizzes: 0, events: 0 });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminMenus = [
    {
      title: "Kelola User",
      description: "Manage user accounts and permissions",
      icon: Users,
      path: "/admin/users",
      color: "bg-blue-500",
    },
    {
      title: "Kelola Artikel",
      description: "Create, edit, and delete articles",
      icon: FileText,
      path: "/admin/articles",
      color: "bg-green-500",
    },
    {
      title: "Kelola Kuis",
      description: "Manage quizzes and questions",
      icon: HelpCircle,
      path: "/admin/quizzes",
      color: "bg-purple-500",
    },
    {
      title: "Kelola Event",
      description: "Manage events and registrations",
      icon: CalendarDays,
      path: "/admin/events",
      color: "bg-pink-500",
    },
    {
      title: "Target Mingguan",
      description: "Create and manage weekly targets",
      icon: FileText,
      path: "/admin/weekly-target",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ML</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">MindLoop Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500">{user?.role || "Administrator"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang, {user?.name || "Admin"}! 👋
          </h2>
          <p className="text-gray-600">
            Kelola konten dan pengguna MindLoop dari dashboard ini
          </p>
        </div>

        {/* Admin Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenus.map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                key={menu.path}
                onClick={() => navigate(menu.path)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-left group border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${menu.color} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition">
                      {menu.title}
                    </h3>
                    <p className="text-sm text-gray-500">{menu.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.articles}</p>
              </div>
              <FileText className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.quizzes}</p>
              </div>
              <HelpCircle className="text-purple-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.events}</p>
              </div>
              <CalendarDays className="text-pink-500" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
