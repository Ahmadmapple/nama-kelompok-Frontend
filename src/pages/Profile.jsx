// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProgressDashboard from '../components/quiz/ProgressDashboard';

const Profile = () => {
  const { user, updateProfile, updatePassword, authError, authSuccess, clearAuthMessages } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State untuk form settings
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    avatar: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    quizReminders: true,
    newArticles: true,
    eventUpdates: true,
    weeklyReports: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [localMessages, setLocalMessages] = useState({ success: '', error: '' });

  // Data sample yang menggunakan data user dari AuthContext
  const profileData = {
    literacyScore: 78,
    level: 5,
    xp: 1250,
    xpToNextLevel: 1500,
    memberSince: user?.memberSince || '15 Jan 2024',
    articlesRead: user?.stats?.articlesRead || 47,
    readingTime: user?.stats?.readingTime || '28 jam',
    quizzesCompleted: user?.stats?.quizzesCompleted || 47,
    currentStreak: user?.stats?.streak || 12,
    eventsAttended: user?.stats?.eventsAttended || 15,
    badges: [
      { id: 1, name: 'Pembaca Aktif', icon: '📚', earned: true, date: '2024-01-20' },
      { id: 2, name: 'Kuis Master', icon: '🏆', earned: true, date: '2024-02-15' },
      { id: 3, name: 'Streak 7 Hari', icon: '🔥', earned: true, date: '2024-02-10' },
      { id: 4, name: 'Event Explorer', icon: '🎪', earned: true, date: '2024-03-01' },
      { id: 5, name: 'Speed Reader', icon: '⚡', earned: false },
      { id: 6, name: 'Analyst Pro', icon: '🔍', earned: false }
    ],
    readingHistory: [
      { id: 1, title: 'Teknik Membaca Cepat untuk Pemula', date: 'Hari ini', category: 'Teknik Membaca', progress: 100 },
      { id: 2, title: 'Mengasah Kemampuan Berpikir Kritis', date: 'Kemarin', category: 'Berpikir Kritis', progress: 85 },
      { id: 3, title: 'Literasi Digital di Era Informasi', date: '2 hari lalu', category: 'Literasi Digital', progress: 100 }
    ],
    skills: [
      { name: 'Pemahaman Bacaan', level: 85 },
      { name: 'Kecepatan Membaca', level: 70 },
      { name: 'Analisis Kritis', level: 80 },
      { name: 'Fact-Checking', level: 75 },
      { name: 'Menulis Ringkasan', level: 65 }
    ],
    weeklyGoals: [
      { goal: 'Baca 5 artikel', completed: 4, target: 5, progress: 80 },
      { goal: 'Selesaikan 3 kuis', completed: 2, target: 3, progress: 67 },
      { goal: 'Habiskan 3 jam membaca', completed: 2.5, target: 3, progress: 83 }
    ],
    communityStats: {
      rank: 245,
      totalUsers: 10000,
      impactScore: 87
    }
  };

  // Inisialisasi form dengan data user saat komponen mount
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      });
      
      // Load notification settings from user preferences
      if (user.preferences) {
        setNotificationSettings(prev => ({
          ...prev,
          ...user.preferences
        }));
      }
    }
  }, [user]);

  // Clear messages when tab changes
  useEffect(() => {
    if (authError || authSuccess) {
      const timer = setTimeout(() => {
        clearAuthMessages();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authError, authSuccess, clearAuthMessages]);

  // Calculate level progress
  const levelProgress = (profileData.xp / profileData.xpToNextLevel) * 100;

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any local messages when user starts typing
    if (localMessages.success || localMessages.error) {
      setLocalMessages({ success: '', error: '' });
    }
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any local messages when user starts typing
    if (localMessages.success || localMessages.error) {
      setLocalMessages({ success: '', error: '' });
    }
  };

  // Handle notification settings change
  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Save profile settings
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setLocalMessages({ success: '', error: '' });
    
    try {
      // Validation
      if (!profileForm.name.trim()) {
        throw new Error('Nama harus diisi');
      }
      
      if (!profileForm.email.trim()) {
        throw new Error('Email harus diisi');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileForm.email)) {
        throw new Error('Format email tidak valid');
      }
      
      // Update profile
      await updateProfile(profileForm);
      
      // Show success message
      setLocalMessages({ 
        success: 'Profil berhasil diperbarui!', 
        error: '' 
      });
      
      // Clear form messages after 3 seconds
      setTimeout(() => {
        setLocalMessages({ success: '', error: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setLocalMessages({ 
        success: '', 
        error: error.message || 'Gagal memperbarui profil' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setLocalMessages({ success: '', error: '' });
    
    try {
      // Validation
      if (!passwordForm.currentPassword.trim()) {
        throw new Error('Password saat ini harus diisi');
      }
      
      if (!passwordForm.newPassword.trim()) {
        throw new Error('Password baru harus diisi');
      }
      
      if (passwordForm.newPassword.length < 6) {
        throw new Error('Password baru minimal 6 karakter');
      }
      
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('Password baru tidak cocok');
      }
      
      // Update password
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      // Show success message
      setLocalMessages({ 
        success: 'Password berhasil diubah!', 
        error: '' 
      });
      
      // Clear form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Clear form messages after 3 seconds
      setTimeout(() => {
        setLocalMessages({ success: '', error: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error changing password:', error);
      setLocalMessages({ 
        success: '', 
        error: error.message || 'Gagal mengubah password' 
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Export data
  const handleExportData = () => {
    const data = {
      user: {
        name: user?.name,
        email: user?.email,
        memberSince: user?.memberSince,
        stats: user?.stats || {}
      },
      profileStats: profileData,
      settings: notificationSettings,
      exportDate: new Date().toISOString(),
      exportPlatform: 'MindLoop Web'
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const dataUrl = URL.createObjectURL(dataBlob);
    
    const exportFileDefaultName = `mindloop-data-${user?.name || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.href = dataUrl;
    linkElement.download = exportFileDefaultName;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(dataUrl);
    
    // Show success message
    setLocalMessages({ 
      success: 'Data berhasil diekspor!', 
      error: '' 
    });
    
    setTimeout(() => {
      setLocalMessages({ success: '', error: '' });
    }, 3000);
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
      // In a real app, this would call an API
      alert('Fitur penghapusan akun akan segera hadir!');
    }
  };

  // Jika user belum login, tampilkan loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Profile Header dengan Tombol Action */}
      <div className="bg-white border-b border-gray-200 mt-12">
        <div className="container-optimized py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img 
                  src={user?.avatar || profileForm.avatar} 
                  alt={user?.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=4f46e5&color=fff`;
                  }}
                />
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700 transition-colors"
                  title="Ganti foto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full capitalize">
                    {user?.role || 'Member'}
                  </span>
                  <span className="text-xs text-gray-500">ID: {user?.id?.slice(0, 8) || 'N/A'}</span>
                </div>
                
                {/* Level & XP */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {profileData.level}
                    </div>
                    <span className="text-sm font-medium text-gray-700">Level {profileData.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                      ⚡
                    </div>
                    <span className="text-sm font-medium text-gray-700">{profileData.xp} XP</span>
                  </div>
                  <span className="text-sm text-gray-500">Member sejak {profileData.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Literacy Score */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold">{profileData.literacyScore}</div>
                <div className="text-xs opacity-90">Literacy Score</div>
              </div>
              
              {/* TOMBOL PROGRESS BELAJAR */}
              <button
                onClick={() => setActiveTab('progress')}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Progress Belajar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-optimized py-8">
        {/* Navigation Tabs */}
        <div className="flex mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Overview
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'progress' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Progress Belajar
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Pengaturan
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* ... (Overview content sama seperti sebelumnya) ... */}
              {/* (Karena panjang, saya tidak ulangi semua overview content) */}
              {/* Tetap gunakan overview content dari kode sebelumnya */}
            </div>
          )}

          {activeTab === 'progress' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Progress Belajar & Kuis</h2>
                <p className="text-gray-600">Lihat perkembangan kemampuan literasi Anda melalui dashboard kuis</p>
              </div>
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
                <ProgressDashboard />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Display Auth Messages */}
              {(authError || authSuccess) && (
                <div className={`p-4 rounded-lg ${
                  authError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {authError || authSuccess}
                </div>
              )}

              {/* Profile Settings */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">👤 Informasi Profil</h2>
                
                {/* Local Messages */}
                {localMessages.success && (
                  <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    {localMessages.success}
                  </div>
                )}
                
                {localMessages.error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {localMessages.error}
                  </div>
                )}
                
                <form onSubmit={handleSaveProfile}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Foto Profil
                      </label>
                      <input 
                        type="url" 
                        name="avatar"
                        value={profileForm.avatar}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://example.com/photo.jpg"
                      />
                      <p className="text-sm text-gray-500 mt-1">Masukkan URL gambar profil Anda</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea 
                        rows="3"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ceritakan tentang diri Anda..."
                        maxLength="200"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {profileForm.bio.length}/200 karakter
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menyimpan...
                        </>
                      ) : (
                        'Simpan Perubahan'
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🔐 Ubah Password</h2>
                
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Saat Ini
                      </label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan password saat ini"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password Baru
                        </label>
                        <input 
                          type="password" 
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Minimal 6 karakter"
                          required
                          minLength="6"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konfirmasi Password Baru
                        </label>
                        <input 
                          type="password" 
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ulangi password baru"
                          required
                          minLength="6"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button 
                        type="submit"
                        disabled={isChangingPassword}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isChangingPassword ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Mengubah...
                          </>
                        ) : (
                          'Ubah Password'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🔔 Pengaturan Notifikasi</h2>
                
                <div className="space-y-3">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">
                          {key === 'emailNotifications' && 'Notifikasi Email'}
                          {key === 'quizReminders' && 'Pengingat Kuis'}
                          {key === 'newArticles' && 'Artikel Baru'}
                          {key === 'eventUpdates' && 'Update Event'}
                          {key === 'weeklyReports' && 'Laporan Mingguan'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Kirim notifikasi melalui email'}
                          {key === 'quizReminders' && 'Ingatkan tentang kuis yang belum diselesaikan'}
                          {key === 'newArticles' && 'Beritahu ketika ada artikel baru'}
                          {key === 'eventUpdates' && 'Update tentang event dan webinar'}
                          {key === 'weeklyReports' && 'Kirim laporan progress mingguan'}
                        </div>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          value ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📁 Kelola Data</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Ekspor Data</div>
                      <div className="text-sm text-gray-600">Unduh semua data Anda dalam format JSON</div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleExportData}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ekspor
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Hapus Akun</div>
                      <div className="text-sm text-gray-600">Hapus akun dan semua data Anda secara permanen</div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Hapus Akun
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
