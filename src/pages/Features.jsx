// src/pages/Features.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Features = () => {
  const features = [
    {
      icon: '📚',
      title: 'Konten Edukatif',
      description: 'Akses berbagai artikel, kuis, dan materi literasi yang dirancang untuk membantu meningkatkan kemampuan membaca dan berpikir kritis Anda.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🧠',
      title: 'Kuis Interaktif',
      description: 'Uji pemahaman Anda dengan kuis yang menarik dan memberikan feedback instan untuk membantu proses belajar.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎪',
      title: 'Event & Webinar',
      description: 'Ikuti webinar, workshop, dan event literasi untuk belajar dari para ahli dan bertemu komunitas pembaca.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Pantau perkembangan literasi Anda dengan dashboard yang menampilkan statistik membaca, skor kuis, dan pencapaian.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎯',
      title: 'Target & Goals',
      description: 'Tetapkan target membaca harian/mingguan dan dapatkan reminder untuk menjaga konsistensi belajar.',
      color: 'from-red-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container-optimized">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fitur Unggulan <span className="text-indigo-600">MindLoop</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Temukan semua alat dan konten yang Anda butuhkan untuk meningkatkan literasi dalam satu platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary px-8 py-3">
                Mulai Gratis
              </Link>
              <Link to="/" className="btn btn-secondary px-8 py-3">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <div className="container-optimized">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mb-6 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="container-optimized">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Siap Tingkatkan Literasi Anda?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Bergabung dengan ribuan pengguna yang sudah merasakan manfaat MindLoop
            </p>
            <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
              Daftar Sekarang - Gratis!
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features;
