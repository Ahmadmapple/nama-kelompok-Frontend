import React from 'react';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Enhanced Background Elements */}
      <div className="absolute top-10 left-5% w-80 h-80 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-5% w-80 h-80 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.02]"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 glass border border-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-soft">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Platform Literasi Modern Terdepan
            </div>
            
            {/* Improved Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Tingkatkan <span className="gradient-text bg-gradient-to-r from-indigo-600 to-emerald-600">Kemampuan Literasi</span> dengan Metode Interaktif
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              LiterasiKu menghadirkan pengalaman belajar literasi yang revolusioner - gabungan teknologi AI, kurikulum terstruktur, dan komunitas pembaca aktif untuk mengasah kemampuan membaca kritis dan menulis efektif.
            </p>
            
            {/* Improved CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <button className="btn btn-primary btn-lg group">
                Mulai Perjalanan Literasi
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn btn-secondary btn-lg group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tonton Demo
              </button>
            </div>
            
            {/* Enhanced Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">10K+ Pengguna Aktif</div>
                  <div className="text-xs text-gray-500">Bergabung bulan ini</div>
                </div>
              </div>
              <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-gray-200">
                <div className="flex text-amber-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">4.9/5</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Hero Visual */}
          <div className="relative animate-fade-in-up animation-delay-300">
            {/* Main Image Container */}
            <div className="relative z-10 bg-white rounded-3xl shadow-strong overflow-hidden border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration and learning"
                className="w-full h-auto"
              />
            </div>
            
            {/* Enhanced Floating Elements */}
            <div className="absolute -top-2 -left-2 bg-white rounded-2xl p-4 shadow-strong floating border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Progress Cepat</div>
                  <div className="text-gray-500 text-xs">2x lebih efektif</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-2 -right-2 bg-white rounded-2xl p-4 shadow-strong floating floating-delay-1 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Komunitas</div>
                  <div className="text-gray-500 text-xs">50K+ anggota</div>
                </div>
              </div>
            </div>

            {/* Additional Floating Element */}
            <div className="absolute top-1/2 -left-4 bg-white rounded-2xl p-3 shadow-strong floating floating-delay-2 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xs">Metode Baru</div>
                  <div className="text-gray-500 text-xs">Terbukti</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600 text-sm">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">95%</div>
              <div className="text-gray-600 text-sm">Kepuasan Pengguna</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">1.2K+</div>
              <div className="text-gray-600 text-sm">Konten Premium</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">42</div>
              <div className="text-gray-600 text-sm">Ahli Literasi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
