const CTA = () => {
  return (
    <section className="cta bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content max-w-3xl mx-auto">
          <h2 className="cta-title font-bold text-4xl mb-4">
            Siap Meningkatkan Literasi Anda?
          </h2>
          
          <p className="cta-desc text-xl mb-8 opacity-90">
            Bergabunglah dengan ribuan orang yang telah merasakan manfaat meningkatkan kemampuan literasi mereka. Mulai perjalanan literasi Anda hari ini!
          </p>
          
          <button className="btn-cta mx-auto">
            <span>Daftar Sekarang</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;