// src/context/EnhancedQuizContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const EnhancedQuizContext = createContext();

export const useEnhancedQuiz = () => {
  const context = useContext(EnhancedQuizContext);
  if (!context) {
    throw new Error('useEnhancedQuiz must be used within a EnhancedQuizProvider');
  }
  return context;
};

export const EnhancedQuizProvider = ({ children }) => {
  const { user } = useAuth();
  const [quizHistory, setQuizHistory] = useState([]);
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    totalXP: 0,
    currentLevel: 1,
    xpToNextLevel: 1000,
    currentStreak: 0,
    longestStreak: 0,
    lastQuizDate: null,
    badges: [],
    achievements: [],
    accuracy: 0
  });

  const [leaderboard, setLeaderboard] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = () => {
    try {
      const savedHistory = localStorage.getItem(`mindloop_quiz_history_${user.id}`);
      const savedStats = localStorage.getItem(`mindloop_quiz_stats_${user.id}`);
      
      if (savedHistory) setQuizHistory(JSON.parse(savedHistory));
      if (savedStats) setUserStats(JSON.parse(savedStats));
    } catch (error) {
      console.error('Error loading quiz data:', error);
    }
  };

  const saveQuizResult = async (quizData) => {
    const xpEarned = calculateXPEarned(quizData.score, quizData.difficulty);
    
    const newResult = {
      id: `quiz_${Date.now()}`,
      userId: user?.id,
      ...quizData,
      completedAt: new Date().toISOString(),
      xpEarned: xpEarned
    };

    const updatedHistory = [newResult, ...quizHistory];
    setQuizHistory(updatedHistory);

    // Update user stats
    const updatedStats = updateUserStats(newResult);
    
    // Check for new badges and achievements
    const newBadges = checkForNewBadges(updatedStats, newResult);

    // Save to localStorage
    if (user) {
      localStorage.setItem(`mindloop_quiz_history_${user.id}`, JSON.stringify(updatedHistory));
      localStorage.setItem(`mindloop_quiz_stats_${user.id}`, JSON.stringify(updatedStats));
    }

    return {
      quizResult: newResult,
      newBadges,
      updatedStats
    };
  };

  const calculateXPEarned = (score, difficulty) => {
    const baseXP = score; // 1 XP per score point
    const difficultyMultiplier = {
      'Pemula': 1,
      'Menengah': 1.5,
      'Lanjutan': 2
    };
    
    const streakBonus = userStats.currentStreak * 5; // 5 XP per streak day
    const perfectScoreBonus = score === 100 ? 50 : 0;
    
    return Math.round(baseXP * (difficultyMultiplier[difficulty] || 1) + streakBonus + perfectScoreBonus);
  };

  const updateUserStats = (quizResult) => {
    const totalQuizzes = userStats.totalQuizzes + 1;
    const totalQuestions = userStats.totalQuestions + quizResult.totalQuestions;
    const correctAnswers = userStats.correctAnswers + quizResult.correctAnswers;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    const newAverageScore = userStats.totalQuizzes > 0 
      ? Math.round((userStats.averageScore * userStats.totalQuizzes + quizResult.score) / totalQuizzes)
      : quizResult.score;

    const newStats = {
      ...userStats,
      totalQuizzes,
      totalQuestions,
      correctAnswers,
      averageScore: newAverageScore,
      totalXP: userStats.totalXP + quizResult.xpEarned,
      lastQuizDate: quizResult.completedAt,
      accuracy: accuracy,
      currentStreak: updateStreak(quizResult.completedAt)
    };

    // Update longest streak
    if (newStats.currentStreak > newStats.longestStreak) {
      newStats.longestStreak = newStats.currentStreak;
    }

    // Level up check
    if (newStats.totalXP >= newStats.xpToNextLevel) {
      newStats.currentLevel += 1;
      newStats.xpToNextLevel = Math.round(newStats.xpToNextLevel * 1.5);
    }

    setUserStats(newStats);
    return newStats;
  };

  const updateStreak = (quizDate) => {
    const today = new Date().toDateString();
    const lastQuizDate = userStats.lastQuizDate ? new Date(userStats.lastQuizDate).toDateString() : null;
    
    if (lastQuizDate === today) {
      return userStats.currentStreak; // Already quizzed today
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastQuizDate === yesterday.toDateString()) {
      return userStats.currentStreak + 1;
    }
    
    return 1; // Broken streak, start over
  };

  const checkForNewBadges = (stats, quizResult) => {
    const newBadges = [];
    const currentBadges = stats.badges.map(b => b.id);

    // Quiz Count Badges
    if (stats.totalQuizzes >= 1 && !currentBadges.includes('first_quiz')) {
      newBadges.push({
        id: 'first_quiz',
        name: 'Pemula',
        description: 'Menyelesaikan kuis pertama',
        icon: '🎯',
        type: 'bronze',
        earnedAt: new Date().toISOString()
      });
    }

    if (stats.totalQuizzes >= 5 && !currentBadges.includes('quiz_enthusiast')) {
      newBadges.push({
        id: 'quiz_enthusiast',
        name: 'Pecinta Kuis',
        description: 'Menyelesaikan 5 kuis',
        icon: '🏆',
        type: 'silver',
        earnedAt: new Date().toISOString()
      });
    }

    if (stats.totalQuizzes >= 10 && !currentBadges.includes('quiz_master')) {
      newBadges.push({
        id: 'quiz_master',
        name: 'Master Kuis',
        description: 'Menyelesaikan 10 kuis',
        icon: '👑',
        type: 'gold',
        earnedAt: new Date().toISOString()
      });
    }

    // Streak Badges
    if (stats.currentStreak >= 3 && !currentBadges.includes('consistent_learner')) {
      newBadges.push({
        id: 'consistent_learner',
        name: 'Pembelajar Konsisten',
        description: '3 hari beruntun mengerjakan kuis',
        icon: '🔥',
        type: 'bronze',
        earnedAt: new Date().toISOString()
      });
    }

    if (stats.currentStreak >= 7 && !currentBadges.includes('weekly_warrior')) {
      newBadges.push({
        id: 'weekly_warrior',
        name: 'Pejuang Mingguan',
        description: '7 hari beruntun mengerjakan kuis',
        icon: '⚡',
        type: 'silver',
        earnedAt: new Date().toISOString()
      });
    }

    // Accuracy Badges
    if (stats.accuracy >= 80 && !currentBadges.includes('accuracy_expert')) {
      newBadges.push({
        id: 'accuracy_expert',
        name: 'Ahli Akurasi',
        description: 'Mempertahankan akurasi 80%+',
        icon: '🎯',
        type: 'silver',
        earnedAt: new Date().toISOString()
      });
    }

    if (stats.accuracy >= 90 && !currentBadges.includes('accuracy_master')) {
      newBadges.push({
        id: 'accuracy_master',
        name: 'Master Akurasi',
        description: 'Mempertahankan akurasi 90%+',
        icon: '🏅',
        type: 'gold',
        earnedAt: new Date().toISOString()
      });
    }

    // Perfect Score Badge
    if (quizResult.score === 100 && !currentBadges.includes('perfect_score')) {
      newBadges.push({
        id: 'perfect_score',
        name: 'Sempurna',
        description: 'Mendapatkan nilai 100% dalam kuis',
        icon: '💯',
        type: 'gold',
        earnedAt: new Date().toISOString()
      });
    }

    // Add new badges to stats
    if (newBadges.length > 0) {
      stats.badges = [...stats.badges, ...newBadges];
    }

    return newBadges;
  };

  const getPerformanceAnalytics = () => {
    const last30Days = quizHistory.filter(quiz => {
      const quizDate = new Date(quiz.completedAt);
      const daysAgo = (Date.now() - quizDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= 30;
    });

    return {
      totalQuizzes: userStats.totalQuizzes,
      averageScore: userStats.averageScore,
      currentStreak: userStats.currentStreak,
      accuracy: userStats.accuracy,
      levelProgress: Math.round((userStats.totalXP / userStats.xpToNextLevel) * 100),
      recentQuizzes: last30Days.length
    };
  };

  const getCategoryPerformance = () => {
    const categoryStats = {};
    
    quizHistory.forEach(quiz => {
      if (!categoryStats[quiz.category]) {
        categoryStats[quiz.category] = { total: 0, correct: 0, totalScore: 0 };
      }
      categoryStats[quiz.category].total += 1;
      categoryStats[quiz.category].totalScore += quiz.score;
    });

    return Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      averageScore: Math.round(stats.totalScore / stats.total),
      quizCount: stats.total
    }));
  };

  const resetProgress = () => {
    const resetStats = {
      totalQuizzes: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      averageScore: 0,
      totalXP: 0,
      currentLevel: 1,
      xpToNextLevel: 1000,
      currentStreak: 0,
      longestStreak: 0,
      lastQuizDate: null,
      badges: [],
      achievements: [],
      accuracy: 0
    };

    setQuizHistory([]);
    setUserStats(resetStats);

    if (user) {
      localStorage.removeItem(`mindloop_quiz_history_${user.id}`);
      localStorage.removeItem(`mindloop_quiz_stats_${user.id}`);
    }
  };

  return (
    <EnhancedQuizContext.Provider value={{
      quizHistory,
      userStats,
      leaderboard,
      saveQuizResult,
      getPerformanceAnalytics,
      getCategoryPerformance,
      resetProgress
    }}>
      {children}
    </EnhancedQuizContext.Provider>
  );
};
//penanda