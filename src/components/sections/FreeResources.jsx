import React from 'react';

const FreeResources = () => {
  const resources = [
    {
      title: "E-book: Panduan Literasi Digital",
      description: "Panduan lengkap untuk melindungi diri dari misinformasi dan hoaks di era digital.",
      type: "PDF Download",
      pages: "48 Halaman",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Toolkit Fact-Checking",
      description: "Kumpulan tools dan checklist untuk memverifikasi informasi dengan cepat dan akurat.",
      type: "Toolkit",
      items: "15 Tools",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Webinar: Critical Thinking",
      description: "Rekaman webinar tentang mengembangkan pola pikir kritis dalam kehidupan sehari-hari.",
      type: "Video",
      duration: "1.5 Jam",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Template Analisis Artikel",
      description: "Template terstruktur untuk menganalisis dan mengevaluasi kualitas sebuah artikel.",
      type: "Template",
      formats: "PDF & Doc",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="section-optimized bg-gray-50">
      <div className="container-optimized">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            Resources Gratis
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Akses <span className="gradient-text">Materi Literasi Gratis</span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Tingkatkan kemampuan literasi Anda dengan koleksi resources gratis yang kami sediakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  {resource.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{resource.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {resource.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {resource.pages || resource.items || resource.duration || resource.formats}
                      </span>
                    </div>
                    
                    <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Download
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-white rounded-2xl shadow-soft border border-gray-100 p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Dapatkan Update Resources Terbaru
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Bergabung dengan newsletter kami dan dapatkan akses ke resources literasi terbaru setiap minggu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email Anda"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="btn btn-primary whitespace-nowrap">
              Berlangganan
            </button>
          </div>
          
          <p className="text-gray-500 text-xs mt-4">
            Kami menghormati privasi Anda. Tidak ada spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeResources;
//penanda