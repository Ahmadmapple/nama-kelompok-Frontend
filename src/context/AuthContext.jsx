import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('mindloop_token');
    const userData = localStorage.getItem('mindloop_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'John Doe',
                email: email,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
                role: 'user'
              },
              token: 'mock_jwt_token_' + Date.now()
            }
          });
        }, 1500);
      });

      const { user: userData, token } = response.data;
      
      // Store in localStorage
      localStorage.setItem('mindloop_token', token);
      localStorage.setItem('mindloop_user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
                role: 'user'
              },
              token: 'mock_jwt_token_' + Date.now()
            }
          });
        }, 1500);
      });

      const { user: newUser, token } = response.data;
      
      // Store in localStorage
      localStorage.setItem('mindloop_token', token);
      localStorage.setItem('mindloop_user', JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('mindloop_token');
    localStorage.removeItem('mindloop_user');
    setUser(null);
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to send reset email' 
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};