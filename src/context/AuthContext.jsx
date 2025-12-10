// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (authError || authSuccess) {
      const timer = setTimeout(() => {
        setAuthError(null);
        setAuthSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authError, authSuccess]);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('mindloop_user');
    const storedToken = localStorage.getItem('mindloop_token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Check if token is still valid (simulated)
        const tokenExpiry = localStorage.getItem('mindloop_token_expiry');
        const now = new Date().getTime();
        
        if (tokenExpiry && now < parseInt(tokenExpiry)) {
          setUser(parsedUser);
        } else {
          // Token expired, clear storage
          localStorage.removeItem('mindloop_user');
          localStorage.removeItem('mindloop_token');
          localStorage.removeItem('mindloop_token_expiry');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        clearAuthStorage();
      }
    }
    setLoading(false);
  }, []);

  // Clear all auth storage
  const clearAuthStorage = () => {
    localStorage.removeItem('mindloop_user');
    localStorage.removeItem('mindloop_token');
    localStorage.removeItem('mindloop_token_expiry');
    localStorage.removeItem('mindloop_refresh_token');
  };

  // Generate mock token (for simulation)
  const generateToken = () => {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  // Simulate API delay
  const simulateApiCall = (delay = 1000) => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Login function
  const login = async (email, password) => {
    setAuthError(null);
    setAuthSuccess(null);

    // Validation
    if (!email || !password) {
      setAuthError('Email dan password harus diisi');
      throw new Error('Email dan password harus diisi');
    }

    if (!validateEmail(email)) {
      setAuthError('Format email tidak valid');
      throw new Error('Format email tidak valid');
    }

    try {
      // Simulate API call
      await simulateApiCall(1200);

      // Mock validation (in real app, this would be API call)
      if (email === 'demo@mindloop.com' && password === 'demo123') {
        // Demo account
        const mockUser = {
          id: 'user_demo_001',
          name: 'Demo User',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          role: 'premium',
          memberSince: '2024-01-15',
          bio: 'Pengguna demo MindLoop',
          phone: '+62 812-3456-7890',
          preferences: {
            theme: 'light',
            language: 'id',
            notifications: true
          },
          stats: {
            totalQuizzes: 24,
            averageScore: 85,
            readingTime: '45 jam',
            streak: 7
          }
        };

        const token = generateToken();
        const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days

        setUser(mockUser);
        localStorage.setItem('mindloop_user', JSON.stringify(mockUser));
        localStorage.setItem('mindloop_token', token);
        localStorage.setItem('mindloop_token_expiry', expiry.toString());
        
        setAuthSuccess('Login berhasil!');
        return { user: mockUser, token };
      } else {
        // Regular user simulation
        const mockUser = {
          id: 'user_' + Date.now(),
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=4f46e5&color=fff`,
          role: 'member',
          memberSince: new Date().toISOString().split('T')[0],
          bio: 'Pembaca aktif yang suka belajar hal baru',
          phone: '',
          preferences: {
            theme: 'light',
            language: 'id',
            notifications: true
          },
          stats: {
            totalQuizzes: 0,
            averageScore: 0,
            readingTime: '0 jam',
            streak: 0
          }
        };

        const token = generateToken();
        const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days

        setUser(mockUser);
        localStorage.setItem('mindloop_user', JSON.stringify(mockUser));
        localStorage.setItem('mindloop_token', token);
        localStorage.setItem('mindloop_token_expiry', expiry.toString());
        
        setAuthSuccess('Login berhasil! Selamat datang di MindLoop');
        return { user: mockUser, token };
      }
    } catch (error) {
      setAuthError('Login gagal. Silakan coba lagi.');
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password, confirmPassword) => {
    setAuthError(null);
    setAuthSuccess(null);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setAuthError('Semua field harus diisi');
      throw new Error('Semua field harus diisi');
    }

    if (!validateEmail(email)) {
      setAuthError('Format email tidak valid');
      throw new Error('Format email tidak valid');
    }

    if (!validatePassword(password)) {
      setAuthError('Password minimal 6 karakter');
      throw new Error('Password minimal 6 karakter');
    }

    if (password !== confirmPassword) {
      setAuthError('Password tidak cocok');
      throw new Error('Password tidak cocok');
    }

    try {
      // Simulate API call
      await simulateApiCall(1500);

      // Check if email already exists (simulated)
      const existingUsers = JSON.parse(localStorage.getItem('mindloop_registered_users') || '[]');
      if (existingUsers.some(u => u.email === email)) {
        setAuthError('Email sudah terdaftar');
        throw new Error('Email sudah terdaftar');
      }

      // Create new user
      const newUser = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`,
        role: 'member',
        memberSince: new Date().toISOString().split('T')[0],
        bio: '',
        phone: '',
        preferences: {
          theme: 'light',
          language: 'id',
          notifications: true
        },
        stats: {
          totalQuizzes: 0,
          averageScore: 0,
          readingTime: '0 jam',
          streak: 0
        }
      };

      const token = generateToken();
      const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days

      // Save user
      setUser(newUser);
      localStorage.setItem('mindloop_user', JSON.stringify(newUser));
      localStorage.setItem('mindloop_token', token);
      localStorage.setItem('mindloop_token_expiry', expiry.toString());
      
      // Save to registered users list (simulated database)
      existingUsers.push({ email, name });
      localStorage.setItem('mindloop_registered_users', JSON.stringify(existingUsers));

      setAuthSuccess('Registrasi berhasil! Akun Anda telah dibuat.');
      return { user: newUser, token };
    } catch (error) {
      setAuthError(error.message || 'Registrasi gagal');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearAuthStorage();
    setAuthSuccess('Anda telah logout');
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Validation
      if (!profileData.name || !profileData.email) {
        setAuthError('Nama dan email harus diisi');
        throw new Error('Nama dan email harus diisi');
      }

      if (!validateEmail(profileData.email)) {
        setAuthError('Format email tidak valid');
        throw new Error('Format email tidak valid');
      }

      // Simulate API call
      await simulateApiCall(800);

      // Check if email is changed and already exists (simulated)
      if (user.email !== profileData.email) {
        const existingUsers = JSON.parse(localStorage.getItem('mindloop_registered_users') || '[]');
        if (existingUsers.some(u => u.email === profileData.email && u.email !== user.email)) {
          setAuthError('Email sudah digunakan oleh pengguna lain');
          throw new Error('Email sudah digunakan oleh pengguna lain');
        }
      }

      const updatedUser = {
        ...user,
        ...profileData,
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem('mindloop_user', JSON.stringify(updatedUser));
      
      // Update in registered users list if email changed
      if (user.email !== profileData.email) {
        const existingUsers = JSON.parse(localStorage.getItem('mindloop_registered_users') || '[]');
        const updatedUsers = existingUsers.map(u => 
          u.email === user.email ? { ...u, email: profileData.email, name: profileData.name } : u
        );
        localStorage.setItem('mindloop_registered_users', JSON.stringify(updatedUsers));
      }

      setAuthSuccess('Profil berhasil diperbarui!');
      return updatedUser;
    } catch (error) {
      setAuthError(error.message || 'Gagal memperbarui profil');
      throw error;
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Validation
      if (!currentPassword || !newPassword) {
        setAuthError('Password saat ini dan password baru harus diisi');
        throw new Error('Password saat ini dan password baru harus diisi');
      }

      if (!validatePassword(newPassword)) {
        setAuthError('Password baru minimal 6 karakter');
        throw new Error('Password baru minimal 6 karakter');
      }

      // Simulate API call
      await simulateApiCall(1000);

      // In a real app, verify currentPassword with backend
      // For simulation, we'll accept any non-empty currentPassword
      if (!currentPassword.trim()) {
        setAuthError('Password saat ini salah');
        throw new Error('Password saat ini salah');
      }

      // Update token (simulate password change requiring new token)
      const newToken = generateToken();
      const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);

      localStorage.setItem('mindloop_token', newToken);
      localStorage.setItem('mindloop_token_expiry', expiry.toString());

      setAuthSuccess('Password berhasil diubah!');
      return { success: true, message: 'Password berhasil diubah', token: newToken };
    } catch (error) {
      setAuthError(error.message || 'Gagal mengubah password');
      throw error;
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (!email || !validateEmail(email)) {
        setAuthError('Masukkan email yang valid');
        throw new Error('Masukkan email yang valid');
      }

      // Simulate API call
      await simulateApiCall(1200);

      // Check if email exists (simulated)
      const existingUsers = JSON.parse(localStorage.getItem('mindloop_registered_users') || '[]');
      const userExists = existingUsers.some(u => u.email === email);

      if (!userExists) {
        // For security, don't reveal if email exists or not
        setAuthSuccess('Jika email terdaftar, instruksi reset password akan dikirim');
        return { success: true, message: 'Email instruksi telah dikirim' };
      }

      // Generate reset token (simulated)
      const resetToken = 'reset_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      const resetExpiry = new Date().getTime() + (1 * 60 * 60 * 1000); // 1 hour

      // Store reset token (in real app, this would be in database)
      localStorage.setItem('mindloop_reset_token', resetToken);
      localStorage.setItem('mindloop_reset_email', email);
      localStorage.setItem('mindloop_reset_expiry', resetExpiry.toString());

      setAuthSuccess('Instruksi reset password telah dikirim ke email Anda');
      return { success: true, message: 'Email instruksi telah dikirim', resetToken };
    } catch (error) {
      setAuthError(error.message || 'Gagal mengirim email reset password');
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword, confirmPassword) => {
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (!newPassword || !confirmPassword) {
        setAuthError('Password baru dan konfirmasi password harus diisi');
        throw new Error('Password baru dan konfirmasi password harus diisi');
      }

      if (!validatePassword(newPassword)) {
        setAuthError('Password minimal 6 karakter');
        throw new Error('Password minimal 6 karakter');
      }

      if (newPassword !== confirmPassword) {
        setAuthError('Password tidak cocok');
        throw new Error('Password tidak cocok');
      }

      // Verify token (simulated)
      const storedToken = localStorage.getItem('mindloop_reset_token');
      const storedEmail = localStorage.getItem('mindloop_reset_email');
      const storedExpiry = localStorage.getItem('mindloop_reset_expiry');
      const now = new Date().getTime();

      if (!storedToken || storedToken !== token || !storedEmail || !storedExpiry || now > parseInt(storedExpiry)) {
        setAuthError('Token reset password tidak valid atau telah kadaluarsa');
        throw new Error('Token reset password tidak valid atau telah kadaluarsa');
      }

      // Simulate API call
      await simulateApiCall(1000);

      // Update password (in real app, this would update database)
      const existingUsers = JSON.parse(localStorage.getItem('mindloop_registered_users') || '[]');
      
      // Clear reset data
      localStorage.removeItem('mindloop_reset_token');
      localStorage.removeItem('mindloop_reset_email');
      localStorage.removeItem('mindloop_reset_expiry');

      setAuthSuccess('Password berhasil direset! Silakan login dengan password baru');
      return { success: true, message: 'Password berhasil direset' };
    } catch (error) {
      setAuthError(error.message || 'Gagal reset password');
      throw error;
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
          ...preferences
        },
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem('mindloop_user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error('Error updating preferences:', error);
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
          ...stats
        }
      };

      setUser(updatedUser);
      localStorage.setItem('mindloop_user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error('Error updating stats:', error);
      throw error;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || 'guest';
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const value = {
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
    getUserInitials,
    clearAuthMessages: () => {
      setAuthError(null);
      setAuthSuccess(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
