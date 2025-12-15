import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// =========================================================
// FUNGSI PEMBANTU: Mendapatkan URL Avatar (Foto Asli atau Inisial)
// =========================================================
const getAvatarUrl = (name, existingAvatarUrl) => {
  // 1. Cek: Jika sudah ada URL avatar yang valid dari database, gunakan itu.
  if (existingAvatarUrl && 
      existingAvatarUrl !== "" && 
      !existingAvatarUrl.includes("placeholder")) {
    return existingAvatarUrl;
  }
  
  // 2. Fallback: Jika tidak ada foto, buat URL inisial dari nama.
  // Menggunakan ui-avatars.com (Gantilah ini dengan layanan Anda sendiri atau generator Canvas jika diperlukan)
  const size = 150;
  const color = 'FFFFFF'; 
  const background = '4C51BF'; // Indigo
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&color=${color}&background=${background}&bold=true`;
};
// =========================================================

// Komponen Profile
const Profile = () => {
  const { user } = useAuth();

  // === STATE UNTUK EDIT PROFIL ===
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    tempAvatar: "", // Menyimpan URL avatar (asli, inisial, atau yang baru diunggah sementara)
  });

  // Efek untuk mengisi form saat user data tersedia
  useEffect(() => {
    if (user) {
      // Tentukan avatar URL yang benar saat memuat
      // Asumsikan field 'avatar' ada di objek user dari AuthContext
      const initialAvatar = getAvatarUrl(user.name, user.avatar);
      
      setEditForm({
        name: user.name,
        email: user.email,
        tempAvatar: initialAvatar,
      });
    }
  }, [user]);
  // ===============================

  // Data sample (Tetap dipertahankan)
  const profileData = {
    literacyScore: 78,
    level: 5,
    xp: 1250,
    xpToNextLevel: 1500,
    // Menggunakan optional chaining dan default value
    memberSince: user?.memberSince || "15 Jan 2024", 
    articlesRead: 47,
    readingTime: "28 jam",
    quizzesCompleted: 47,
    currentStreak: 12,
    eventsAttended: 15,
    // ... data statistik lainnya ...
    badges: [
      { id: 1, name: "Pembaca Aktif", icon: "📚", earned: true, date: "2024-01-20" },
      { id: 2, name: "Kuis Master", icon: "🏆", earned: true, date: "2024-02-15" },
      { id: 3, name: "Streak 7 Hari", icon: "🔥", earned: true, date: "2024-02-10" },
      { id: 4, name: "Event Explorer", icon: "🎪", earned: true, date: "2024-03-01" },
      { id: 5, name: "Speed Reader", icon: "⚡", earned: false },
      { id: 6, name: "Analyst Pro", icon: "🔍", earned: false },
    ],
    readingHistory: [
      { id: 1, title: "Teknik Membaca Cepat untuk Pemula", date: "Hari ini", category: "Teknik Membaca", progress: 100 },
      { id: 2, title: "Mengasah Kemampuan Berpikir Kritis", date: "Kemarin", category: "Berpikir Kritis", progress: 85 },
      { id: 3, title: "Literasi Digital di Era Informasi", date: "2 hari lalu", category: "Literasi Digital", progress: 100 },
    ],
    skills: [
      { name: "Pemahaman Bacaan", level: 85 },
      { name: "Kecepatan Membaca", level: 70 },
      { name: "Analisis Kritis", level: 80 },
      { name: "Fact-Checking", level: 75 },
      { name: "Menulis Ringkasan", level: 65 },
    ],
    weeklyGoals: [
      { goal: "Baca 5 artikel", completed: 4, target: 5, progress: 80 },
      { goal: "Selesaikan 3 kuis", completed: 2, target: 3, progress: 67 },
      { goal: "Habiskan 3 jam membaca", completed: 2.5, target: 3, progress: 83 },
    ],
    communityStats: {
      rank: 245,
      totalUsers: 10000,
      impactScore: 87,
    },
  };

  const levelProgress = (profileData.xp / profileData.xpToNextLevel) * 100;

  // Handler untuk perubahan input form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk upload foto (Hanya menampilkan pratinjau)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditForm((prev) => ({
        ...prev,
        // Menyimpan URL Blob sementara untuk pratinjau
        tempAvatar: URL.createObjectURL(file), 
        // Anda mungkin ingin menyimpan objek File di sini juga: newAvatarFile: file
      }));
    }
  };

  // Handler untuk menyimpan perubahan (Simulasi UI)
  const handleSave = () => {
    console.log("Data yang akan disimpan:", editForm);
    // TODO: Kirim data ke server (termasuk file avatar baru jika ada)
    alert("Profil berhasil diperbarui! (Simulasi UI)");
    setIsEditing(false);
  };

  // Handler untuk membatalkan edit
  const handleCancel = () => {
    if (!user) return;

    // Reset form kembali ke data user asli dan avatar inisial/asli
    const initialAvatar = getAvatarUrl(user.name, user.avatar);
    
    setEditForm({
      name: user.name,
      email: user.email,
      tempAvatar: initialAvatar,
    });
    setIsEditing(false);
  };

  // Component kecil untuk styling input di mode edit
  const EditInput = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    disabled = false,
  }) => (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        className={`w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${
          disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
        }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );

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
    <div className="mt-12 min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-optimized py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Avatar Section */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
              <img
                src={editForm.tempAvatar}
                alt={editForm.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition transform hover:scale-110 shadow-lg"
                  title="Ganti Foto Profil"
                >
                  {/* Icon Edit/Kamera */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M9.444 14.793a8 8 0 01-5.115-4.57 1 1 0 01.996-1.558 1 1 0 011.559.996 6 6 0 109.11-3.642 1 1 0 01.996 1.558 1 1 0 01-1.559.996z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={!isEditing}
              />
            </div>

            {/* Profile Info / Edit Form */}
            <div className="flex-1 w-full md:w-auto">
              {!isEditing ? (
                <>
                  {/* Display Mode */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {editForm.name}
                  </h1>
                  <p className="text-gray-600 mt-1">{editForm.email}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full capitalize">
                      {user?.role}
                    </span>

                    <span className="text-sm text-gray-500">
                      Member sejak{" "}
                      <strong className="text-gray-700">
                        {profileData.memberSince}
                      </strong>
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 w-full max-w-xl">
                  {/* Edit Mode */}
                  <EditInput
                    label="Nama Lengkap"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                  <EditInput
                    label="Email (Tidak Dapat Diubah)"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    type="email"
                    disabled={true}
                  />
                </div>
              )}
            </div>

            {/* Action & Score */}
            <div className="flex flex-col gap-3 ml-auto">
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition shadow-md"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition shadow-md"
                >
                  Edit Profil
                </button>
              )}

              {/* Literacy Score */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-4 text-center min-w-[120px] mt-4 md:mt-0">
                <div className="text-2xl font-bold">
                  {profileData.literacyScore}
                </div>
                <div className="text-xs opacity-90">Literacy Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Stats, Goals, History) */}
      <div className="container-optimized py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Goals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Literacy Score Card */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Literacy Score & Progress
              </h2>

              {/* Main Score & Skills (kode tidak berubah) */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {profileData.literacyScore}
                      </div>
                      <div className="text-sm text-gray-500">/100</div>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-transparent border-t-indigo-500 border-r-indigo-400 -rotate-45"
                    style={{
                      clipPath:
                        "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Skills Progress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Kemampuan Literasi
                </h3>
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-900 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Goals (kode tidak berubah) */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Target Mingguan
                </h2>
                <span className="text-sm text-gray-500">
                  Reset dalam 2 hari
                </span>
              </div>
              <div className="space-y-4">
                {profileData.weeklyGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          goal.progress === 100
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {goal.progress === 100 ? "✓" : "🎯"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {goal.goal}
                        </div>
                        <div className="text-sm text-gray-500">
                          {goal.completed}/{goal.target} selesai
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {goal.progress}%
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            goal.progress === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading History (kode tidak berubah) */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Riwayat Bacaan Terbaru
              </h2>
              <div className="space-y-3">
                {profileData.readingHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.progress === 100
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.progress === 100 ? "✓" : "📖"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.category} • {item.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {item.progress}%
                      </div>
                      <div className="text-xs text-gray-500">Selesai</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Stats (kode tidak berubah) */}
          <div className="space-y-6">
            {/* Level Progress */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Progress Level
              </h2>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  Level {profileData.level}
                </div>
                <div className="text-sm text-gray-600">
                  {profileData.xp} / {profileData.xpToNextLevel} XP
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Level {profileData.level}</span>
                <span>Level {profileData.level + 1}</span>
              </div>
            </div>

            {/* Activity Streak */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Activity Streak
                </h2>
                <div className="flex items-center gap-1 text-amber-600">
                  <span className="text-lg">🔥</span>
                  <span className="font-bold">{profileData.currentStreak}</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-3">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded ${
                      index < profileData.currentStreak
                        ? "bg-amber-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">
                {profileData.currentStreak} hari beruntun aktif!
              </p>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Lencana & Prestasi
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {profileData.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-lg text-center ${
                      badge.earned
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {badge.name}
                    </div>
                    {badge.earned && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(badge.date).toLocaleDateString("id-ID")}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  {profileData.badges.filter((b) => b.earned).length} dari{" "}
                  {profileData.badges.length} lencana terkumpul
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Statistik Cepat
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Artikel Dibaca</span>
                  <span className="font-semibold text-gray-900">
                    {profileData.articlesRead}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waktu Membaca</span>
                  <span className="font-semibold text-gray-900">
                    {profileData.readingTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kuis Diselesaikan</span>
                  <span className="font-semibold text-gray-900">
                    {profileData.quizzesCompleted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Event Dihadiri</span>
                  <span className="font-semibold text-gray-900">
                    {profileData.eventsAttended}
                  </span>
                </div>
              </div>
            </div>

            {/* Community Ranking */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Peringkat Komunitas</h2>
              <div className="text-3xl font-bold mb-1">
                #{profileData.communityStats.rank}
              </div>
              <div className="text-sm opacity-90">
                Dari {profileData.communityStats.totalUsers.toLocaleString()}{" "}
                pengguna
              </div>
              <div className="mt-3 text-sm">
                Impact Score:{" "}
                <strong>{profileData.communityStats.impactScore}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;