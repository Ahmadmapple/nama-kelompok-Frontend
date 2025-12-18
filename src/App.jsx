// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EnhancedQuizProvider } from "./context/EnhancedQuizContext";
import { AlertProvider } from "./context/AlertContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import Quiz from "./pages/Quiz";
import Events from "./pages/Events";
import EmailVerification from "./pages/auth/emailVerification";
import "./index.css";
import CreateArticlePage from "./pages/createArticlePage";
import CreateQuizPage from "./pages/createQuizPage";
import CreateEventPage from "./pages/createEventPage";
import AdminPage from "./pages/AdminPage";
import AdminUsers from "./pages/AdminUsers";
import AdminArticles from "./pages/AdminArticle";
import AdminQuizzes from "./pages/AdminQuizzez";
import AdminWeeklyTarget from "./pages/AdminWeeklyTarget";
import AdminEvents from "./pages/AdminEvents";

// Component wrapper untuk fetch profile
const AppContent = () => {
  // Ambil 'fetchProfile' dan 'authChecked'
  // Hapus 'isProfileLoading' dari destructuring jika tidak digunakan di sini
  const { fetchProfile, authChecked, user } = useAuth();

  useEffect(() => {
    // Panggil fetchProfile untuk mengambil data profil (termasuk avatar)
    // di latar belakang segera setelah otentikasi selesai.
    if (authChecked) {
      fetchProfile(); // Ambil profile terbaru dari backend
    }
  }, [authChecked, fetchProfile]);

  // === PERUBAHAN UTAMA: Hanya menunggu authChecked ===
  // Kita HANYA menunggu 'authChecked'. Ini memastikan user melihat konten
  // secepat mungkin. fetchProfile akan berjalan di background.
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memverifikasi otentikasi...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/events" element={<Events />} />

          {/* Auth Routes - Hanya untuk guest */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute requireAuth={false}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <ProtectedRoute requireAuth={false}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emailVerification"
            element={
              <ProtectedRoute requireAuth={false}>
                <EmailVerification />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Khusus Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminQuizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/weekly-target"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminWeeklyTarget />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-article"
            element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <ProtectedRoute>
                <CreateQuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Halaman tidak ditemukan
                  </p>
                  <a href="/" className="btn btn-primary">
                    Kembali ke Beranda
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <EnhancedQuizProvider>
          <AppContent />
        </EnhancedQuizProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;