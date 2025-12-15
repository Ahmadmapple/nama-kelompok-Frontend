// layouts/AuthCenteredLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthCenteredLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
                  C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253
                  m0-13C13.168 5.477 14.754 5 16.5 5
                  c1.747 0 3.332.477 4.5 1.253v13
                  C19.832 18.477 18.247 18 16.5 18
                  c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl text-gray-900">MindLoop</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-strong border border-gray-100 p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>

          {children}

          {(footerText || footerLink) && (
            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-sm text-gray-600">
                {footerText}{' '}
                {footerLink && (
                  <Link to={footerLink} className="text-indigo-600 font-semibold">
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

export default AuthCenteredLayout;