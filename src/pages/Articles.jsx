const Articles = () => {
  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=800&q=80',
      category: 'Literasi Digital',
      title: '5 Cara Meningkatkan Literasi Digital di Era Informasi',
      excerpt: 'Pelajari strategi praktis untuk menjadi konsumen informasi yang lebih cerdas dan kritis di dunia digital yang penuh dengan konten.',
      readTime: '5 min read',
      views: '2.5k views'
    },
    {
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      category: 'Teknik Membaca',
      title: 'Teknik Membaca Cepat untuk Pemula',
      excerpt: 'Tingkatkan kecepatan membaca Anda tanpa mengorbankan pemahaman dengan teknik-teknik yang terbukti efektif.',
      readTime: '7 min read',
      views: '3.1k views'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      category: 'Berpikir Kritis',
      title: 'Mengasah Kemampuan Berpikir Kritis Melalui Membaca',
      excerpt: 'Temukan bagaimana kebiasaan membaca dapat mengembangkan kemampuan analisis dan evaluasi informasi secara kritis.',
      readTime: '6 min read',
      views: '1.8k views'
    }
  ];

  return (
    <section className="articles bg-white py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="articles-header flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
          <div>
            <p className="section-subtitle">Eksplorasi Pengetahuan</p>
            <h2 className="section-title">Koleksi Artikel Pilihan</h2>
          </div>
          <a href="#" className="btn-view-all mt-4 lg:mt-0 flex items-center gap-2 text-primary-500 font-semibold transition-all duration-300 hover:gap-3 px-6 py-3 rounded-full bg-primary-50 hover:bg-primary-100">
            Jelajahi Semua Artikel
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        
        <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="article-card group">
              <div className="article-image h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              <div className="article-content p-6 relative z-10">
                <span className="article-category text-xs font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {article.category}
                </span>
                
                <h3 className="article-title font-semibold text-xl mb-3 text-dark leading-tight">
                  {article.title}
                </h3>
                
                <p className="article-excerpt text-gray-500 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="article-meta flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <span className="flex items-center gap-1">
                    📖 {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ {article.views}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;