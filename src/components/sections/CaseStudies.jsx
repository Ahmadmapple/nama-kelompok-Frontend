import React from 'react';

const CaseStudies = () => {
  const caseStudies = [
    {
      name: "Sarah Wijaya",
      role: "Guru & Content Creator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
      improvement: "78%",
      duration: "3 bulan",
      story: "Sebagai guru, Sarah menggunakan MindLoop untuk meningkatkan kemampuan literasi digital siswa-siswanya. Hasilnya, 85% siswa menunjukkan peningkatan signifikan dalam kemampuan analisis informasi.",
      metrics: [
        { label: "Peningkatan Pemahaman", value: "78%" },
        { label: "Waktu Belajar", value: "2.5x lebih efisien" },
        { label: "Kepuasan Siswa", value: "94%" }
      ]
    },
    {
      name: "Ahmad Fauzi",
      role: "Mahasiswa S2",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      improvement: "65%",
      duration: "2 bulan",
      story: "Ahmad menggunakan MindLoop untuk penelitian akademisnya. Tools fact-checking membantu mengurangi waktu penelitian dari 3 jam menjadi 45 menit per artikel.",
      metrics: [
        { label: "Akurasi Research", value: "65%" },
        { label: "Penghematan Waktu", value: "75%" },
        { label: "Kualitas Paper", value: "A-" }
      ]
    },
    {
      name: "Maria Santoso",
      role: "Professional Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      improvement: "82%",
      duration: "4 bulan",
      story: "Maria meningkatkan kemampuan analisis bisnisnya melalui MindLoop. Sekarang ia dapat membuat keputusan berbasis data dengan lebih percaya diri dan akurat.",
      metrics: [
        { label: "Analisis Data", value: "82%" },
        { label: "Kecepatan Baca", value: "3.2x" },
        { label: "Keputusan Tepat", value: "91%" }
      ]
    }
  ];

  return (
    <section className="section-optimized bg-white">
      <div className="container-optimized">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Cerita Sukses
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hasil Nyata dari <span className="gradient-text">Pengguna MindLoop</span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Lihat bagaimana MindLoop membantu ribuan pengguna mencapai tujuan literasi mereka dengan hasil yang terukur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all duration-300">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={study.image} 
                    alt={study.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{study.name}</h3>
                    <p className="text-gray-600 text-sm">{study.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{study.improvement}</div>
                    <div className="text-xs text-gray-500">Peningkatan</div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">{study.story}</p>
              </div>

              {/* Metrics */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Durasi Program</span>
                    <span className="font-semibold text-gray-900">{study.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { number: "94%", label: "Kepuasan Pengguna" },
              { number: "2.8x", label: "Rata-rata Peningkatan" },
              { number: "3.1", label: "Bulan ke Hasil" },
              { number: "10K+", label: "Cerita Sukses" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;