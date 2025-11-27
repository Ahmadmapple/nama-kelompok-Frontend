const Stats = () => {
  const stats = [
    {
      icon: '👥',
      number: '50K+',
      text: 'Pembaca Aktif'
    },
    {
      icon: '📚',
      number: '1.2K+',
      text: 'Konten Premium'
    },
    {
      icon: '⭐',
      number: '95%',
      text: 'Tingkat Kepuasan'
    },
    {
      icon: '👨‍🏫',
      number: '42',
      text: 'Ahli Literasi'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M20 20v0zm-10 10h20v0zm20-20v20h0zm-40 0h20v0zm0 20h20v0z\'/%3E%3C/g%3E%3C/svg%3E")'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item group">
              <div className="w-15 h-15 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                {stat.icon}
              </div>
              
              <div className="text-4xl font-extrabold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
                {stat.number}
              </div>
              
              <div className="text-lg font-medium opacity-90">
                {stat.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;