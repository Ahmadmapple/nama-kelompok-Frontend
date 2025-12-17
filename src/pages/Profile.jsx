import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Camera } from "lucide-react";

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

const Profile = () => {
  const { user, updateProfile, fetchProfile } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    tempAvatar: getAvatarUrl(user?.name || "User", user?.avatar),
    avatarFile: null,
  });

  const fetchProfileData = useCallback(async () => {
    if (!user || !fetchProfile) return;

    if (!profileData) {
      setIsLoadingProfile(true);
    }

    try {
      const data = await fetchProfile();

      if (data) {
        setProfileData(data);

        const initialAvatar = getAvatarUrl(
          data.name || user.name,
          data.avatar || user.avatar
        );

        setEditForm({
          name: data.name || user.name,
          email: data.email || user.email,
          tempAvatar: initialAvatar,
          avatarFile: null,
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [user, fetchProfile, profileData]);

  useEffect(() => {
    if (user && !profileData) {
      fetchProfileData();
    }
  }, [user, profileData, fetchProfileData]);

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

      // PERBAIKAN #1: Sinkronisasi setelah Simpan
      await fetchProfileData();

      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan profil.");
    }
  };

  const handleCancel = () => {
    // PERBAIKAN #2: Cancel harus kembali ke data profileData server yang sudah ada
    const source = profileData || user;

    setEditForm({
      name: source.name || "",
      email: source.email || "",
      tempAvatar: getAvatarUrl(source.name || "User", source.avatar),
      avatarFile: null,
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Akses Ditolak
          </h2>
          <p className="text-gray-600">
            Mohon login untuk melihat halaman profil Anda.
          </p>
        </div>
      </div>
    );
  }

  const data = profileData || user;
  const levelProgress =
    data.xp && data.xpToNextLevel ? (data.xp / data.xpToNextLevel) * 100 : 0;
  const literacyPercentage = Math.min(
    Math.max(data.literacyScore || 0, 0),
    100
  );

  return (
    <div className="mt-12 min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200">
        <div className="container-optimized py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
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

            <div className="flex-1 w-full md:w-auto">
              {!isEditing ? (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {editForm.name}
                  </h1>
                  <p className="text-gray-600 mt-1">{editForm.email}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {/* Lencana Role Pengguna (Contoh: user) */}
                    <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full capitalize">
                      {data.role || "User"}
                    </span>

                    {/* Lencana Status Pengguna (Contoh: teacher) */}
                    {data.statusPengguna && (
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full capitalize">
                        {data.statusPengguna}
                      </span>
                    )}

                    <span className="text-sm text-gray-500">
                      Member sejak{" "}
                      <strong className="text-gray-700">
                        {data.memberSince || "N/A"}
                      </strong>
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 w-full max-w-xl">
                  <EditInput
                    label="Nama Lengkap"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                  <EditInput
                    label="Email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    type="email"
                    disabled
                  />
                </div>
              )}
            </div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="container-optimized py-8">
        {isLoadingProfile || !profileData ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 p-6 bg-white rounded-2xl shadow-soft border border-gray-100 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-soft border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-20 bg-gray-100 rounded-lg"></div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Literacy Score & Progress
                </h2>
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <div
                      className="w-32 h-32 rounded-full bg-gray-200"
                      style={{
                        background: `conic-gradient(#6366F1 ${
                          literacyPercentage * 3.6
                        }deg, #E5E7EB 0deg)`,
                      }}
                    ></div>

                    <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {data.literacyScore}
                      </div>
                      <div className="text-sm text-gray-500">/100</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Kemampuan Literasi
                  </h3>
                  {data.skills?.map((skill, index) => (
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
                  {data.weeklyGoals?.map((goal, index) => (
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

              {/* Riwayat Bacaan Terbaru */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Riwayat Bacaan Terbaru
                </h2>
                <div className="space-y-3">
                  {data.readingHistory && data.readingHistory.length > 0 ? (
                    data.readingHistory.map((item) => (
                      <div
                        key={item.id}
                        className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              item.progress === 100
                                ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg"
                                : "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg"
                            }`}
                          >
                            <span className="text-xl">{item.progress === 100 ? "✓" : "📖"}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                                {item.category}
                              </span>
                              <span>•</span>
                              <span>{item.date}</span>
                            </div>
                            {item.progress < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">📖</div>
                      <p className="text-sm">Tidak ada riwayat bacaan. Mulai baca sekarang!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Event yang Didaftari */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎫</span>
                  Event yang Didaftari
                </h2>
                <div className="space-y-3">
                  {data.registeredEvents && data.registeredEvents.length > 0 ? (
                    data.registeredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="group relative bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-xl p-4 hover:shadow-md hover:border-purple-300 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                            <span className="text-xl">🎉</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                              {event.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                                {event.type}
                              </span>
                              <span>•</span>
                              <span>{event.date}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              Terdaftar pada {event.registeredDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">🎫</div>
                      <p className="text-sm">Belum ada event yang didaftari. Daftar event sekarang!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Riwayat Kuis */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Riwayat Kuis
                </h2>
                <div className="space-y-3">
                  {data.quizHistory && data.quizHistory.length > 0 ? (
                    data.quizHistory.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="group relative bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-xl p-4 hover:shadow-md hover:border-amber-300 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-lg ${
                            quiz.score >= 80 
                              ? "bg-gradient-to-br from-green-400 to-emerald-500" 
                              : quiz.score >= 60 
                              ? "bg-gradient-to-br from-yellow-400 to-amber-500" 
                              : "bg-gradient-to-br from-red-400 to-pink-500"
                          }`}>
                            <span className="text-xl font-bold">{quiz.score}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                              {quiz.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                                Skor: {quiz.score}%
                              </span>
                              <span>•</span>
                              <span>{quiz.date}</span>
                            </div>
                            {quiz.xpEarned && (
                              <div className="text-xs text-green-600 font-medium">
                                +{quiz.xpEarned} XP
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-sm">Belum ada kuis yang diselesaikan. Mulai kuis sekarang!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Progress Level
                </h2>

                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    Level {data.level}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {data.xp} / {data.xpToNextLevel} XP
                  </div>
                  <div className="text-xs text-gray-400">
                    {data.xpToNextLevel - data.xp} XP lagi untuk level {data.level + 1}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Level {data.level}</span>
                  <span>Level {data.level + 1}</span>
                </div>

                {/* Level Requirements Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    📊 Kebutuhan XP per Level:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Level 1 → 2:</span>
                      <span className="font-medium">100 XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level 2 → 3:</span>
                      <span className="font-medium">200 XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level 3 → 4:</span>
                      <span className="font-medium">300 XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level 4 → 5:</span>
                      <span className="font-medium">400 XP</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">
                    Setiap level membutuhkan +100 XP lebih banyak
                  </div>
                </div>
              </div>

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

              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Lencana & Prestasi
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {data.badges?.map((badge) => (
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
                    {data.badges
                      ? data.badges.filter((b) => b.earned).length
                      : 0}{" "}
                    dari {data.badges ? data.badges.length : 0} lencana
                    terkumpul
                  </div>
                </div>
              </div>

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

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Peringkat Komunitas</h2>
                <div className="text-3xl font-bold mb-1">
                  #{data.communityStats?.rank || "--"}
                </div>
                <div className="text-sm opacity-90">
                  Dari{" "}
                  {data.communityStats?.totalUsers?.toLocaleString() || "--"}{" "}
                  pengguna
                </div>
                <div className="mt-3 text-sm">
                  Impact Score:{" "}
                  <strong>{data.communityStats?.impactScore || "--"}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
