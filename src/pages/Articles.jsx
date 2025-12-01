import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'Semua Kategori', count: 24 },
    { id: 'digital-literacy', name: 'Literasi Digital', count: 8 },
    { id: 'critical-thinking', name: 'Berpikir Kritis', count: 6 },
    { id: 'reading-techniques', name: 'Teknik Membaca', count: 5 },
    { id: 'research-skills', name: 'Skill Research', count: 3 },
    { id: 'fact-checking', name: 'Fact-Checking', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=800&q=80',
      category: 'digital-literacy',
      title: '5 Cara Meningkatkan Literasi Digital di Era Informasi',
      excerpt: 'Pelajari strategi praktis untuk menjadi konsumen informasi yang lebih cerdas dan kritis di dunia digital yang penuh dengan konten. Temukan tools dan teknik untuk verifikasi informasi.',
      readTime: '5 min read',
      views: '2.5k',
      likes: '1.2k',
      author: 'Sarah Wijaya',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      date: '15 Nov 2023',
      difficulty: 'Pemula',
      tags: ['Literasi Digital', 'Hoaks', 'Verifikasi']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      category: 'reading-techniques',
      title: 'Teknik Membaca Cepat untuk Pemula: Tingkatkan Efisiensi Membaca Anda',
      excerpt: 'Tingkatkan kecepatan membaca Anda tanpa mengorbankan pemahaman dengan teknik-teknik yang terbukti efektif. Mulai dari basic sampai advanced techniques.',
      readTime: '7 min read',
      views: '3.1k',
      likes: '1.8k',
      author: 'Ahmad Fauzi',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      date: '12 Nov 2023',
      difficulty: 'Menengah',
      tags: ['Speed Reading', 'Pemahaman', 'Teknik']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      category: 'critical-thinking',
      title: 'Mengasah Kemampuan Berpikir Kritis Melalui Membaca',
      excerpt: 'Temukan bagaimana kebiasaan membaca dapat mengembangkan kemampuan analisis dan evaluasi informasi secara kritis. Practical guide untuk daily practice.',
      readTime: '6 min read',
      views: '1.8k',
      likes: '950',
      author: 'Maria Santoso',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      date: '10 Nov 2023',
      difficulty: 'Lanjutan',
      tags: ['Critical Thinking', 'Analisis', 'Logika']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      category: 'fact-checking',
      title: 'Panduan Lengkap Fact-Checking: Cara Verifikasi Informasi dengan Benar',
      excerpt: 'Step-by-step guide untuk memverifikasi informasi dan menghindari hoaks di era digital. Dilengkapi dengan tools dan resources terbaru.',
      readTime: '8 min read',
      views: '4.2k',
      likes: '2.1k',
      author: 'Dr. Budi Setiawan',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
      date: '8 Nov 2023',
      difficulty: 'Menengah',
      tags: ['Fact-Checking', 'Hoaks', 'Verifikasi']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      category: 'research-skills',
      title: 'Cara Menelusuri Sumber Terpercaya untuk Penelitian Akademis',
      excerpt: 'Teknik efektif untuk menemukan dan mengevaluasi sumber informasi yang kredibel untuk penelitian. Tips dari researcher profesional.',
      readTime: '10 min read',
      views: '2.1k',
      likes: '1.1k',
      author: 'Prof. Sari Dewi',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      date: '5 Nov 2023',
      difficulty: 'Lanjutan',
      tags: ['Research', 'Sumber', 'Akademik']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      category: 'digital-literacy',
      title: 'Memahami Bias Media: Cara Membaca Berita dengan Kritis',
      excerpt: 'Pelajari cara mengidentifikasi bias dalam pemberitaan dan menjadi konsumen media yang lebih cerdas. Case studies dan practical examples.',
      readTime: '6 min read',
      views: '3.5k',
      likes: '1.7k',
      author: 'Rina Hartati',
      authorImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=100&q=80',
      date: '3 Nov 2023',
      difficulty: 'Menengah',
      tags: ['Media Literacy', 'Bias', 'Berita']
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const searchedArticles = searchQuery 
    ? filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Perpustakaan <span className="gradient-text">Artikel Literasi</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Jelajahi koleksi artikel premium kami yang dirancang untuk meningkatkan 
              kemampuan membaca kritis, analisis informasi, dan berpikir logis.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel, topik, atau penulis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-optimized">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container-optimized">
          {searchedArticles.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada artikel ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba gunakan kata kunci lain atau jelajahi kategori yang berbeda</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn btn-primary"
              >
                Tampilkan Semua Artikel
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeCategory === 'all' ? 'Semua Artikel' : categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    Menampilkan {searchedArticles.length} artikel
                    {searchQuery && ` untuk "${searchQuery}"`}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Diurutkan berdasarkan: <span className="font-medium text-gray-900">Terbaru</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchedArticles.map(article => (
                  <Link 
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all duration-300 group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                          {categories.find(cat => cat.id === article.category)?.name}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          article.difficulty === 'Pemula' ? 'bg-green-100 text-green-800' :
                          article.difficulty === 'Menengah' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {article.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {article.likes}
                          </span>
                        </div>
                        <span>{article.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                        <img 
                          src={article.authorImage} 
                          alt={article.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{article.author}</div>
                          <div className="text-xs text-gray-500">Penulis</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Articles;
//penanda