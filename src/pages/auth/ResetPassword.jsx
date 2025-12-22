import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthCenteredLayout from "../../components/auth/AuthCenteredLayout";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem("reset_email") || "";
    setEmail(storedEmail);
    if (!storedEmail) {
      setError("Email untuk reset password tidak ditemukan. Silakan ulangi proses dari Lupa Password.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setIsLoading(true);

    try {
      await resetPassword(email, formData.password, formData.confirmPassword);

      setSuccess(
        "Password berhasil direset! Anda akan diarahkan ke halaman login."
      );

      localStorage.removeItem("reset_email");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Gagal reset password. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  return (
    <AuthCenteredLayout
      title="Reset Password"
      subtitle="Buat password baru untuk akun Anda"
    >
      {!email && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <span className="text-yellow-800 text-sm">
            Email tidak ditemukan. Silakan kembali ke halaman{" "}
            <Link to="/forgot-password" className="underline font-semibold">
              Lupa Password
            </Link>
            .
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* New Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password Baru
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Minimal 8 karakter"
            minLength="8"
            required
            disabled={isLoading}
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Ketik ulang password baru"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Password harus mengandung:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              Minimal 8 karakter
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  /(?=.*[a-z])/.test(formData.password)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></span>
              Minimal satu huruf kecil
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  /(?=.*[A-Z])/.test(formData.password)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></span>
              Minimal satu huruf besar
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  /(?=.*\d)/.test(formData.password)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></span>
              Minimal satu angka
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full btn btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Memproses...
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </AuthCenteredLayout>
  );
};

export default ResetPassword;
