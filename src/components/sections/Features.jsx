import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  const featureHighlights = [
    {
      icon: '📚',
      title: 'Konten Ahli Terkurasi',
      description: '2,500+ materi premium yang diverifikasi pakar literasi'
    },
    {
      icon: '🎯',
      title: 'Pembelajaran Personal',
      description: 'AI-powered recommendations sesuai level dan minat Anda'
    },
    {
      icon: '📊',
      title: 'Analisis Progress Detail',
      description: 'Track perkembangan dengan dashboard dan metrik terukur'
    }
  ];

  return (
    <section id="features" className="section-optimized bg-white">
      <div className="container-optimized">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Fitur Unggulan
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa <span className="gradient-text">MindLoop</span> Berbeda?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Platform literasi modern dengan pendekatan holistik untuk meningkatkan 
            kemampuan membaca kritis, analisis informasi, dan berpikir logis.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featureHighlights.map((feature, index) => (
            <div key={index} className="text-center p-6 group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '94%', label: 'Kepuasan Pengguna' },
              { number: '2.8x', label: 'Rata-rata Peningkatan' },
              { number: '50K+', label: 'Pembaca Bergabung' },
              { number: '1.2K+', label: 'Konten Premium' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Full Features */}
        <div className="text-center">
          <Link 
            to="/features" 
            className="btn btn-primary btn-lg group inline-flex items-center gap-2"
          >
            Jelajahi Semua Fitur Lengkap
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            Temukan bagaimana MindLoop dapat membantu transformasi kemampuan literasi Anda
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
//penanda