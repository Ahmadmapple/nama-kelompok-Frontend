// src/pages/auth/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthCenteredLayout from "../../components/auth/AuthCenteredLayout";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    login,
    authError, // string error dari AuthContext
    clearAuthMessages,
    fetchProfile, // reset error/success
  } = useAuth();

  useEffect(() => {
    clearAuthMessages();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result?.success) {
      await fetchProfile();
      
      if (result.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AuthCenteredLayout
      title="Masuk ke MindLoop"
      subtitle="Selamat datang kembali!"
      footerText="Belum punya akun?"
      footerLink="/register"
      footerLinkText="Daftar di sini"
      brandingTitle="Masuk & Mulai Belajar"
      brandingDescription="Akses materi, kuis, dan progres belajarmu"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ERROR MESSAGE */}
        {authError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 text-sm">{authError}</span>
            </div>
          </div>
        )}

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* REMEMBER & FORGOT */}
        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Lupa password?
          </Link>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary py-3 justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses...
            </div>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
    </AuthCenteredLayout>
  );
};

export default Login;
