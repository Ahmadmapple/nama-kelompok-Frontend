import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const CustomAlert = ({ isOpen, onClose, title, message, type = 'info', confirmText = 'OK', onConfirm }) => {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-12 h-12 text-green-500" />,
    error: <AlertCircle className="w-12 h-12 text-red-500" />,
    warning: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
    info: <Info className="w-12 h-12 text-blue-500" />
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1" />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              {icons[type]}
            </div>

            {title && (
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {title}
              </h3>
            )}

            <p className="text-gray-600 mb-6">
              {message}
            </p>

            <button
              onClick={handleConfirm}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
