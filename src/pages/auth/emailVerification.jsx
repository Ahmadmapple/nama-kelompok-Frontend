import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthCenteredLayout from "../../components/auth/AuthCenteredLayout";
import { useAlert } from "../../context/AlertContext";

const EmailVerification = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [debugOtp, setDebugOtp] = useState(localStorage.getItem("otpDebug") || "");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // only digits
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // move focus to next box if digit entered
    if (val && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);

    const nextIndex = pasted.length - 1;
    if (nextIndex >= 0) inputsRef.current[nextIndex]?.focus();

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      setError("Masukkan kode 6 digit yang dikirim ke email Anda.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp: code.join(""),
            email: localStorage.getItem("email"),
            token: localStorage.getItem("otpToken"),
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        navigate("/profile");
      } else {
        setError(data.error || "Kode tidak valid, silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server.");
    }

    setIsSubmitting(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    const email = localStorage.getItem("email");
    if (!email) {
      setError(
        "Email tidak ditemukan. Silakan login atau daftar terlebih dahulu."
      );
      setIsResending(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        // Simpan token OTP baru dari response
        if (data.verificationToken) {
          localStorage.setItem("otpToken", data.verificationToken);
          console.log('New OTP token saved, length:', data.verificationToken.length);
        }

        if (data.otp) {
          localStorage.setItem("otpDebug", String(data.otp));
          setDebugOtp(String(data.otp));
        }

        setCode(Array(6).fill(""));
        inputsRef.current[0]?.focus();
        
        showAlert({
          title: "OTP Terkirim",
          message: "Kode OTP baru telah dikirim ke email Anda.",
          type: "success"
        });
      } else {
        setError(data.error || "Gagal mengirim ulang kode OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server.");
    }

    setIsResending(false);
  };

  return (
    <AuthCenteredLayout
      title="Verifikasi Email"
      subtitle="Masukkan 6 digit kode yang dikirim ke email Anda"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2 flex-wrap">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-12 h-14 sm:w-10 sm:h-12 xs:w-8 xs:h-10 text-center text-xl sm:text-lg xs:text-base font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        {debugOtp ? (
          <div className="text-center">
            <span className="text-xs text-gray-600">Kode OTP: </span>
            <span className="text-xs font-semibold text-gray-900">{debugOtp}</span>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Memverifikasi..." : "Verifikasi"}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? "Mengirim ulang..." : "Kirim ulang kode OTP"}
        </button>
      </div>
    </AuthCenteredLayout>
  );
};

export default EmailVerification;
