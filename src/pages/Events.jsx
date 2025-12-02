// src/pages/Events.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const eventCategories = [
    { id: 'all', name: 'Semua Event', count: 8 },
    { id: 'webinar', name: 'Webinar', count: 3 },
    { id: 'workshop', name: 'Workshop', count: 2 },
    { id: 'seminar', name: 'Seminar', count: 1 },
    { id: 'komunitas', name: 'Komunitas', count: 2 }
  ];

  const events = [
    {
      id: 1,
      title: 'Webinar: Teknik Membaca Kritis di Era Digital',
      description: 'Pelajari cara menganalisis informasi dengan kritis dan menghindari misinformasi dalam membaca konten digital.',
      date: '15 Desember 2023',
      time: '19:00 - 21:00 WIB',
      type: 'webinar',
      category: 'Literasi Digital',
      speaker: 'Dr. Sarah Wijaya',
      speakerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      price: 'Gratis',
      participants: '250+',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Pemula',
      tags: ['Membaca Kritis', 'Digital Literacy', 'Fact-Checking']
    },
    {
      id: 2,
      title: 'Workshop: Speed Reading untuk Profesional',
      description: 'Tingkatkan kecepatan membaca Anda 2x lipat dengan teknik yang terbukti efektif untuk profesional.',
      date: '20 Desember 2023',
      time: '09:00 - 16:00 WIB',
      type: 'workshop',
      category: 'Teknik Membaca',
      speaker: 'Ahmad Fauzi, M.Pd.',
      speakerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      price: 'Rp 250.000',
      participants: '30',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Menengah',
      tags: ['Speed Reading', 'Produktivitas', 'Belajar Efektif']
    },
    {
      id: 3,
      title: 'Seminar Nasional: Literasi di Era AI',
      description: 'Diskusi panel tentang tantangan dan peluang literasi di era kecerdasan buatan dengan pakar terkemuka.',
      date: '5 Januari 2024',
      time: '13:00 - 17:00 WIB',
      type: 'seminar',
      category: 'Teknologi & Literasi',
      speaker: 'Prof. Maria Santoso & Tim',
      speakerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      price: 'Rp 100.000',
      participants: '500+',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Lanjutan',
      tags: ['AI', 'Teknologi', 'Masa Depan Literasi']
    },
    {
      id: 4,
      title: 'Study Group: Critical Thinking Challenge',
      description: 'Bergabung dengan komunitas pembaca untuk diskusi dan latihan berpikir kritis melalui studi kasus.',
      date: '12 Desember 2023',
      time: '18:30 - 20:30 WIB',
      type: 'komunitas',
      category: 'Berpikir Kritis',
      speaker: 'Komunitas MindLoop',
      speakerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80',
      price: 'Gratis',
      participants: '50',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Semua Level',
      tags: ['Critical Thinking', 'Diskusi', 'Komunitas']
    },
    {
      id: 5,
      title: 'Webinar: Menulis Efektif untuk Media Digital',
      description: 'Pelajari teknik menulis yang menarik dan efektif khusus untuk platform digital dan media sosial.',
      date: '8 Desember 2023',
      time: '14:00 - 16:00 WIB',
      type: 'webinar',
      category: 'Menulis Digital',
      speaker: 'Rina Hartati, Content Creator',
      speakerImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=150&q=80',
      price: 'Gratis',
      participants: '180+',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Pemula',
      tags: ['Menulis', 'Content Creation', 'Media Digital']
    },
    {
      id: 6,
      title: 'Workshop: Research Skills untuk Akademisi',
      description: 'Tingkatkan kemampuan research dan penelusuran sumber terpercaya untuk keperluan akademis.',
      date: '18 Desember 2023',
      time: '09:00 - 15:00 WIB',
      type: 'workshop',
      category: 'Research Skills',
      speaker: 'Dr. Budi Setiawan',
      speakerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      price: 'Rp 300.000',
      participants: '25',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
      difficulty: 'Lanjutan',
      tags: ['Research', 'Akademik', 'Sumber Terpercaya']
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter);

  const searchedEvents = searchQuery 
    ? filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredEvents;

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'webinar': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'komunitas': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula': return 'bg-green-100 text-green-800';
      case 'Menengah': return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-optimized">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Event & Kegiatan
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tingkatkan <span className="gradient-text">Literasi</span> dengan Event Interaktif
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Ikuti webinar, workshop, dan seminar yang dirancang khusus untuk mengasah 
              kemampuan membaca kritis, menulis efektif, dan berpikir analitis.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{events.length} Event Tersedia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>4 Tipe Kegiatan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Expert Facilitators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-optimized">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-2 py-1 flex-nowrap whitespace-nowrap max-w-full">
              {eventCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    activeFilter === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container-optimized">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeFilter === 'all' ? 'Semua Event' : eventCategories.find(cat => cat.id === activeFilter)?.name}
              </h2>
              <p className="text-gray-600">
                {searchedEvents.length} event tersedia
                {searchQuery && ` untuk "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Upcoming
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Berlangsung
              </span>
            </div>
          </div>

          {searchedEvents.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada event ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="btn btn-primary"
              >
                Tampilkan Semua Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {searchedEvents.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all duration-300 group">
                  {/* Event Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                        {event.status === 'upcoming' ? 'Segera' : event.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(event.difficulty)}`}>
                        {event.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    
                    {/* Event Meta */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{event.participants} peserta</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Speaker Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img 
                        src={event.speakerImage} 
                        alt={event.speaker}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{event.speaker}</div>
                        <div className="text-xs text-gray-500">Pembicara</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          event.price === 'Gratis' ? 'text-green-600' : 'text-indigo-600'
                        }`}>
                          {event.price}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className="w-full mt-4 btn btn-primary justify-center">
                      Daftar Sekarang
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Tidak Ingin Ketinggalan Event?</h3>
            <p className="opacity-90 mb-6 max-w-2xl mx-auto">
              Dapatkan notifikasi event terbaru langsung ke email Anda. Bergabung dengan 10,000+ anggota komunitas literasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
//penanda