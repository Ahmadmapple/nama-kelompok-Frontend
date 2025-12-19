// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("mindloop_user");
    const storedToken = localStorage.getItem("mindloop_token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Check if token is still valid (simulated)
        const tokenExpiry = localStorage.getItem("mindloop_token_expiry");
        const now = new Date().getTime();

        if (tokenExpiry && now < parseInt(tokenExpiry)) {
          setUser(parsedUser);
        } else {
          // Token expired, clear storage
          localStorage.removeItem("mindloop_user");
          localStorage.removeItem("mindloop_token");
          localStorage.removeItem("mindloop_token_expiry");
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        clearAuthStorage();
      }
    }
    setAuthChecked(true);
    setLoading(false);
  }, []);

  // Clear all auth storage
  const clearAuthStorage = () => {
    localStorage.removeItem("mindloop_user");
    localStorage.removeItem("mindloop_token");
    localStorage.removeItem("mindloop_token_expiry");
    localStorage.removeItem("mindloop_refresh_token");
  };

  // Generate mock token (for simulation)
  const generateToken = () => {
    return (
      "mock_token_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
    );
  };

  // Simulate API delay
  const simulateApiCall = (delay = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    if (password.length < 8) return "Password minimal 8 karakter";
    if (!/(?=.*[a-z])/.test(password))
      return "Password harus mengandung minimal 1 huruf kecil";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password harus mengandung minimal 1 huruf besar";
    if (!/(?=.*\d)/.test(password))
      return "Password harus mengandung minimal 1 angka";
    return null;
  };

  // Login function
  const login = async (email, password) => {
    setAuthError(null);
    setAuthSuccess(null);

    // Validation
    if (!email || !password) {
      setAuthError("Email dan password harus diisi");
      return { success: false };
    }

    if (!validateEmail(email)) {
      setAuthError("Format email tidak valid");
      return { success: false };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      if (!user || !token) {
        setAuthError("Login gagal");
        return { success: false };
      }

      setUser(user);
      localStorage.setItem("mindloop_user", JSON.stringify(user));
      localStorage.setItem("mindloop_token", token);
      localStorage.setItem(
        "mindloop_token_expiry",
        (Date.now() + 7 * 24 * 60 * 60 * 1000).toString()
      );

      return { success: true, user };
    } catch (error) {
      const message =
        error.response?.data?.message || "Email atau password salah";
      console.log("SET AUTH ERROR:", message); // DEBUG
      setAuthError(message);
      return { success: false };
    }
  };

  // Register function
  const register = async (data) => {
    setAuthError(null);
    setAuthSuccess(null);

    const {
      name,
      email,
      role,
      password,
      confirmPassword,
      agreeToTerms,
      newsletter,
    } = data;

    if (!name || !email || !password || !confirmPassword) {
      setAuthError("Semua field harus diisi");
      return { success: false };
    }

    if (agreeToTerms !== true) {
      setAuthError("Anda harus setuju dengan syarat dan ketentuan");
      return { success: false };
    }

    if (!validateEmail(email)) {
      setAuthError("Format email tidak valid");
      return { success: false };
    }

    const error = validatePassword(password);

    if (error) {
      setAuthError(error);
      return { success: false };
    }

    if (password !== confirmPassword) {
      setAuthError("Password tidak cocok");
      return { success: false };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        role,
        password,
        confirmPassword,
        agreeToTerms,
        newsletter,
      });
      const { message, verificationToken } = response.data;

      setAuthSuccess(message);

      localStorage.setItem("email", data.email);
      localStorage.setItem("otpToken", verificationToken); // SIMPAN TOKEN OTP

      return { success: true, verificationToken: verificationToken };
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Terjadi kesalahan server";

      setAuthError(errMsg);
      return { success: false };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearAuthStorage();
    // Clear guest quiz data saat logout
    localStorage.removeItem("mindloop_completed_quizzes_guest");
    setAuthSuccess("Anda telah logout");
  };

  // Update profile function
  const updateProfile = async (formData) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const token = localStorage.getItem("mindloop_token");

      if (!token) {
        throw new Error("Unauthorized");
      }

      if (!formData.get("name") || formData.get("name").trim() === "") {
        throw new Error("Nama harus diisi");
      }

      const response = await axios.put(`${API_BASE_URL}/api/user/edit-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data.user;

      setUser(updatedUser);
      localStorage.setItem("mindloop_user", JSON.stringify(updatedUser));

      setAuthSuccess("Profil berhasil diperbarui");
      return updatedUser;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui profil";

      setAuthError(message);
      throw new Error(message);
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Validation
      if (!currentPassword || !newPassword) {
        setAuthError("Password saat ini dan password baru harus diisi");
        throw new Error("Password saat ini dan password baru harus diisi");
      }

      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        setAuthError(passwordError);
        throw new Error(passwordError);
      }

      // Simulate API call
      await simulateApiCall(1000);

      // In a real app, verify currentPassword with backend
      // For simulation, we'll accept any non-empty currentPassword
      if (!currentPassword.trim()) {
        setAuthError("Password saat ini salah");
        throw new Error("Password saat ini salah");
      }

      // Update token (simulate password change requiring new token)
      const newToken = generateToken();
      const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

      localStorage.setItem("mindloop_token", newToken);
      localStorage.setItem("mindloop_token_expiry", expiry.toString());

      setAuthSuccess("Password berhasil diubah!");
      return {
        success: true,
        message: "Password berhasil diubah",
        token: newToken,
      };
    } catch (error) {
      setAuthError(error.message || "Gagal mengubah password");
      throw error;
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (!email || !validateEmail(email)) {
        throw new Error("Masukkan email yang valid");
      }

      await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
        email,
      });

      // Always show same message (security)
      setAuthSuccess(
        "Jika email terdaftar, instruksi reset password akan dikirim"
      );

      return {
        success: true,
        message: "Instruksi reset password telah dikirim",
      };
    } catch (error) {
      setAuthError(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengirim email reset password"
      );
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword, confirmPassword) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (!token) {
        throw new Error("Token reset password tidak ditemukan");
      }

      if (!newPassword || !confirmPassword) {
        throw new Error("Password baru dan konfirmasi password harus diisi");
      }

      // correct usage of validatePassword
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        throw new Error(passwordError);
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Password tidak cocok");
      }

      // CALL BACKEND
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword,
        confirmPassword,
      });

      setAuthSuccess(response.data.message || "Password berhasil direset");

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Gagal reset password";

      setAuthError(message);
      throw new Error(message);
    }
  };

  // Update user preferences
  const updatePreferences = async (preferences) => {
    try {
      await simulateApiCall(500);

      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
        updatedAt: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem("mindloop_user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Error updating preferences:", error);
      throw error;
    }
  };

  // Update user stats
  const updateStats = async (stats) => {
    try {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          ...stats,
        },
      };

      setUser(updatedUser);
      localStorage.setItem("mindloop_user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Error updating stats:", error);
      throw error;
    }
  };

  const fetchProfile = useCallback(async () => {
    setAuthError(null);
    const token = localStorage.getItem("mindloop_token");
    if (!token) {
      return null;
    }

    setIsProfileLoading(true);
    try {
      // Panggil endpoint paralel untuk mendapatkan data profil
      const [basicRes, extendedRes, weeklyTargetRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/user/profile/basic`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE_URL}/api/user/profile/extended`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios
          .get(`${API_BASE_URL}/api/weekly-target/current`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch(() => ({ data: { target: null, progress: null } })),
      ]);

      let weeklyGoals = null;
      if (weeklyTargetRes.data?.target && weeklyTargetRes.data?.progress) {
        const { target, progress } = weeklyTargetRes.data;

        // Fungsi untuk menghitung persentase
        const safePct = (done, total) => {
          if (!total || total <= 0) return 0;
          return Math.min(Math.round((done / total) * 100), 100);
        };

        // Ambil tanggal selesai dari berbagai kemungkinan properti
        const endDateStr =
          weeklyTargetRes.data.endDate ||
          weeklyTargetRes.data.tanggal_selesai ||
          weeklyTargetRes.data.target?.endDate ||
          weeklyTargetRes.data.target?.tanggal_selesai;

        // Hitung sisa hari
        let daysRemaining = 0;
        if (endDateStr) {
          const endDate = new Date(endDateStr);
          if (!isNaN(endDate.getTime())) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);

            const timeDiff = endDate - today;
            daysRemaining = Math.max(
              0,
              Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
            );
          }
        }

        weeklyGoals = {
          daysRemaining,
          goals: [
            {
              goal: `Baca ${target.targetArticles || target.target_artikel || 0} artikel`,
              target: target.targetArticles || target.target_artikel || 0,
              completed: progress.articlesRead || 0,
              progress: safePct(
                progress.articlesRead || 0,
                target.targetArticles || target.target_artikel || 0
              ),
            },
            {
              goal: `Habiskan ${Math.round((target.targetMinutesRead || target.target_waktu_baca_menit || 0) / 60)} jam membaca`,
              target: target.targetMinutesRead || target.target_waktu_baca_menit || 0,
              completed: progress.minutesRead || 0,
              progress: safePct(
                progress.minutesRead || 0,
                target.targetMinutesRead || target.target_waktu_baca_menit || 0
              ),
            },
            {
              goal: `Selesaikan ${target.targetQuizzes || target.target_kuis || 0} kuis`,
              target: target.targetQuizzes || target.target_kuis || 0,
              completed: progress.quizzesCompleted || 0,
              progress: safePct(
                progress.quizzesCompleted || 0,
                target.targetQuizzes || target.target_kuis || 0
              ),
            },
          ],
        };
      }

      // Gabungkan data dari semua endpoint
      const fullProfile = {
        ...(basicRes?.data || {}),
        ...(extendedRes?.data || {}),
        weeklyGoals,
      };

      // Update state user
      setUser(fullProfile);
      localStorage.setItem("mindloop_user", JSON.stringify(fullProfile));
      return fullProfile;
    } catch (err) {
      console.error("Gagal mengambil data profil:", err);
      setAuthError("Gagal mengambil data profil. Silakan coba lagi nanti.");
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || "guest";
  };

  const hasRole = (roles) => {
    if (!user?.role) return false;
    if (Array.isArray(roles)) return roles.includes(user.role);
    return user.role === roles;
  };

  const getUserInitials = () => {
    const name = user?.name || user?.fullname || "";
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "";
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
    return (first + last).toUpperCase();
  };

  const value = {
    fetchProfile,
    isProfileLoading,
    user,
    loading,
    authError,
    authSuccess,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    updatePreferences,
    updateStats,
    isAuthenticated,
    getUserRole,
    hasRole,
    authChecked,
    getUserInitials,
    clearAuthMessages: () => {
      setAuthError(null);
      setAuthSuccess(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
