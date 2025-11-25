const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50 pt-32 pb-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-custom mb-6 text-sm font-semibold text-indigo-600">
              <span>✨</span> Platform Literasi No. 1 di Indonesia
            </div>
            
            <h1 className="font-extrabold text-5xl lg:text-6xl mb-6 text-gray-900 leading-tight">
              Tingkatkan <span className="gradient-text">Literasi</span> Anda Bersama Kami
            </h1>
            
            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              LiterasiKu membantu Anda mengembangkan kemampuan membaca, menulis, dan berpikir kritis melalui konten berkualitas dan komunitas yang mendukung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary">
                <span>Mulai Sekarang</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-secondary">
                <span>Pelajari Lebih Lanjut</span>
              </button>
            </div>
            
            <div className="flex gap-8">
              {[
                { number: '50K+', label: 'Pengguna Terdaftar' },
                { number: '1K+', label: 'Artikel Berkualitas' },
                { number: '95%', label: 'Kepuasan Pengguna' }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-3xl font-bold text-indigo-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative">
            {/* Floating Cards */}
            <div className="absolute top-10 -left-10 bg-white rounded-lg p-6 shadow-custom-lg flex items-center gap-4 animate-float z-20">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                📖
              </div>
              <div>
                <h4 className="font-semibold">Baca Setiap Hari</h4>
                <p className="text-sm text-gray-600">15 menit untuk perubahan</p>
              </div>
            </div>
            
            <div className="absolute top-60 -right-5 bg-white rounded-lg p-6 shadow-custom-lg flex items-center gap-4 animate-float z-20" style={{ animationDelay: '2s' }}>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                🧠
              </div>
              <div>
                <h4 className="font-semibold">Asah Pemikiran Kritis</h4>
                <p className="text-sm text-gray-600">Analisis informasi dengan bijak</p>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-20 bg-white rounded-lg p-6 shadow-custom-lg flex items-center gap-4 animate-float z-20" style={{ animationDelay: '4s' }}>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                👥
              </div>
              <div>
                <h4 className="font-semibold">Komunitas Aktif</h4>
                <p className="text-sm text-gray-600">Diskusi dengan sesama pembaca</p>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="rounded-lg shadow-custom-lg overflow-hidden z-10 relative">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" 
                alt="Orang membaca buku dengan senang"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;