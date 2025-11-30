import React from 'react';

const ProblemAwareness = () => {
  const problems = [
    {
      stat: "65%",
      description: "orang Indonesia kesulitan membedakan berita hoaks dan fakta",
      source: "Kominfo 2023",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      stat: "3x",
      description: "lebih mungkin percaya informasi yang sesuai dengan keyakinan",
      source: "Journal of Media Literacy",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      stat: "2.5 jam",
      description: "rata-rata waktu terbuang untuk informasi tidak penting sehari",
      source: "Digital Wellbeing Report",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-optimized">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Masalah Literasi
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fakta yang <span className="text-red-500">Perlu Diperhatikan</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Data menunjukkan betapa pentingnya kemampuan literasi di era informasi saat ini
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              
              <div className="text-4xl font-bold text-red-500 mb-3">{problem.stat}</div>
              <p className="text-gray-700 mb-3 text-lg font-medium leading-relaxed">{problem.description}</p>
              <p className="text-gray-500 text-sm">{problem.source}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Solusi: Literasi yang Lebih Cerdas
            </h3>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
              Bukan sekadar "baca lebih banyak", tapi <strong>membaca dengan cara yang lebih cerdas</strong> - 
              mampu menganalisis, memverifikasi, dan mengambil keputusan berdasarkan informasi yang terpercaya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAwareness;
//penanda