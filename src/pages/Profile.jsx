import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Camera } from "lucide-react";

// =========================================================
// FUNGSI PEMBANTU: Mendapatkan URL Avatar (Foto Asli atau Inisial)
// =========================================================
const getAvatarUrl = (name, existingAvatarUrl) => {
  if (
    existingAvatarUrl &&
    existingAvatarUrl !== "" &&
    !existingAvatarUrl.includes("placeholder")
  ) {
    return existingAvatarUrl;
  }
  const size = 150;
  const color = "FFFFFF";
  const background = "4C51BF";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=${size}&color=${color}&background=${background}&bold=true`;
};
// =========================================================

// Komponen Profile
const Profile = () => {
  // Pastikan fetchProfile ada dan mengembalikan data profil
  const { user, updateProfile, fetchProfile } = useAuth();

  // === STATE UNTUK DATA PROFIL (dari DB) ===
  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); // Mulai dari true

  // === STATE UNTUK EDIT PROFIL ===
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    tempAvatar: "",
    avatarFile: null,
  });
  // =========================================================
  // EFFECT: Mengambil Data Profil dari Backend (PENCEGAH FLICKER)
  // =========================================================
  useEffect(() => {
    let isMounted = true; // Flag untuk mencegah memory leak dan set state di unmounted component

    // Handle Auth user data
    if (!user) {
      if (isMounted) setIsLoadingProfile(false);
      return;
    }

    // 1. Set Initial State Form Edit (Mengambil dari data user AuthContext)
    const initialAvatar = getAvatarUrl(user.name, user.avatar);
    if (isMounted) {
      setEditForm({
        name: user.name,
        email: user.email,
        tempAvatar: initialAvatar,
        avatarFile: null,
      });
    }

    // 2. Fungsi untuk mengambil data profil lengkap dari backend
    const fetchProfileData = async () => {
      if (!profileData && isMounted) {
        setIsLoadingProfile(true);
      }

      try {
        // Memanggil fetchProfile dari AuthContext
        const data = await fetchProfile();

        if (isMounted) {
          if (data) {
            setProfileData(data);
          } else {
            console.error("Data profil kosong dari backend.");
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Anda bisa menambahkan state error di sini
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };
    fetchProfileData();

    // Cleanup function: Set isMounted ke false saat komponen dilepas
    return () => {
      isMounted = false;
    };
  }, []); // Dependency pada user (dari AuthContext) dan fetchProfile

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setEditForm((prev) => ({
        ...prev,
        tempAvatar: URL.createObjectURL(file),
        avatarFile: file,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);

      if (editForm.avatarFile) {
        formData.append("avatar", editForm.avatarFile);
      }

      await updateProfile(formData);
      setIsEditing(false);

      // Setelah save, kita bisa memicu fetch ulang untuk mendapatkan data statistik terbaru (jika perlu)
      // Namun, karena `updateProfile` biasanya mengupdate `user`, useEffect akan terpicu secara otomatis.
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan profil.");
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setEditForm({
      name: user.name,
      email: user.email,
      tempAvatar: getAvatarUrl(user.name, user.avatar),
      avatarFile: null,
    });
    setIsEditing(false);
  };

  const EditInput = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    disabled = false,
    placeholder = "",
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
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );

  // === KONDISI LOADING DAN ERROR YANG LEBIH BAIK ===
  if (isLoadingProfile || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  // Menangani jika data gagal dimuat (misal: fetchProfile mengembalikan null atau error)
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Gagal Memuat Data
          </h2>
          <p className="text-gray-600">
            Terjadi kesalahan saat mengambil data profil. Pastikan fungsi
            `fetchProfile` di `AuthContext` mengembalikan data dengan format
            yang benar.
          </p>
        </div>
      </div>
    );
  }
  // =================================================

  // Gunakan shorthand 'data' untuk kemudahan membaca kode JSX
  const data = profileData;
  const levelProgress = (data.xp / data.xpToNextLevel) * 100;
  const literacyPercentage = Math.min(Math.max(data.literacyScore, 0), 100);
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
                  <Camera className="w-5 h-5" />
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
                  <p className="text-gray-600 mt-1">
                    {editForm.email || user?.email}
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full capitalize">
                      {data.role || "User"}
                    </span>

                    <span className="text-sm text-gray-500">
                      Member sejak{" "}
                      <strong className="text-gray-700">
                        {data.memberSince}
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
                    label="Email"
                    name="email"
                    value={editForm.email || user?.email || ""}
                    onChange={handleEditChange}
                    type="email"
                    disabled
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
                <div className="text-2xl font-bold">{data.literacyScore}</div>
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

              {/* Main Score & Skills */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  {/* Background Circle */}
                  <div
                    className="w-32 h-32 rounded-full bg-gray-200"
                    style={{
                      background: `conic-gradient(#6366F1 ${
                        literacyPercentage * 3.6
                      }deg, #E5E7EB 0deg)`,
                    }}
                  ></div>

                  {/* Inner Circle (white) */}
                  <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {data.literacyScore}
                    </div>
                    <div className="text-sm text-gray-500">/100</div>
                  </div>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Kemampuan Literasi
                </h3>
                {data.skills &&
                  data.skills.map((skill, index) => (
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

            {/* Weekly Goals */}
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
                {data.weeklyGoals &&
                  data.weeklyGoals.map((goal, index) => (
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

            {/* Reading History */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Riwayat Bacaan Terbaru
              </h2>
              <div className="space-y-3">
                {data.readingHistory &&
                  data.readingHistory.map((item) => (
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

          {/* Right Column - Achievements & Stats */}
          <div className="space-y-6">
            {/* Level Progress */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Progress Level
              </h2>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  Level {data.level}
                </div>
                <div className="text-sm text-gray-600">
                  {data.xp} / {data.xpToNextLevel} XP
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Level {data.level}</span>
                <span>Level {data.level + 1}</span>
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
                  <span className="font-bold">{data.currentStreak}</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-3">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded ${
                      index < data.currentStreak
                        ? "bg-amber-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">
                {data.currentStreak} hari beruntun aktif!
              </p>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Lencana & Prestasi
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {data.badges &&
                  data.badges.map((badge) => (
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
                          {badge.date}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  {data.badges ? data.badges.filter((b) => b.earned).length : 0}{" "}
                  dari {data.badges ? data.badges.length : 0} lencana terkumpul
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
                    {data.articlesRead}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waktu Membaca</span>
                  <span className="font-semibold text-gray-900">
                    {data.readingTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kuis Diselesaikan</span>
                  <span className="font-semibold text-gray-900">
                    {data.quizzesCompleted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Event Dihadiri</span>
                  <span className="font-semibold text-gray-900">
                    {data.eventsAttended}
                  </span>
                </div>
              </div>
            </div>

            {/* Community Ranking */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Peringkat Komunitas</h2>
              <div className="text-3xl font-bold mb-1">
                #{data.communityStats.rank}
              </div>
              <div className="text-sm opacity-90">
                Dari {data.communityStats.totalUsers.toLocaleString()} pengguna
              </div>
              <div className="mt-3 text-sm">
                Impact Score: <strong>{data.communityStats.impactScore}</strong>
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
