const CTA = () => {
  return (
    <section className="section-optimized gradient-bg-primary text-white">
      <div className="container-optimized">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Siap Mengubah Cara Anda Belajar Literasi?
          </h2>
          
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Bergabunglah dengan <strong>50,000+ pembaca cerdas</strong> yang sudah merasakan manfaat MindLoop. 
            Mulai perjalanan literasi Anda menuju pemikiran yang lebih kritis dan analitis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
            <button className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto justify-center">
              <span>Daftar Gratis Sekarang</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 w-full sm:w-auto justify-center">
              Jadwalkan Demo
            </button>
          </div>
          
          <div className="text-sm sm:text-base opacity-80 flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center items-center">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tidak perlu kartu kredit
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Bebas batalkan kapan saja
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Akses penuh 14 hari
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
