// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false); // BARU

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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

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
      console.log("SET AUTH ERROR:", message); // 🔥 DEBUG
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          role,
          password,
          confirmPassword,
          agreeToTerms,
          newsletter,
        }
      );
      const { message, verificationToken } = response.data;

      setAuthSuccess(message);

      localStorage.setItem("email", data.email); 
      localStorage.setItem("otpToken", verificationToken); // <== SIMPAN TOKEN OTP

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

      const response = await axios.put(
        "http://localhost:3000/api/user/edit-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

      if (!validatePassword(newPassword)) {
        setAuthError("Password baru minimal 6 karakter");
        throw new Error("Password baru minimal 6 karakter");
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

      await axios.post(`http://localhost:3000/api/auth/forgot-password`, {
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

      // ✅ correct usage of validatePassword
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        throw new Error(passwordError);
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Password tidak cocok");
      }

      // 🔥 CALL BACKEND
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          token,
          newPassword,
          confirmPassword,
        }
      );

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

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || "guest";
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

 const fetchProfile = useCallback(async () => {
  setIsProfileLoading(true);

  const token = localStorage.getItem("mindloop_token");
  if (!token) {
    setAuthError("Token tidak ditemukan.");
    setIsProfileLoading(false);
    return null;
  }

  try {
    // Call both basic and extended endpoints in parallel
    const [basicRes, extendedRes] = await Promise.all([
      axios.get("http://localhost:3000/api/user/profile/basic", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:3000/api/user/profile/extended", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!basicRes.data || !extendedRes.data) {
      setAuthError("Data profil kosong dari backend.");
      setIsProfileLoading(false);
      return null;
    }

    // Merge basic + extended data
    const fullProfile = { ...basicRes.data, ...extendedRes.data };

    // Update user in AuthContext
    setUser(fullProfile);

    setIsProfileLoading(false);
    return fullProfile;
  } catch (err) {
    console.error("Gagal mengambil data profil:", err);
    setAuthError("Gagal mengambil data profil.");
    setIsProfileLoading(false);
    return null;
  }
}, []);



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