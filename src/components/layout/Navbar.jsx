import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-sm px-8 py-4 shadow-lg transition-all duration-300 ${
      scrolled ? 'py-3 shadow-xl' : ''
    }`}>
      <div className="logo flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
          📚
        </div>
        <span className="font-extrabold text-xl text-indigo-600">LiterasiKu</span>
      </div>
      
      <div className="nav-links hidden md:flex gap-6 text-gray-600 items-center">
        {['Beranda', 'Artikel', 'Tantangan', 'Kuis', 'Komunitas', 'Event'].map((item) => (
          <a
            key={item}
            href="#"
            className="px-3 py-2 rounded-lg font-medium flex items-center gap-1 relative transition-colors duration-300 hover:text-indigo-600 group"
          >
            {item}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 transform -translate-x-1/2 group-hover:w-4/5"></span>
          </a>
        ))}
      </div>
      
      <div className="nav-actions flex gap-4">
        <button className="border-2 border-gray-200 text-gray-600 px-5 py-2 rounded-full font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300">
          Login
        </button>
        <button className="bg-gradient-to-br from-indigo-500 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">
          Register
        </button>
      </div>
      
      <button className="mobile-menu md:hidden text-2xl text-gray-900">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;