const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const getAuthHeaders = () => {
  const token = localStorage.getItem('mindloop_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const submitQuizResult = async (quizId, score, totalQuestions, timeSpent) => {
  try {
    const response = await fetch(`${API_URL}/api/kuis/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        quizId,
        score,
        totalQuestions,
        timeSpent
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal menyimpan hasil kuis');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting quiz result:', error);
    throw error;
  }
};

export const getUserCompletedQuizzes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/kuis/completed`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal mengambil daftar kuis yang sudah dikerjakan');
    }

    const data = await response.json();
    return data.completedQuizzes || {};
  } catch (error) {
    console.error('Error fetching completed quizzes:', error);
    throw error;
  }
};

export const getUserQuizHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/api/kuis/history`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal mengambil riwayat kuis');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    throw error;
  }
};
