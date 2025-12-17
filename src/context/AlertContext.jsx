import React, { createContext, useContext, useState } from 'react';
import CustomAlert from '../components/common/CustomAlert';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    onConfirm: null
  });

  const showAlert = ({ title, message, type = 'info', confirmText = 'OK', onConfirm }) => {
    setAlert({
      isOpen: true,
      title,
      message,
      type,
      confirmText,
      onConfirm
    });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        confirmText={alert.confirmText}
        onConfirm={alert.onConfirm}
      />
    </AlertContext.Provider>
  );
};
