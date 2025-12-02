import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ArticleDetail = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Data artikel lengkap
  const articlesData = {
    1: {
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=1200&q=80',
      category: 'Literasi Digital',
      title: '5 Cara Meningkatkan Literasi Digital di Era Informasi',
      author: 'Sarah Wijaya',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      date: '15 November 2023',
      readTime: '5 min read',
      views: '2.5k',
      likes: '1.2k',
      content: `
        <p class="lead">Di era digital yang penuh dengan informasi, literasi digital menjadi keterampilan penting yang harus dimiliki setiap individu. Kemampuan untuk menemukan, mengevaluasi, dan menggunakan informasi secara efektif adalah kunci kesuksesan di abad ke-21.</p>
        
        <h2>1. Kenali Sumber Informasi yang Terpercaya</h2>
        <p>Belajar untuk mengidentifikasi sumber informasi yang kredibel adalah langkah pertama dalam literasi digital. Periksa reputasi website, kredensial penulis, dan institusi di balik informasi tersebut.</p>
        
        <blockquote>
          "Informasi yang baik datang dari sumber yang terpercaya. Selalu verifikasi sebelum mempercayai."
        </blockquote>
        
        <p><strong>Tips praktis:</strong></p>
        <ul>
          <li>Periksa domain website (.gov, .edu, .org biasanya lebih terpercaya)</li>
          <li>Cari informasi tentang penulis dan latar belakangnya</li>
          <li>Periksa tanggal publikasi untuk memastikan informasi masih relevan</li>
          <li>Lihat referensi dan sumber yang dikutip</li>
        </ul>
        
        <h2>2. Kembangkan Kemampuan Verifikasi Informasi</h2>
        <p>Di era hoaks dan misinformasi, kemampuan verifikasi menjadi sangat penting. Jangan langsung percaya dengan informasi yang Anda baca, terutama di media sosial.</p>
        
        <p><strong>Langkah verifikasi:</strong></p>
        <ol>
          <li>Cari informasi yang sama dari sumber lain</li>
          <li>Gunakan tools fact-checking terpercaya</li>
          <li>Periksa foto dan video dengan tools reverse image search</li>
          <li>Analisis bahasa dan nada penulisan</li>
        </ol>
        
        <h2>3. Pahami Konsep Bias dan Perspektif</h2>
        <p>Setiap informasi memiliki sudut pandang tertentu. Belajar untuk mengenali bias dan memahami berbagai perspektif akan membuat Anda menjadi konsumen informasi yang lebih kritis.</p>
        
        <div class="bg-light-brown p-4 rounded-lg my-6">
          <h4 class="font-semibold text-dark-brown mb-2">Tanda-tanda Bias dalam Informasi:</h4>
          <ul class="list-disc list-inside space-y-1">
            <li>Bahasa yang emosional atau provokatif</li>
            <li>Hanya menampilkan satu sisi cerita</li>
            <li>Sumber yang tidak seimbang</li>
            <li>Fakta yang dipilih secara selektif</li>
          </ul>
        </div>
        
        <h2>4. Manfaatkan Teknologi dengan Bijak</h2>
        <p>Gunakan teknologi untuk memperluas wawasan, bukan hanya untuk hiburan. Eksplorasi aplikasi edukatif dan platform pembelajaran dapat meningkatkan literasi digital Anda.</p>
        
        <p><strong>Platform yang direkomendasikan:</strong></p>
        <ul>
          <li>Coursera dan edX untuk kursus online</li>
          <li>Google Scholar untuk penelitian akademis</li>
          <li>Perpustakaan digital dan e-book</li>
          <li>Tools produktivitas untuk mengorganisir informasi</li>
        </ul>
        
        <h2>5. Terus Belajar dan Beradaptasi</h2>
        <p>Teknologi terus berkembang dengan cepat. Komitmen untuk belajar sepanjang hayat adalah kunci menjaga literasi digital yang relevan dan up-to-date.</p>
        
        <p><strong>Strategi pembelajaran berkelanjutan:</strong></p>
        <ul>
          <li>Ikuti perkembangan teknologi terbaru</li>
          <li>Bergabung dengan komunitas online yang positif</li>
          <li>Ikuti webinar dan workshop digital</li>
          <li>Praktikkan langsung keterampilan baru</li>
        </ul>
        
        <h3>Kesimpulan</h3>
        <p>Literasi digital bukan hanya tentang bisa menggunakan teknologi, tetapi tentang bagaimana kita berpikir kritis, berkomunikasi efektif, dan membuat keputusan yang bijak di dunia digital. Dengan menguasai kelima cara di atas, Anda akan menjadi konsumen informasi yang lebih cerdas dan bertanggung jawab.</p>
        
        <p>Mulailah perjalanan literasi digital Anda hari ini, karena di era informasi, pengetahuan adalah kekuatan yang sesungguhnya.</p>
      `
    },
    2: {
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      category: 'Teknik Membaca',
      title: 'Teknik Membaca Cepat untuk Pemula: Tingkatkan Efisiensi Membaca Anda',
      author: 'Ahmad Fauzi',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      date: '12 November 2023',
      readTime: '7 min read',
      views: '3.1k',
      likes: '1.8k',
      content: `
        <p>Membaca cepat adalah keterampilan yang dapat dipelajari dan dikembangkan. Artikel ini akan membimbing Anda melalui teknik-teknik praktis untuk meningkatkan kecepatan membaca tanpa mengorbankan pemahaman.</p>
        
        <h2>Teknik Dasar Membaca Cepat</h2>
        <p>Pelajari fondasi membaca cepat yang dapat langsung Anda praktikkan.</p>
        
        <h3>1. Gerakan Mata yang Efisien</h3>
        <p>Optimalkan pergerakan mata untuk mengurangi waktu yang terbuang.</p>
        
        <h3>2. Minimasi Subvokalisasi</h3>
        <p>Kurangi kebiasaan "membaca dalam hati" untuk meningkatkan kecepatan.</p>
      `
    },
    3: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      category: 'Berpikir Kritis',
      title: 'Mengasah Kemampuan Berpikir Kritis Melalui Membaca',
      author: 'Maria Santoso',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      date: '10 November 2023',
      readTime: '6 min read',
      views: '1.8k',
      likes: '950',
      content: `
        <p>Berpikir kritis adalah keterampilan yang dapat dikembangkan melalui kebiasaan membaca yang tepat. Temukan strategi untuk menjadi pembaca yang lebih analitis.</p>
        
        <h2>Membangun Mindset Kritis</h2>
        <p>Mulailah dengan mengembangkan pola pikir yang tepat untuk membaca kritis.</p>
      `
    }
  };

  const article = articlesData[id] || {
    title: 'Artikel Tidak Ditemukan',
    content: '<p>Maaf, artikel yang Anda cari tidak tersedia. Silakan kembali ke halaman artikel untuk menjelajahi konten lainnya.</p>',
    category: 'Unknown',
    author: 'Unknown',
    date: 'Unknown',
    readTime: 'Unknown',
    views: 'Unknown',
    likes: 'Unknown'
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Di sini bisa ditambahkan logic untuk menyimpan ke database/localStorage
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Di sini bisa ditambahkan logic untuk like ke database
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin!');
    }
  };

  // Artikel terkait
  const relatedArticles = [
    {
      id: 2,
      title: 'Teknik Membaca Cepat untuk Pemula',
      category: 'Teknik Membaca',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Mengasah Kemampuan Berpikir Kritis',
      category: 'Berpikir Kritis',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="container-custom py-8 mt-6">

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-text-light mb-2 mt-6 py-2 relative z-10">
              <Link to="/" className="hover:text-dark-brown transition-colors">Beranda</Link>
              <span>›</span>
              <Link to="/articles" className="hover:text-dark-brown transition-colors">Artikel</Link>
              <span>›</span>
              <span className="text-dark-brown font-medium">{article.category}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={article.authorImage} 
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-text-dark">{article.author}</p>
                <p className="text-sm text-text-light">{article.date}</p>
              </div>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap gap-6 text-text-light border-y border-light-brown py-4">
              <span className="flex items-center gap-2">
                <span className="text-dark-brown">⏱️</span>
                {article.readTime}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-dark-brown">👁️</span>
                {article.views} dilihat
              </span>
              <span className="flex items-center gap-2">
                <span className="text-dark-brown">❤️</span>
                {article.likes} suka
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none mb-8 animate-fade-in"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <div className="flex flex-wrap gap-4 py-6 border-t border-light-brown">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-light-brown text-dark-brown hover:bg-medium-brown hover:text-white'
              }`}
            >
              {isLiked ? '❤️ Disukai' : '🤍 Suka'}
            </button>
            
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isSaved 
                  ? 'bg-dark-brown text-white hover:bg-medium-brown' 
                  : 'bg-light-brown text-dark-brown hover:bg-medium-brown hover:text-white'
              }`}
            >
              {isSaved ? '📌 Disimpan' : '📌 Simpan'}
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-light-brown text-dark-brown rounded-xl font-semibold hover:bg-medium-brown hover:text-white transition-all duration-300"
            >
              🔗 Bagikan
            </button>
          </div>
        </article>

        {/* Related Articles */}
        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-dark-brown mb-8">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link 
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.id}`}
                className="bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-light-brown group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-light-brown text-dark-brown px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {relatedArticle.category}
                  </span>
                  <h3 className="font-bold text-text-dark mb-3 leading-tight group-hover:text-dark-brown transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-light">
                    <span>⏱️ {relatedArticle.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to Articles */}
        <div className="text-center mt-12">
          <Link 
            to="/articles" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-brown text-white rounded-xl font-semibold hover:bg-medium-brown transition-all duration-300 hover:-translate-y-1"
          >
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
//penanda