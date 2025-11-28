// src/components/sections/CTA.jsx
const CTA = () => {
  return (
    <section className="section gradient-bg text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Mengubah Cara Anda Belajar Literasi?
          </h2>
          
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Bergabunglah dengan <strong>50,000+ pembaca cerdas</strong> yang sudah merasakan manfaat MindLoop. 
            Mulai perjalanan literasi Anda menuju pemikiran yang lebih kritis dan analitis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-lg">
              <span>Daftar Gratis Sekarang</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Jadwalkan Demo
            </button>
          </div>
          
          <div className="text-sm opacity-80 flex flex-col sm:flex-row gap-2 justify-center items-center">
            <span>✅ Tidak perlu kartu kredit</span>
            <span className="hidden sm:block">•</span>
            <span>✅ Bebas batalkan kapan saja</span>
            <span className="hidden sm:block">•</span>
            <span>✅ Akses penuh 14 hari</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
