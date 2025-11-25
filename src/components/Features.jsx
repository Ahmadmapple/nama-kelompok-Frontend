const Features = () => {
  const features = [
    {
      icon: '📚',
      title: 'Kurasi Konten Premium',
      description: 'Artikel dan materi pembelajaran yang dikurasi oleh ahli literasi untuk memastikan kualitas dan relevansi dengan perkembangan terkini.'
    },
    {
      icon: '🎯',
      title: 'Pembelajaran Personal',
      description: 'Sistem AI yang menyesuaikan konten dengan minat, tingkat kemampuan, dan tujuan pembelajaran Anda secara real-time.'
    },
    {
      icon: '🏆',
      title: 'Tantangan Gamifikasi',
      description: 'Program tantangan dengan sistem poin, badge, dan leaderboard untuk membuat proses belajar menjadi menyenangkan.'
    },
    {
      icon: '👥',
      title: 'Komunitas Interaktif',
      description: 'Bergabung dengan komunitas pembaca untuk berdiskusi, berbagi insight, dan saling mendukung dalam perjalanan literasi.'
    },
    {
      icon: '📊',
      title: 'Analisis Progress Mendalam',
      description: 'Pantau perkembangan literasi Anda dengan statistik detail dan rekomendasi yang dipersonalisasi.'
    },
    {
      icon: '🎓',
      title: 'Sertifikasi Terakreditasi',
      description: 'Dapatkan sertifikat resmi setelah menyelesaikan program untuk meningkatkan nilai akademik dan profesional Anda.'
    }
  ];

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 30% 70%, rgba(79, 70, 229, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="section-header">
          <p className="section-subtitle">Mengapa Memilih Kami</p>
          <h2 className="section-title">Pengalaman Literasi yang Berbeda</h2>
          <p className="section-desc">
            Kami menghadirkan pendekatan unik dalam meningkatkan literasi dengan metode yang menyenangkan dan efektif
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full opacity-10 scale-110"></div>
                <div className="relative w-15 h-15 bg-white rounded-xl flex items-center justify-center mx-auto mt-2.5 text-indigo-600 text-2xl shadow-lg shadow-indigo-500/15 transition-all duration-300 group-hover:scale-110 group-hover:rotate-5 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-emerald-500 group-hover:text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="font-semibold text-xl mb-4 text-gray-900 relative">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed relative">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;