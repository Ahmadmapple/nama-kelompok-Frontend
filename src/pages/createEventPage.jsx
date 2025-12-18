import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Untuk redirect
import axios from "axios";
import {
  CalendarCheck,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  DollarSign,
  Upload,
  Send,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

// Helper: Format Angka ke Rupiah
const formatRupiah = (value) => {
  if (!value) return "";
  const numberString = value.replace(/[^0-9]/g, "");
  const sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  const ribuan = numberString.substr(sisa).match(/\d{3}/g);
  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  return rupiah;
};

// Mendapatkan tanggal hari ini (YYYY-MM-DD)
const today = new Date().toISOString().split("T")[0];

const eventTypes = [
  { value: "webinar", label: "Webinar" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "komunitas", label: "Komunitas" },
];

const categories = [
  { value: "literasi-digital", label: "Literasi Digital" },
  { value: "pengembangan-diri", label: "Pengembangan Diri" },
  { value: "teknologi", label: "Teknologi & Coding" },
  { value: "kesehatan", label: "Kesehatan & Kebugaran" },
  { value: "lainnya", label: "Lainnya" },
];

const difficulties = [
  { value: "Pemula", label: "Pemula" },
  { value: "Menengah", label: "Menengah" },
  { value: "Lanjutan", label: "Lanjutan" },
  { value: "Semua Level", label: "Semua Level" },
];

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  isFile = false,
  min,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isFile ? "text-indigo-500" : "text-gray-400"
          }`}
        />
      )}
      <input
        type={type}
        id={id}
        {...(!isFile && { value })}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
          Icon ? "pl-10" : ""
        } ${
          isFile
            ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            : ""
        }`}
      />
    </div>
  </div>
);

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "webinar",
    category: "literasi-digital",
    price: "Gratis",
    difficulty: "Pemula",
    tags: "",
    eventImageFile: null,
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else if (id === "price") {
      const rawValue = value.replace(/[^0-9]/g, "");
      const formatted =
        rawValue === "" || rawValue === "0"
          ? "Gratis"
          : "Rp " + formatRupiah(rawValue);
      setFormData((prev) => ({ ...prev, [id]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Ambil token dari localStorage
    const token = localStorage.getItem("mindloop_token");

    // 2. Validasi awal di frontend: Jika tidak ada token, jangan lanjut
    if (!token) {
      alert("Anda harus login terlebih dahulu untuk membuat event.");
      navigate("/login"); // Redirect ke halaman login
      return;
    }

    setLoading(true);

    try {
      const cleanPrice =
        formData.price === "Gratis"
          ? 0
          : parseInt(formData.price.replace(/[^0-9]/g, ""));
      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("description", formData.description);
      dataToSend.append("date", formData.date);
      dataToSend.append("time", formData.time);
      dataToSend.append("type", formData.type);
      dataToSend.append("category", formData.category);
      dataToSend.append("price", cleanPrice);
      dataToSend.append("difficulty", formData.difficulty);
      dataToSend.append("tags", JSON.stringify(tagsArray));
      dataToSend.append("gambar", formData.eventImageFile);

      // 3. Kirim dengan Header Authorization
      const response = await axios.post(
        `${API_BASE_URL}/api/event/create-event`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // TAMBAHKAN INI:
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Event berhasil dipublikasikan!");
        navigate("/events");
      }
    } catch (error) {
      console.error("Error detail:", error.response);

      // Jika backend mengirim error 401 atau 403 (Token kadaluarsa/salah)
      if (error.response?.status === 401) {
        alert("Sesi Anda habis. Silakan login kembali.");
        navigate("/login");
      } else {
        alert(
          "Gagal membuat event: " +
            (error.response?.data?.message || "Terjadi kesalahan server.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const DropdownSelect = ({
    label,
    id,
    value,
    onChange,
    options,
    required,
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pr-10"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <Navbar />
        <header className="mb-8 pt-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-2">
            <CalendarCheck className="w-8 h-8 text-indigo-600" />
            Buat Event Baru
          </h1>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 space-y-8"
          >
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
                1. Informasi Dasar
              </h2>
              <FormInput
                label="Judul Event"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Webinar: Teknik Membaca Kritis"
                icon={BookOpen}
                required={true}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi Event <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan detail event..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  rows="3"
                  maxLength={300}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DropdownSelect
                  label="Tipe Event"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={eventTypes}
                  required
                />
                <DropdownSelect
                  label="Kategori"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories}
                  required
                />
                <DropdownSelect
                  label="Level"
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  options={difficulties}
                  required
                />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
                2. Jadwal & Biaya
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  label="Tanggal"
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  icon={Calendar}
                  required={true}
                  min={today}
                />
                <FormInput
                  label="Waktu"
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  icon={Clock}
                  required={true}
                />
                <FormInput
                  label="Harga"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0 untuk Gratis"
                  icon={DollarSign}
                  required={true}
                />
              </div>
              <FormInput
                label="Tags (Pisahkan dengan koma)"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Membaca, Digital, AI"
                icon={Tag}
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
                3. Media
              </h2>
              <FormInput
                label="Upload Poster"
                id="eventImageFile"
                type="file"
                onChange={handleChange}
                icon={Upload}
                isFile={true}
                required={true}
              />
              {formData.eventImageFile && (
                <p className="text-xs text-indigo-600 italic">
                  File terpilih: {formData.eventImageFile.name}
                </p>
              )}
            </section>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              }`}
            >
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  <Send className="w-5 h-5" /> Publikasikan Event
                </>
              )}
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CreateEventPage;
