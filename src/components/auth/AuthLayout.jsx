import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
  brandingTitle,
  brandingDescription
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50 grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT – BRANDING */}
      <div className="hidden lg:flex items-start justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-12 pt-[140px]">
        <div className="max-w-lg">
          {brandingTitle && (
            <h2 className="text-4xl font-bold mb-4">
              {brandingTitle}
            </h2>
          )}
          {brandingDescription && (
            <p className="text-lg text-white opacity-90">
              {brandingDescription}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="flex flex-col justify-center px-4 sm:px-8 pt-10 lg:pt-0">
        
        {/* Logo */}
        <div className="mb-10 mt-5 flex justify-center lg:justify-start">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="font-extrabold text-2xl text-gray-900">
              MindLoop
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-strong border border-gray-100 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          {(footerText || footerLink) && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                {footerText}{' '}
                {footerLink && (
                  <Link
                    to={footerLink}
                    className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors"
                  >
                    {footerLinkText}
                  </Link>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;