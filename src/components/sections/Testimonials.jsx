// src/components/sections/Testimonials.jsx
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "Guru & Content Creator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
      content: "Sebagai guru, saya melihat langsung dampak positif MindLoop pada siswa. Platform ini membuat belajar literasi menjadi menyenangkan dan efektif!",
      rating: 5
    },
    {
      name: "Ahmad Fauzi",
      role: "Mahasiswa S2",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      content: "Tools fact-checking dan analisis di MindLoop sangat membantu penelitian saya. Sekarang saya lebih percaya diri dalam menulis paper akademik.",
      rating: 5
    },
    {
      name: "Maria Santoso",
      role: "Professional Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      content: "Komunitas MindLoop sangat supportive. Saya belajar banyak dari diskusi dengan anggota lain dan pakar literasi yang selalu siap membantu.",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <h2 className="section-title">
            Kata <span className="gradient-text">Mereka</span> yang Sudah Merasakan Manfaat
          </h2>
          <p className="section-subtitle">
            Dengarkan pengalaman langsung dari pengguna MindLoop yang telah mengalami transformasi dalam kemampuan literasi mereka
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-soft border border-gray-200">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-600">
                <strong>2,500+</strong> review positif
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <span className="text-gray-600">4.9/5 rating average</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
