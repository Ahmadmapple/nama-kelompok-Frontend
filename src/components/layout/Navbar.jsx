// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
      if (mobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen, mobileMenuOpen]);

  const navigation = [
    { name: 'Beranda', href: '/', type: 'link' },
    { name: 'Fitur', href: '/features', type: 'link' },
    { name: 'Artikel', href: '/articles', type: 'link' },
    { name: 'Kuis', href: '/quiz', type: 'link' },
    { name: 'Event', href: '/events', type: 'link' }
  ];

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (href, type) => {
    if (type === 'link') {
      setMobileMenuOpen(false);
    }
    if (type === 'anchor') {
      setMobileMenuOpen(false);
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' 
        : 'bg-transparent py-4 md:py-6'
    }`}>
      <div className="container-optimized">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-extrabold text-xl md:text-2xl text-gray-900">MindLoop</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link text-sm lg:text-base relative group"
                >
                  {item.name}
                  {item.name === 'Kuis' && (
                    <span className="absolute -top-1 -right-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    </span>
                  )}
                  {item.name === 'Event' && (
                    <span className="absolute -top-1 -right-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="nav-link text-sm lg:text-base"
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              /* User Logged In */
              <div className="flex items-center gap-4">
                {/* Desktop Profile Dropdown */}
                <div className="hidden md:block relative profile-dropdown">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors group"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-indigo-200 transition-colors"
                    />
                    <span className="text-sm font-medium max-w-32 truncate">{user.name}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu - GANTI "Profil Saya" menjadi "Dashboard" */}
                  {profileDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-strong border border-gray-100 py-2 z-50">
                      {/* TOMBOL DASHBOARD */}
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Profile */}
                <Link 
                  to="/profile"
                  className="md:hidden flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                </Link>
              </div>
            ) : (
              /* User Not Logged In */
              <>
                <Link 
                  to="/login" 
                  className="btn btn-secondary hidden sm:flex text-sm"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary text-sm md:text-base"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 mobile-menu bg-white">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                item.type === 'link' ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="nav-link text-base py-2 flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.name === 'Kuis' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                    {item.name === 'Event' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className="nav-link text-base py-2 text-left"
                  >
                    {item.name}
                  </button>
                )
              ))}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {/* TOMBOL DASHBOARD untuk Mobile */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>Dashboard</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="btn btn-secondary justify-center text-base py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary justify-center text-base py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Daftar Gratis
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
