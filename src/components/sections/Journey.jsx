const Journey = () => {
  const steps = [
    {
      number: '1',
      icon: '🚀',
      title: 'Daftar & Buat Profil',
      description: 'Buat akun gratis dan lengkapi profil untuk mendapatkan rekomendasi konten yang sesuai dengan minat dan level Anda.'
    },
    {
      number: '2',
      icon: '📝',
      title: 'Ikuti Tes Penempatan',
      description: 'Ikuti tes singkat untuk menilai level literasi Anda dan mendapatkan kurikulum yang paling sesuai.'
    },
    {
      number: '3',
      icon: '🔍',
      title: 'Jelajahi & Belajar',
      description: 'Akses ribuan konten berkualitas, ikuti tantangan, dan bergabung dengan diskusi komunitas.'
    },
    {
      number: '4',
      icon: '🏆',
      title: 'Ukur Progress & Raih Sertifikat',
      description: 'Pantau perkembangan Anda dan dapatkan sertifikat setelah menyelesaikan setiap level.'
    }
  ];

  return (
    <section className="journey bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.03) 0%, transparent 50%)'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="section-header">
          <p className="section-subtitle">Perjalanan Literasi</p>
          <h2 className="section-title">Mulai Perjalanan Anda dalam 4 Langkah</h2>
          <p className="section-desc">
            Ikuti langkah-langkah sederhana ini untuk memulai transformasi literasi Anda
          </p>
        </div>
        
        <div className="journey-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="journey-step group">
              <div className="step-number w-18 h-18 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-5 group-hover:shadow-xl group-hover:shadow-primary-500/40">
                {step.number}
              </div>
              
              <div className="step-icon text-3xl mb-4">
                {step.icon}
              </div>
              
              <div className="step-content">
                <h3 className="font-semibold text-xl mb-4 text-dark">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;