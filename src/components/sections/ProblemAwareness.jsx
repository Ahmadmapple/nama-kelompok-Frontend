// src/components/sections/ProblemAwareness.jsx
import React from 'react';

const ProblemAwareness = () => {
  const problems = [
    {
      stat: "65%",
      description: "orang Indonesia kesulitan membedakan berita hoaks dan fakta",
      source: "Kominfo 2023"
    },
    {
      stat: "3x",
      description: "lebih mungkin percaya informasi yang sesuai dengan keyakinan",
      source: "Journal of Media Literacy"
    },
    {
      stat: "2.5 jam",
      description: "rata-rata waktu terbuang untuk informasi tidak penting sehari",
      source: "Digital Wellbeing Report"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Masalah yang <span className="text-red-500">Sering Tidak Disadari</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tanpa kemampuan literasi yang baik, kita rentan menjadi korban misinformasi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl font-bold text-red-500 mb-4">{problem.stat}</div>
              <p className="text-gray-700 mb-4 text-lg font-medium leading-relaxed">{problem.description}</p>
              <p className="text-gray-500 text-sm">{problem.source}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 md:p-12 text-center border border-red-100">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Solusinya Bukan Sekadar "Baca Lebih Banyak"
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Tapi <strong className="text-red-600">membaca dengan cara yang lebih cerdas</strong> - mampu menganalisis, 
              memverifikasi, dan mengambil keputusan berdasarkan informasi yang terpercaya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAwareness;
