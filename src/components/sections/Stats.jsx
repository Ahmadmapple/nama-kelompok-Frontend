import React from 'react';

const Stats = () => {
  const stats = [
    {
      number: '50K+',
      label: 'Pengguna Aktif',
      description: 'Telah bergabung dalam platform',
      trend: '+25%',
      trendUp: true
    },
    {
      number: '95%',
      label: 'Kepuasan Pengguna',
      description: 'Rating positif dari users',
      trend: '+5%',
      trendUp: true
    },
    {
      number: '1.2K+',
      label: 'Konten Premium',
      description: 'Artikel dan materi belajar',
      trend: '+150',
      trendUp: true
    },
    {
      number: '42',
      label: 'Ahli Literasi',
      description: 'Bergabung sebagai mentor',
      trend: '+8',
      trendUp: true
    }
  ];

  const milestones = [
    { target: "10K", achieved: "15K", label: "Pembaca Bulan Ini", percentage: 150 },
    { target: "50K", achieved: "50K", label: "Total Pengguna", percentage: 100 },
    { target: "1K", achieved: "1.2K", label: "Konten Terbit", percentage: 120 }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-optimized">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Dampak Nyata
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dalam <span className="gradient-text">Angka & Pencapaian</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Bukti nyata dari komitmen kami dalam meningkatkan literasi Indonesia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-indigo-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-lg font-semibold text-gray-900">{stat.label}</div>
                <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                  stat.trendUp 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <svg className={`w-3 h-3 ${stat.trendUp ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.trend}
                </div>
              </div>
              
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Progress Milestones */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🎯 Pencapaian & Target Kami
            </h3>
            <p className="text-gray-600">
              Melampaui ekspektasi dalam setiap target yang kami tetapkan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-4">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="3"
                      strokeDasharray={`${milestone.percentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{milestone.percentage}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {milestone.achieved}
                </div>
                <div className="text-gray-600 text-sm mb-2">{milestone.label}</div>
                <div className="text-xs text-gray-500">
                  Target: {milestone.target}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Progress Menuju 1 Juta Pembaca Cerdas</span>
              <span className="text-sm font-medium text-indigo-600">15% Tercapai</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: '15%' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>150,000 Pembaca</span>
              <span>1,000,000 Target</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
//penanda