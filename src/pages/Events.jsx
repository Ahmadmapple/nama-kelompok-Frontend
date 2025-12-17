import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import axios from 'axios'; // Import axios

// Base URL API
const API_URL = 'http://localhost:3000/api/event/'; 

const Events = () => {
    const [events, setEvents] = useState([]); // Data events dari DB
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // --- 1. Fetch Data dari API ---
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(API_URL);
                setEvents(response.data.events);
                setLoading(false);
            } catch (err) {
                setError('Gagal memuat data event. Pastikan server berjalan dan API terhubung.');
                setLoading(false);
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, []);

    // --- 2. Hitung Kategori Secara Dinamis ---
    // Logika ini menggantikan array eventCategories yang hardcode
    const allEventTypes = ['webinar', 'workshop', 'seminar', 'komunitas'];
    
    // Hitung jumlah event untuk setiap tipe
    const categoryCounts = events.reduce((acc, event) => {
        // Menggunakan event.type dari data DB
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
    }, {});

    // Buat struktur data eventCategories yang dinamis
    const eventCategories = [
        { id: 'all', name: 'Semua Event', count: events.length },
        ...allEventTypes.map(id => {
            const name = id.charAt(0).toUpperCase() + id.slice(1);
            return { id, name, count: categoryCounts[id] || 0 };
        })
    ];

    // --- 3. Filtering dan Searching (Menggunakan data dinamis) ---
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

    // --- 4. Fungsi-fungsi utilitas untuk styling (tidak berubah) ---
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

    // --- 5. Conditional Rendering untuk Loading/Error ---
    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-24">
                    <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600">Memuat data event...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-24 bg-red-50 border border-red-200 rounded-xl m-4">
                    <h3 className="text-xl font-bold text-red-700 mb-2">Error!</h3>
                    <p className="text-red-600 mb-6">{error}</p>
                    <p className='text-sm text-red-500'>Cek konsol browser untuk detail error.</p>
                </div>
            );
        }

        if (searchedEvents.length === 0) {
            return (
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
                        className="btn btn-primary inline-block" // <-- FIX: Tambahkan inline-block di sini
                    >
                        Tampilkan Semua Event
                    </button>
                </div>
            );
        }

        // Tampilan Grid Event
        return (
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
                            
                            <div className='flex flex-col justify-items-end'>
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
                    </div>
                ))}
            </div>
        );
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
                                <span>{allEventTypes.length} Tipe Kegiatan</span>
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
            <section className="py-8 bg-white border-b border-gray-200 top-0 z-40">
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
                    </div>

                    {renderContent()}

                    {/* Newsletter CTA */}
                    <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center">
                        <h3 className=" text-white text-2xl font-bold mb-4">Tidak Ingin Ketinggalan Event?</h3>
                        <p className=" text-white opacity-90 mb-6 max-w-2xl mx-auto">
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