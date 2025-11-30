import { ArrowLeft, BookOpen, Clock, Brain, TrendingUp } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FF] text-gray-800 flex flex-col">

      {/* TOP BACK BUTTON */}
      <div className="p-5 flex items-center gap-2 text-sm cursor-pointer">
        <ArrowLeft size={18} />
        <span>Kembali ke Beranda</span>
      </div>

      {/* TITLE */}
      <h1 className="px-5 text-2xl font-semibold mb-3">Profil & Jejak Literasi</h1>

      {/* NAVBAR PLACEHOLDER */}
      <div className="w-full border-y bg-white px-5 py-3 flex items-center gap-6 text-sm">
        <span className="font-semibold text-blue-700">LiterasiKu</span>
        <a>Beranda</a>
        <a>Artikel</a>
        <a>Tantangan</a>
        <a>Kuis</a>
        <a>Komunitas</a>
        <a>Ruang Fakta</a>
        <a>Event</a>
        <button className="ml-auto px-4 py-1 bg-black text-white rounded-lg">Profil</button>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-white w-full mt-2 px-6 py-6 rounded-xl shadow-sm">

        <div className="flex items-center gap-5">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
            AP
          </div>

          <div className="">
            <h2 className="text-xl font-semibold">Andi Pratama</h2>
            <div className="flex gap-2 mt-1 text-xs">
              <span className="px-2 py-1 bg-gray-100 rounded-md">🥈 Level 2</span>
              <span className="px-2 py-1 bg-gray-100 rounded-md">235 Poin</span>
              <span className="px-2 py-1 bg-gray-100 rounded-md">2 Lencana</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Member sejak Oktober 2025 • Pembaca Aktif
            </p>
          </div>

          <button className="ml-auto px-4 py-2 text-sm bg-gray-100 rounded-lg">
            Edit Profil
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3 w-full px-6 mt-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl py-5 text-center shadow-sm">
          <BookOpen className="mx-auto mb-2 text-blue-600" />
          <h3 className="text-2xl font-semibold">12</h3>
          <p className="text-gray-600">Artikel Dibaca</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl py-5 text-center shadow-sm">
          <Clock className="mx-auto mb-2 text-green-600" />
          <h3 className="text-2xl font-semibold">48</h3>
          <p className="text-gray-600">Menit Membaca</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl py-5 text-center shadow-sm">
          <Brain className="mx-auto mb-2 text-purple-600" />
          <h3 className="text-2xl font-semibold">8</h3>
          <p className="text-gray-600">Kuis Selesai</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl py-5 text-center shadow-sm">
          <TrendingUp className="mx-auto mb-2 text-orange-500" />
          <h3 className="text-2xl font-semibold">85%</h3>
          <p className="text-gray-600">Rata-rata Skor</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 text-sm px-6 mt-6">
        <span className="px-3 py-1 rounded-md bg-gray-200">📚 Artikel</span>
        <span className="px-3 py-1 rounded-md bg-gray-200">🏆 Tantangan</span>
        <span className="px-3 py-1 rounded-md bg-gray-200">🎖️ Lencana</span>
        <span className="px-3 py-1 rounded-md bg-gray-200">📊 Statistik</span>
      </div>

      {/* READING HISTORY */}
      <div className="bg-white rounded-xl mt-4 mx-6 p-5">

        <h2 className="text-lg font-semibold mb-4">Riwayat Bacaan</h2>

        {/* List item 1 */}
        <div className="p-4 bg-gray-50 rounded-lg mb-3">
          <div className="text-sm font-semibold">Mengapa Literasi Digital Penting di Era Modern</div>
          <div className="text-xs text-gray-600 mt-1">4 menit baca • Dibaca 2025-11-10</div>
        </div>

        {/* List item 2 */}
        <div className="p-4 bg-gray-50 rounded-lg mb-3">
          <div className="text-sm font-semibold">Tips Membentuk Kebiasaan Membaca Setiap Hari</div>
          <div className="text-xs text-gray-600 mt-1">3 menit baca • Dibaca 2025-11-09</div>
        </div>

        {/* List item 3 */}
        <div className="p-4 bg-gray-50 rounded-lg mb-3">
          <div className="text-sm font-semibold">Mengenali Ciri-Ciri Berita Hoaks</div>
          <div className="text-xs text-gray-600 mt-1">5 menit baca • Dibaca 2025-11-08</div>
        </div>

        {/* List item 4 */}
        <div className="p-4 bg-gray-50 rounded-lg mb-3">
          <div className="text-sm font-semibold">Literasi Keuangan untuk Generasi Muda</div>
          <div className="text-xs text-gray-600 mt-1">4 menit baca • Dibaca 2025-11-07</div>
        </div>

        <button className="w-full bg-gray-100 py-2 rounded-lg mt-2 text-sm">
          Lihat Semua Riwayat
        </button>
      </div>

      {/* ACHIEVEMENT */}
      <div className="bg-purple-50 rounded-xl mt-6 mx-6 p-6 text-center border border-purple-100">
        <div className="text-purple-600 text-4xl mb-2">🎖️</div>
        <h2 className="font-semibold mb-2">Pencapaian Terbaru</h2>
        <p className="text-gray-700 text-sm mb-3">
          Selamat! Kamu telah menyelesaikan tantangan “Pembaca Konsisten” dan mendapatkan 50 poin!
        </p>

        <button className="w-full bg-white py-2 border border-purple-300 rounded-lg">
          Lihat Semua Pencapaian
        </button>
      </div>

      <div className="h-20" /> {/* Space */}

    </div>
  );
};

export default Profile;
