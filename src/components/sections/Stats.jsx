// src/components/sections/Stats.jsx
const Stats = () => {
  const stats = [
    {
      number: '50K+',
      label: 'Pengguna Aktif',
      description: 'Bergabung dalam platform'
    },
    {
      number: '95%',
      label: 'Kepuasan Pengguna',
      description: 'Rating positif dari users'
    },
    {
      number: '1.2K+',
      label: 'Konten Premium',
      description: 'Artikel dan materi belajar'
    },
    {
      number: '42',
      label: 'Ahli Literasi',
      description: 'Bergabung sebagai mentor'
    }
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <h2 className="section-title">
            Dalam Angka: <span className="gradient-text">Dampak Nyata</span>
          </h2>
          <p className="section-subtitle">
            Bukti nyata dari komitmen kami dalam meningkatkan literasi Indonesia
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🎯 Target Kami: 1 Juta Pembaca Cerdas
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-4 rounded-full transition-all duration-1000" 
                style={{ width: '15%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>15% Tercapai</span>
              <span>1,000,000 Pembaca</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
