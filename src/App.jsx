import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Profile from './pages/Profile';
import Features from './pages/Features'; // IMPORT FEATURES PAGE
import './index.css';

// Placeholder components untuk halaman yang belum ada
const Progress = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center">Progress Page - Coming Soon</div>;
const Quiz = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center">Quiz Page - Coming Soon</div>;
const Events = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center">Events Page - Coming Soon</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} /> {/* FEATURES ROUTE */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            
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
              path="/progress" 
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              } 
            />
            
            {/* Coming Soon Routes */}
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/events" element={<Events />} />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
                  <a href="/" className="btn btn-primary">
                    Kembali ke Beranda
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
