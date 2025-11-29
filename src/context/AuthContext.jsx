import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('mindloop_token');
    const userData = localStorage.getItem('mindloop_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Validasi data user
        if (parsedUser && parsedUser.id && parsedUser.email) {
          setUser(parsedUser);
        } else {
          // Data tidak valid, clear storage
          localStorage.removeItem('mindloop_token');
          localStorage.removeItem('mindloop_user');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('mindloop_token');
        localStorage.removeItem('mindloop_user');
      }
    }
    setLoading(false);
  }, []);

  // Simulate API call delay
  const simulateAPICall = (data, success = true, delay = 1500) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve({ data });
        } else {
          reject(new Error('API Error'));
        }
      }, delay);
    });
  };

  // Generate random avatar based on name
  const generateAvatar = (name) => {
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    ];
    // Simple hash based on name to get consistent avatar
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return avatars[Math.abs(hash) % avatars.length];
  };

  // Generate profile data based on role
  const generateProfileData = (userData) => {
    const baseData = {
      literacyScore: Math.floor(Math.random() * 30) + 70, // 70-100
      level: Math.floor(Math.random() * 3) + 1, // 1-4
      xp: Math.floor(Math.random() * 500) + 500, // 500-1000
      xpToNextLevel: 1000,
      articlesRead: Math.floor(Math.random() * 20) + 10, // 10-30
      readingTime: `${Math.floor(Math.random() * 20) + 10} jam`, // 10-30 jam
      quizzesCompleted: Math.floor(Math.random() * 15) + 5, // 5-20
      currentStreak: Math.floor(Math.random() * 7) + 1, // 1-7 hari
      eventsAttended: Math.floor(Math.random() * 10) + 5, // 5-15
    };

    // Adjust based on role
    if (userData.role === 'teacher') {
      baseData.literacyScore += 5;
      baseData.level += 1;
      baseData.articlesRead += 10;
    } else if (userData.role === 'professional') {
      baseData.literacyScore += 3;
      baseData.quizzesCompleted += 5;
    }

    return baseData;
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validation
      if (!email || !password) {
        throw new Error('Email dan password wajib diisi');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Format email tidak valid');
      }

      if (password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }

      // Simulate API call
      const response = await simulateAPICall({
        user: {
          id: Date.now(),
          name: email.includes('teacher') ? 'Guru Demo' : 
                email.includes('professional') ? 'Professional Demo' : 
                email.includes('student') ? 'Mahasiswa Demo' : 'Pengguna Baru',
          email: email,
          avatar: generateAvatar(email),
          role: email.includes('teacher') ? 'teacher' : 
                email.includes('professional') ? 'professional' : 'student',
          memberSince: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          profileData: generateProfileData({
            role: email.includes('teacher') ? 'teacher' : 
                  email.includes('professional') ? 'professional' : 'student'
          })
        },
        token: 'mindloop_jwt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      });

      const { user: userData, token } = response.data;
      
      // Store in localStorage
      localStorage.setItem('mindloop_token', token);
      localStorage.setItem('mindloop_user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      const errorMessage = error.message || 'Login gagal. Silakan coba lagi.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function - AUTO LOGIN setelah register
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validation
      if (!userData.name?.trim()) {
        throw new Error('Nama lengkap wajib diisi');
      }

      if (!userData.email) {
        throw new Error('Email wajib diisi');
      }

      if (!/\S+@\S+\.\S+/.test(userData.email)) {
        throw new Error('Format email tidak valid');
      }

      if (!userData.password) {
        throw new Error('Password wajib diisi');
      }

      if (userData.password.length < 8) {
        throw new Error('Password minimal 8 karakter');
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error('Password dan konfirmasi password tidak cocok');
      }

      if (!userData.agreeToTerms) {
        throw new Error('Anda harus menyetujui syarat dan ketentuan');
      }

      // Check if email already exists (simulation)
      const existingUsers = JSON.parse(localStorage.getItem('mindloop_users') || '[]');
      const emailExists = existingUsers.some(u => u.email === userData.email);
      
      if (emailExists) {
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain.');
      }

      // Simulate API call
      const newUser = {
        id: Date.now(),
        name: userData.name.trim(),
        email: userData.email,
        avatar: generateAvatar(userData.name),
        role: userData.role || 'student',
        memberSince: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        newsletter: userData.newsletter || false,
        profileData: generateProfileData(userData)
      };

      const response = await simulateAPICall({
        user: newUser,
        token: 'mindloop_jwt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      });

      const { user: registeredUser, token } = response.data;
      
      // Store in localStorage - AUTO LOGIN
      localStorage.setItem('mindloop_token', token);
      localStorage.setItem('mindloop_user', JSON.stringify(registeredUser));
      
      // Save to users list (for email uniqueness check)
      existingUsers.push({ email: userData.email, name: userData.name });
      localStorage.setItem('mindloop_users', JSON.stringify(existingUsers));
      
      setUser(registeredUser);
      return { success: true, user: registeredUser };
    } catch (error) {
      const errorMessage = error.message || 'Registrasi gagal. Silakan coba lagi.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('mindloop_token');
    localStorage.removeItem('mindloop_user');
    setUser(null);
    setError(null);
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!email) {
        throw new Error('Email wajib diisi');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Format email tidak valid');
      }

      // Check if email exists
      const existingUsers = JSON.parse(localStorage.getItem('mindloop_users') || '[]');
      const emailExists = existingUsers.some(u => u.email === email);
      
      if (!emailExists) {
        throw new Error('Email tidak terdaftar dalam sistem');
      }

      // Simulate API call
      await simulateAPICall({
        message: 'Link reset password telah dikirim ke email Anda',
        resetToken: 'reset_token_' + Date.now()
      });

      return { 
        success: true, 
        message: 'Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.' 
      };
    } catch (error) {
      const errorMessage = error.message || 'Gagal mengirim email reset. Silakan coba lagi.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        throw new Error('Token reset tidak valid');
      }

      if (!newPassword) {
        throw new Error('Password baru wajib diisi');
      }

      if (newPassword.length < 8) {
        throw new Error('Password minimal 8 karakter');
      }

      // Validate token format (simple simulation)
      if (!token.startsWith('reset_token_')) {
        throw new Error('Token reset tidak valid atau telah kedaluwarsa');
      }

      // Simulate API call
      await simulateAPICall({
        message: 'Password berhasil direset',
        success: true
      });

      return { 
        success: true, 
        message: 'Password berhasil direset. Silakan login dengan password baru Anda.' 
      };
    } catch (error) {
      const errorMessage = error.message || 'Gagal reset password. Silakan coba lagi.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('User tidak ditemukan');
      }

      // Validation
      if (!userData.name?.trim()) {
        throw new Error('Nama lengkap wajib diisi');
      }

      // Simulate API call
      const updatedUser = { 
        ...user, 
        ...userData,
        updatedAt: new Date().toISOString()
      };

      await simulateAPICall({ user: updatedUser });

      // Store in localStorage
      localStorage.setItem('mindloop_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { 
        success: true, 
        user: updatedUser,
        message: 'Profil berhasil diperbarui' 
      };
    } catch (error) {
      const errorMessage = error.message || 'Gagal update profil.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  const value = {
    // State
    user,
    loading,
    error,
    
    // Actions
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    clearError,
    
    // Getters
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
