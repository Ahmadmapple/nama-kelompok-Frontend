import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

const Stats = () => {
  const [publicStats, setPublicStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/public/stats`);
        if (!cancelled) {
          setPublicStats(res.data?.stats || null);
        }
      } catch (e) {
        if (!cancelled) {
          setPublicStats(null);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatCompact = (value) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n)) return '0';
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
    return String(n);
  };

  const safePct = (done, total) => {
    const d = Number(done || 0);
    const t = Number(total || 0);
    if (!Number.isFinite(d) || !Number.isFinite(t) || t <= 0) return 0;
    return Math.max(0, Math.round((d / t) * 100));
  };

  const computed = useMemo(() => {
    const users = publicStats?.users ?? 50000;
    const usersThisMonth = publicStats?.usersThisMonth ?? 15000;
    const articles = publicStats?.articles ?? 1200;
    const quizzes = publicStats?.quizzes ?? 0;
    const events = publicStats?.events ?? 0;
    const content = publicStats?.content ?? (articles + quizzes + events);
    const organizers = publicStats?.organizers ?? 42;

    const monthlyTarget = 10000;
    const totalUsersTarget = 50000;
    const contentTarget = 1000;
    const oneMillionTarget = 1000000;

    return {
      users,
      usersThisMonth,
      articles,
      quizzes,
      events,
      content,
      organizers,
      monthlyTarget,
      totalUsersTarget,
      contentTarget,
      oneMillionTarget,
    };
  }, [publicStats]);

  const stats = useMemo(() => {
    return [
      {
        number: formatCompact(computed.users),
        label: 'Pengguna Aktif',
        description: 'Telah bergabung dalam platform',
        trend: `+${formatCompact(computed.usersThisMonth)}`,
        trendUp: true,
      },
      {
        number: formatCompact(computed.articles),
        label: 'Artikel Terbit',
        description: 'Materi bacaan yang tersedia',
        trend: '+',
        trendUp: true,
      },
      {
        number: formatCompact(computed.quizzes),
        label: 'Kuis Tersedia',
        description: 'Latihan untuk uji pemahaman',
        trend: '+',
        trendUp: true,
      },
      {
        number: formatCompact(computed.events),
        label: 'Event Berlangsung',
        description: 'Event dan kegiatan literasi',
        trend: '+',
        trendUp: true,
      },
    ];
  }, [computed]);

  const milestones = useMemo(() => {
    const monthlyPct = safePct(computed.usersThisMonth, computed.monthlyTarget);
    const totalUsersPct = safePct(computed.users, computed.totalUsersTarget);
    const contentPct = safePct(computed.content, computed.contentTarget);

    return [
      {
        target: formatCompact(computed.monthlyTarget),
        achieved: formatCompact(computed.usersThisMonth),
        label: 'Pembaca Bulan Ini',
        percentage: monthlyPct,
      },
      {
        target: formatCompact(computed.totalUsersTarget),
        achieved: formatCompact(computed.users),
        label: 'Total Pengguna',
        percentage: totalUsersPct,
      },
      {
        target: formatCompact(computed.contentTarget),
        achieved: formatCompact(computed.content),
        label: 'Konten Terbit',
        percentage: contentPct,
      },
    ].map((m) => ({
      ...m,
      percentage: Math.min(m.percentage, 999),
    }));
  }, [computed]);

  const overall = useMemo(() => {
    const pct = safePct(computed.users, computed.oneMillionTarget);
    return {
      percentage: Math.min(pct, 100),
      achieved: computed.users,
      target: computed.oneMillionTarget,
    };
  }, [computed]);

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-optimized">
        <div className="text-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Dampak Nyata
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dalam <span className="gradient-text">Angka & Pencapaian</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Bukti nyata dari komitmen kami dalam meningkatkan literasi Indonesia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-indigo-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-lg font-semibold text-gray-900">{stat.label}</div>
                <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                  stat.trendUp
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  <svg className={`w-3 h-3 ${stat.trendUp ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.trend}
                </div>
              </div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Progress Milestones */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🎯 Pencapaian & Target Kami
            </h3>
            <p className="text-gray-600">
              Melampaui ekspektasi dalam setiap target yang kami tetapkan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-4">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="3"
                      strokeDasharray={`${milestone.percentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{milestone.percentage}%</div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {milestone.achieved}
                </div>
                <div className="text-gray-600 text-sm mb-2">{milestone.label}</div>
                <div className="text-xs text-gray-500">
                  Target: {milestone.target}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Progress Menuju 1 Juta Pembaca Cerdas</span>
              <span className="text-sm font-medium text-indigo-600">{overall.percentage}% Tercapai</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: `${overall.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{Number(overall.achieved || 0).toLocaleString('id-ID')} Pembaca</span>
              <span>{Number(overall.target || 0).toLocaleString('id-ID')} Target</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
//penanda