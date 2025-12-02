import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Konten Terkurasi Ahli",
      description: "Ribuan materi pembelajaran yang sudah melalui proses kurasi ketat oleh pakar literasi dan pendidikan. Setiap konten diverifikasi untuk memastikan kredibilitas dan akurasi.",
      color: "from-blue-500 to-cyan-500",
      stats: "2,500+ Materi",
      details: [
        "Kurasi oleh 50+ pakar literasi",
        "Update konten mingguan",
        "Materi berdasarkan penelitian terbaru",
        "Format beragam: artikel, video, infografis"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: "Pembelajaran Personal",
      description: "AI-powered recommendations yang menyesuaikan konten dengan minat, level, dan tujuan belajar Anda. Sistem adaptif yang berkembang seiring kemajuan Anda.",
      color: "from-purple-500 to-pink-500",
      stats: "AI-Powered",
      details: [
        "Rekomendasi konten personal",
        "Learning path otomatis",
        "Adaptive difficulty system",
        "Progress-based suggestions"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Analisis Progress Detail",
      description: "Dashboard komprehensif dengan insights actionable untuk memantau perkembangan kemampuan literasi. Track setiap aspek perkembangan dengan metrik yang terukur.",
      color: "from-green-500 to-emerald-500",
      stats: "Real-time Analytics",
      details: [
        "Literacy Score tracking",
        "Skill progress visualization",
        "Weekly performance reports",
        "Comparative analytics"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Komunitas Interaktif",
      description: "Bergabung dengan komunitas pembaca untuk diskusi, berbagi insight, dan saling mendukung. Belajar dari pengalaman anggota komunitas lainnya.",
      color: "from-orange-500 to-red-500",
      stats: "50K+ Members",
      details: [
        "Diskusi artikel terpandu",
        "Study groups berdasarkan minat",
        "Expert Q&A sessions",
        "Peer review system"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Tantangan Gamifikasi",
      description: "Tingkatkan motivasi dengan sistem poin, badge, dan leaderboard yang menyenangkan. Ubah pembelajaran menjadi pengalaman yang engaging dan rewarding.",
      color: "from-indigo-500 to-blue-500",
      stats: "100+ Challenges",
      details: [
        "Daily reading challenges",
        "Achievement badges",
        "XP & level system",
        "Community leaderboard"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Sertifikasi Resmi",
      description: "Dapatkan sertifikat terakreditasi setelah menyelesaikan program untuk meningkatkan kredibilitas. Buktikan kemampuan literasi Anda dengan sertifikat yang diakui.",
      color: "from-amber-500 to-yellow-500",
      stats: "Industry Recognized",
      details: [
        "Sertifikat per level",
        "Digital badges shareable",
        "Verified credentials",
        "LinkedIn integration"
      ]
    }
  ];

  const impactStats = [
    { number: '94%', label: 'Peningkatan Pemahaman Bacaan' },
    { number: '2.8x', label: 'Rata-rata Peningkatan Kecepatan Baca' },
    { number: '78%', label: 'Peningkatan Kemampuan Analisis' },
    { number: '50K+', label: 'Pembaca Telah Bergabung' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="container-optimized">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Fitur Unggulan MindLoop
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transformasi <span className="gradient-text">Pengalaman Membaca</span> Anda
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              MindLoop menghadirkan pendekatan holistik dalam pembelajaran literasi - menggabungkan 
              teknologi terkini, metodologi terbaik, dan komunitas yang mendukung untuk hasil yang terukur.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container-optimized">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-optimized">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 hover:shadow-strong transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Feature Details */}
                <div className="space-y-2 mb-4">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-indigo-600">
                    {feature.stats}
                  </span>
                  <button className="text-indigo-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Pelajari Lebih
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container-optimized">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Siap Memulai Perjalanan Literasi Anda?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed text-white">
              Bergabunglah dengan <strong>50,000+ pembaca cerdas</strong> yang sudah mengalami 
              transformasi dalam kemampuan membaca dan berpikir kritis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <span>Daftar Gratis</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                to="/articles" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Jelajahi Artikel
              </Link>
            </div>
            
            <div className="mt-6 text-sm opacity-80 flex flex-col sm:flex-row gap-2 justify-center items-center">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Akses 14 hari gratis
              </span>
              <span className="hidden sm:block">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1,000+ artikel premium
              </span>
              <span className="hidden sm:block">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Tidak perlu kartu kredit
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Features;
//penanda