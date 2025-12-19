// src/components/sections/DemoSection.jsx
import React from 'react';

const DemoSection = () => {
  const youtubeLink = "https://youtu.be/OtiFFeA6RmU?si=t5zR7RqJ0BIUy5ku";

  return (
    <section id="demo" className="section-optimized bg-gray-50">
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
              Jelajahi fitur-fitur utama MindLoop melalui demo video kami di YouTube. 
              Lihat bagaimana platform kami dapat membantu meningkatkan kemampuan literasi 
              Anda dengan cara yang menyenangkan dan efektif.
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
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group justify-center hover:bg-red-600 hover:border-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Tonton di YouTube
              </a>
              
              <a
                href="/features"
                className="btn btn-secondary justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Coba Fitur
              </a>
            </div>
          </div>

          {/* YouTube Link Card */}
          <div className="relative">
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-strong overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative group">
                {/* Thumbnail with YouTube overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all"></div>
                
                {/* YouTube play button */}
                <div className="relative z-10 text-center group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-red-700 transition-colors">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">Tonton Demo di YouTube</p>
                  <p className="text-gray-300 text-sm mt-2">Klik untuk membuka video</p>
                </div>

                {/* YouTube logo in corner */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  YouTube
                </div>
              </div>
            </a>
            
            {/* Video Info */}
            <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-xl p-3 shadow-strong border border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">Demo</div>
                <div className="text-xs text-gray-500">YouTube</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
