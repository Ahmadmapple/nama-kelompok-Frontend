import React from 'react';

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Konten Terkurasi Ahli",
      description: "Ribuan materi pembelajaran yang sudah melalui proses kurasi ketat oleh pakar literasi dan pendidikan.",
      color: "from-blue-500 to-cyan-500",
      stats: "2,500+ Materi"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: "Pembelajaran Personal",
      description: "AI-powered recommendations yang menyesuaikan konten dengan minat, level, dan tujuan belajar Anda.",
      color: "from-purple-500 to-pink-500",
      stats: "AI-Powered"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Analisis Progress Detail",
      description: "Dashboard komprehensif dengan insights actionable untuk memantau perkembangan kemampuan literasi.",
      color: "from-green-500 to-emerald-500",
      stats: "Real-time Analytics"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Komunitas Interaktif",
      description: "Bergabung dengan komunitas pembaca untuk diskusi, berbagi insight, dan saling mendukung.",
      color: "from-orange-500 to-red-500",
      stats: "50K+ Members"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Tantangan Gamifikasi",
      description: "Tingkatkan motivasi dengan sistem poin, badge, dan leaderboard yang menyenangkan.",
      color: "from-indigo-500 to-blue-500",
      stats: "100+ Challenges"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Sertifikasi Resmi",
      description: "Dapatkan sertifikat terakreditasi setelah menyelesaikan program untuk meningkatkan kredibilitas.",
      color: "from-amber-500 to-yellow-500",
      stats: "Industry Recognized"
    }
  ];

  return (
    <section id="features" className="section bg-white section-pattern">
      <div className="container-custom">
        <div className="section-header">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Fitur Unggulan
          </div>
          <h2 className="section-title">
            Mengapa <span className="gradient-text">LiterasiKu</span> Berbeda?
          </h2>
          <p className="section-subtitle">
            Kami menghadirkan pendekatan holistik dalam pembelajaran literasi - menggabungkan teknologi terkini, 
            metodologi terbaik, dan komunitas yang mendukung untuk hasil yang optimal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transition-all duration-500 feature-card:hover:scale-110 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="font-bold text-xl mb-4 text-gray-900 feature-card:hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6 feature-card:hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 feature-card:hover:border-indigo-100 transition-colors">
                <span className="text-sm font-semibold text-indigo-600">
                  {feature.stats}
                </span>
                <button className="text-indigo-600 font-semibold text-sm flex items-center gap-2 feature-card:hover:gap-3 transition-all">
                  Jelajahi
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12 max-w-4xl mx-auto border border-indigo-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/20 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Siap Transformasi Kemampuan Literasi Anda?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Bergabung dengan <strong>10,000+ pembaca cerdas</strong> yang sudah mengalami peningkatan signifikan 
                dalam kemampuan membaca kritis dan analitis mereka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary btn-lg group">
                  Coba Gratis 14 Hari
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="btn btn-secondary btn-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Konsultasi dengan Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
