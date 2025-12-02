import React from 'react';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Background Elements - Dioptimalkan untuk mobile */}
      <div className="absolute top-4 left-4 w-48 h-48 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob sm:left-8 sm:w-64 sm:h-64 md:left-10 md:w-80 md:h-80"></div>
      <div className="absolute top-8 right-4 w-48 h-48 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 sm:right-8 sm:w-64 sm:h-64 md:right-10 md:w-80 md:h-80"></div>
      <div className="absolute bottom-8 left-1/4 w-48 h-48 bg-amber-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 sm:w-64 sm:h-64 md:w-80 md:h-80"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.02]"></div>
      
      <div className="container-optimized relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Hero Content - Layout lebih optimal */}
          <div className="text-center lg:text-left animate-fade-in-up max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass border border-indigo-200 text-indigo-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 lg:mb-8 shadow-soft">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Platform Literasi Modern Terdepan
            </div>
            
            {/* Heading dengan spacing optimal */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              Tingkatkan <span className="gradient-text bg-gradient-to-r from-indigo-600 to-emerald-600">Kemampuan Literasi</span> dengan Metode Interaktif
            </h1>
            
            {/* Description dengan width optimal */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
              MindLoop menghadirkan pengalaman belajar literasi yang revolusioner - gabungan teknologi AI, kurikulum terstruktur, dan komunitas pembaca aktif.
            </p>
            
            {/* CTA Buttons dengan layout responsive */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 justify-center lg:justify-start">
              <button className="btn btn-primary btn-lg group w-full xs:w-auto justify-center text-sm md:text-base">
                Mulai Sekarang
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn btn-secondary btn-lg group w-full xs:w-auto justify-center text-sm md:text-base">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Lihat Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">10K+ Pengguna</div>
                  <div className="text-gray-500 text-xs">Aktif bulan ini</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 glass px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-gray-200">
                <div className="flex text-amber-400">
                  {/* Star icons */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">4.9/5</div>
                  <div className="text-gray-500 text-xs">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual - Dioptimalkan untuk mobile */}
          <div className="relative animate-fade-in-up animation-delay-300 mt-6 sm:mt-8 lg:mt-0">
            <div className="relative z-10 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-strong overflow-hidden border-2 sm:border-4 md:border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration and learning"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Elements - Dioptimalkan untuk mobile */}
            <div className="absolute -top-1 -left-1 xs:-top-2 xs:-left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-strong floating border border-gray-100 z-10">
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md">
                  <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xs xs:text-sm">Progress Cepat</div>
                  <div className="text-gray-500 text-xs">2x lebih efektif</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-1 -right-1 xs:-bottom-2 xs:-right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-strong floating floating-delay-1 border border-gray-100 z-10">
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md">
                  <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xs xs:text-sm">Komunitas</div>
                  <div className="text-gray-500 text-xs">50K+ anggota</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section - Layout lebih compact */}
        <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            {[
              { number: '50K+', label: 'Pengguna Aktif' },
              { number: '95%', label: 'Kepuasan' },
              { number: '1.2K+', label: 'Konten' },
              { number: '42', label: 'Ahli' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
//penanda