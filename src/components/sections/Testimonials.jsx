import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "Guru & Content Creator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
      content: "Sebagai guru, saya melihat langsung dampak positif MindLoop pada siswa. Platform ini membuat belajar literasi menjadi menyenangkan dan efektif!",
      rating: 5,
      improvement: "78% peningkatan"
    },
    {
      name: "Ahmad Fauzi",
      role: "Mahasiswa S2",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      content: "Tools fact-checking dan analisis di MindLoop sangat membantu penelitian saya. Sekarang saya lebih percaya diri dalam menulis paper akademik.",
      rating: 5,
      improvement: "65% lebih efisien"
    },
    {
      name: "Maria Santoso",
      role: "Professional Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      content: "Komunitas MindLoop sangat supportive. Saya belajar banyak dari diskusi dengan anggota lain dan pakar literasi yang selalu siap membantu.",
      rating: 5,
      improvement: "82% lebih percaya diri"
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
    <section id="testimonials" className="py-16 md:py-20 bg-white">
      <div className="container-optimized">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            Testimoni Pengguna
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cerita <span className="gradient-text">Sukses Pengguna</span> MindLoop
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dengarkan pengalaman langsung dari mereka yang telah mengalami transformasi dalam kemampuan literasi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-strong transition-all duration-300 group">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-200 transition-colors"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">{testimonial.improvement}</div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                "{testimonial.content}"
              </p>
              
              {/* Decorative Quote */}
              <div className="text-right">
                <svg className="w-8 h-8 text-indigo-100 inline-block" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Footer */}
        <div className="text-center">
          <div className="flex flex-col xs:flex-row xs:flex-wrap items-center justify-center gap-3 xs:gap-6 bg-gray-50 px-4 sm:px-6 py-4 rounded-2xl border border-gray-200 max-w-full">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
              ))}
            </div>
            <div className="text-center xs:text-left">
              <div className="text-gray-900 font-semibold">
                <strong>2,500+</strong> review positif
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span>4.9/5 rating average</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
//penanda