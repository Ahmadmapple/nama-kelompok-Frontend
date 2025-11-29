import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeToTerms: false,
    newsletter: true
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const { register, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect jika sudah login
  useEffect(() => {
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Nama maksimal 50 karakter';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email maksimal 100 karakter';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (formData.password.length > 50) {
      newErrors.password = 'Password maksimal 50 karakter';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password terlalu lemah. Gunakan kombinasi huruf besar, kecil, dan angka.';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setErrors({});
    setIsLoading(true);

    const result = await register({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      agreeToTerms: formData.agreeToTerms,
      newsletter: formData.newsletter
    });
    
    if (result.success) {
      setRegistrationSuccess(true);
      // Auto redirect ke profile setelah 2 detik
      setTimeout(() => {
        navigate('/profile', { replace: true });
      }, 2000);
    } else {
      setErrors({ submit: result.error });
    }
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (errors.submit) {
      setErrors(prev => ({
        ...prev,
        submit: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Sangat Lemah';
    if (passwordStrength < 50) return 'Lemah';
    if (passwordStrength < 75) return 'Cukup';
    return 'Kuat';
  };

  const getPasswordStrengthDescription = () => {
    if (passwordStrength < 25) return 'Tambah lebih banyak karakter dan variasi';
    if (passwordStrength < 50) return 'Gunakan kombinasi huruf dan angka';
    if (passwordStrength < 75) return 'Bagus! Bisa lebih kuat dengan simbol';
    return 'Sangat kuat! Password Anda aman';
  };

  // Tampilkan success message jika registrasi berhasil
  if (registrationSuccess) {
    return (
      <AuthLayout
        title="Registrasi Berhasil! 🎉"
        subtitle="Akun Anda telah berhasil dibuat. Mengarahkan ke profil..."
      >
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Selamat Bergabung di MindLoop!</h3>
          <p className="text-gray-600 mb-2">
            Akun <strong>{formData.email}</strong> telah berhasil dibuat.
          </p>
          <p className="text-gray-600 mb-6">
            Anda akan diarahkan ke halaman profil secara otomatis.
          </p>
          <div className="flex justify-center items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Mengarahkan...</span>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 mb-3 font-medium">Apa yang bisa Anda lakukan selanjutnya?</p>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Lengkapi profil Anda
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Ikuti tes penempatan
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Jelajahi artikel pertama
              </li>
            </ul>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Daftar MindLoop"
      subtitle="Bergabung dengan komunitas pembaca cerdas dan mulai perjalanan literasi Anda"
      footerText="Sudah punya akun?"
      footerLink="/login"
      footerLinkText="Masuk di sini"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm">{errors.submit}</span>
            </div>
          </div>
        )}

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Masukkan nama lengkap Anda"
            disabled={isLoading}
            maxLength={50}
          />
          <div className="flex justify-between mt-1">
            {errors.name ? (
              <p className="text-sm text-red-600 animate-fade-in">{errors.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Contoh: Budi Santoso</p>
            )}
            <span className="text-sm text-gray-500">{formData.name.length}/50</span>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="email@example.com"
            disabled={isLoading}
            maxLength={100}
          />
          <div className="flex justify-between mt-1">
            {errors.email ? (
              <p className="text-sm text-red-600 animate-fade-in">{errors.email}</p>
            ) : (
              <p className="text-sm text-gray-500">Kami tidak akan membagikan email Anda</p>
            )}
            <span className="text-sm text-gray-500">{formData.email.length}/100</span>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Saya adalah <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-gray-400"
            disabled={isLoading}
          >
            <option value="student">🎓 Mahasiswa/Pelajar</option>
            <option value="teacher">👨‍🏫 Guru/Dosen</option>
            <option value="professional">💼 Professional</option>
            <option value="lifelong_learner">📚 Pembelajar Seumur Hidup</option>
            <option value="researcher">🔬 Peneliti/Akademisi</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            {formData.role === 'student' && 'Akses konten khusus untuk pelajar'}
            {formData.role === 'teacher' && 'Fitur khusus untuk edukator'}
            {formData.role === 'professional' && 'Konten relevan untuk profesional'}
            {formData.role === 'lifelong_learner' && 'Jelajahi berbagai topik menarik'}
            {formData.role === 'researcher' && 'Tools analisis dan penelitian'}
          </p>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1"
              disabled={isLoading}
            >
              {showPassword ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Sembunyikan
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Tampilkan
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Buat password yang kuat"
              disabled={isLoading}
              maxLength={50}
            />
          </div>
          
          {/* Password Strength Meter */}
          {formData.password && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Kekuatan password:</span>
                <span className={`font-medium ${
                  passwordStrength < 25 ? 'text-red-600' :
                  passwordStrength < 50 ? 'text-orange-600' :
                  passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <p className={`text-xs ${
                passwordStrength < 25 ? 'text-red-600' :
                passwordStrength < 50 ? 'text-orange-600' :
                passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {getPasswordStrengthDescription()}
              </p>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Konfirmasi Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Ketik ulang password Anda"
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Password harus mengandung:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              Minimal 8 karakter
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                /[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              Huruf kecil (a-z)
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              Huruf besar (A-Z)
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              Angka (0-9)
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1 flex-shrink-0 ${
                errors.agreeToTerms ? 'border-red-300' : ''
              }`}
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
              Saya setuju dengan{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium underline">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium underline">
                Kebijakan Privasi
              </Link>{' '}
              MindLoop. Saya memahami bahwa data saya akan diproses sesuai dengan kebijakan yang berlaku.
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600 animate-fade-in ml-7">{errors.agreeToTerms}</p>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1 flex-shrink-0"
              disabled={isLoading}
            />
            <label htmlFor="newsletter" className="text-sm text-gray-600 leading-relaxed">
              Ya, saya ingin menerima update tentang fitur baru, tips literasi, webinar, dan penawaran khusus via email. 
              Anda bisa berhenti berlangganan kapan saja.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || authLoading}
          className="w-full btn btn-primary justify-center py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Membuat Akun...</span>
            </div>
          ) : (
            'Buat Akun Gratis Sekarang'
          )}
        </button>
      </form>

      {/* Benefits Section */}
      <div className="mt-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-4 text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Keuntungan Bergabung dengan MindLoop
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-green-900">1,000+ Artikel Premium</div>
                <div className="text-green-700 text-xs mt-1">Akses konten berkualitas dari pakar</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-green-900">Sistem Personal</div>
                <div className="text-green-700 text-xs mt-1">Rekomendasi sesuai level & minat</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-green-900">Komunitas Aktif</div>
                <div className="text-green-700 text-xs mt-1">Diskusi dengan 50K+ pembaca</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs font-bold">4</span>
              </div>
              <div>
                <div className="font-medium text-green-900">Sertifikat & Progress</div>
                <div className="text-green-700 text-xs mt-1">Track perkembangan dan dapatkan sertifikat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <p className="text-blue-800 text-sm font-medium">Data Anda Aman Bersama Kami</p>
            <p className="text-blue-700 text-xs mt-1">
              Kami menggunakan enkripsi SSL dan tidak pernah membagikan data pribadi Anda kepada pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
