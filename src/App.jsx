// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EnhancedQuizProvider } from "./context/EnhancedQuizContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import AdminArticles from "./pages/AdminArticle";
import AdminUsers from "./pages/AdminUsers";
import AdminQuizzes from "./pages/AdminQuizzes";
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

function App() {
  return (
    <AuthProvider>
      <EnhancedQuizProvider>
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

              {/* Protected Routes - Hanya untuk user yang login */}
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
                    {/* Placeholder for CreateArticle component */}
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
              <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              <Route
                path="/admin/articles"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminArticles />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/quizzes" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminQuizzes />
                  </ProtectedRoute>
                } 
              />
              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-900 mb-4">
                        404
                      </h1>
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
      </EnhancedQuizProvider>
    </AuthProvider>
  );
}

export default App;
