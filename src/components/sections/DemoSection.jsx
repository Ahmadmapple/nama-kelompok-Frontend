import React, { useState } from 'react';

const DemoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="section-optimized bg-gray-50">
      <div className="container-optimized">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
              Demo Interaktif
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lihat <span className="gradient-text">MindLoop</span> dalam Aksi
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
              Jelajahi fitur-fitur utama MindLoop melalui demo interaktif kami. Lihat bagaimana platform kami 
              dapat membantu meningkatkan kemampuan literasi Anda dengan cara yang menyenangkan dan efektif.
            </p>

            <div className="space-y-3 text-left">
              {[
                "Dashboard analisis progress real-time",
                "Sistem rekomendasi konten personal",
                "Tools fact-checking terintegrasi",
                "Komunitas diskusi interaktif",
                "Sistem gamifikasi pembelajaran"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="btn btn-primary group justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Tonton Demo Video
              </button>
              <button className="btn btn-secondary justify-center">
                Coba Demo Interaktif
              </button>
            </div>
          </div>

          {/* Video Demo */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-strong overflow-hidden border border-gray-200">
              {!isVideoPlaying ? (
                <div 
                  className="aspect-video bg-gray-900 flex items-center justify-center cursor-pointer relative"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-lg">Putar Demo</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="MindLoop Demo"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-strong border border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-600">5:24</div>
                <div className="text-xs text-gray-500">Durasi Demo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;