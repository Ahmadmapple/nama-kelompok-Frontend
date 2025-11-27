const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-dark text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="footer-logo flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white">
                📚
              </div>
              <span className="font-extrabold text-xl">LiterasiKu</span>
            </div>
            
            <p className="footer-desc text-gray-300 mb-6 leading-relaxed">
              Platform literasi terdepan di Indonesia yang berkomitmen untuk meningkatkan kemampuan membaca, menulis, dan berpikir kritis masyarakat.
            </p>
            
            <div className="social-links flex gap-3 mb-6">
              {['Instagram', 'Twitter', 'Facebook', 'YouTube'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="social-link w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg relative overflow-hidden group"
                  aria-label={platform}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span className="relative z-10 text-sm">
                    {platform === 'Instagram' && '📱'}
                    {platform === 'Twitter' && '🐦'}
                    {platform === 'Facebook' && '📘'}
                    {platform === 'YouTube' && '📺'}
                  </span>
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="footer-newsletter bg-white/5 rounded-lg p-6 border border-white/10">
              <h6 className="font-semibold mb-2">Berlangganan Newsletter</h6>
              <p className="text-sm text-gray-400 mb-4">
                Dapatkan update terbaru tentang literasi dan tips membaca.
              </p>
              <div className="newsletter-form flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Anda"
                  className="newsletter-input flex-1 px-3 py-2 border border-white/20 rounded bg-white/10 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
                <button className="btn-newsletter bg-gradient-to-br from-primary-500 to-secondary-500 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Features Links */}
          <div>
            <h5 className="font-semibold mb-6 text-lg relative inline-block">
              Fitur
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded"></span>
            </h5>
            <ul className="space-y-3">
              {['Artikel Literasi', 'Kuis Interaktif', 'Tantangan', 'Komunitas', 'Event'].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="text-primary-500 mr-2 transition-transform duration-300 group-hover:translate-x-1">▸</span>
                  <a href="#" className="text-gray-300 text-sm transition-all duration-300 hover:text-white hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h5 className="font-semibold mb-6 text-lg relative inline-block">
              Sumber Daya
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded"></span>
            </h5>
            <ul className="space-y-3">
              {['Panduan Literasi', 'Fact-Checking', 'Blog', 'FAQ', 'Bantuan'].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="text-primary-500 mr-2 transition-transform duration-300 group-hover:translate-x-1">▸</span>
                  <a href="#" className="text-gray-300 text-sm transition-all duration-300 hover:text-white hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h5 className="font-semibold mb-6 text-lg relative inline-block">
              Perusahaan
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded"></span>
            </h5>
            <ul className="space-y-3">
              {['Tentang Kami', 'Karier', 'Kontak', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="text-primary-500 mr-2 transition-transform duration-300 group-hover:translate-x-1">▸</span>
                  <a href="#" className="text-gray-300 text-sm transition-all duration-300 hover:text-white hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="copyright text-center text-sm text-gray-500 pt-8 border-t border-white/10 relative z-10">
          &copy; 2025 LiterasiKu. All rights reserved. Platform literasi untuk Indonesia yang lebih cerdas.
        </div>
      </div>
    </footer>
  );
};

export default Footer;