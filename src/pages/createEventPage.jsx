import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  DollarSign,
  Upload, // Icon untuk upload
  Send,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const eventTypes = [
  { value: "webinar", label: "Webinar" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "komunitas", label: "Komunitas" },
];

const difficulties = [
  { value: "Pemula", label: "Pemula" },
  { value: "Menengah", label: "Menengah" },
  { value: "Lanjutan", label: "Lanjutan" },
  { value: "Semua Level", label: "Semua Level" },
];

// Komponen Input Field generik
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
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && !isFile && (
        <Icon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
      {Icon && isFile && (
        <Icon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
      )}

      <input
        type={type}
        id={id}
        // Jika bukan file, gunakan value dari state. Input file tidak boleh dikontrol via value state.
        {...(!isFile && { value })}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm 
                    ${!isFile && Icon ? "pl-10" : ""} 
                    ${
                      isFile
                        ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        : ""
                    }
                `}
      />
      {isFile && (
        <p className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
          Pilih file...
        </p>
      )}
    </div>
  </div>
);

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "webinar",
    category: "",
    speaker: "",
    price: "Gratis",
    difficulty: "Pemula",
    tags: "",
    // Field untuk File
    eventImageFile: null,
    speakerImageFile: null,
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [id]: files[0], // Menyimpan objek File
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const finalData = {
      ...formData,
      tags: tagsArray,
      status: "upcoming",
      participants: 0,
      // Perhatikan, dalam aplikasi nyata, files akan dikirim via FormData API
      eventImageName: formData.eventImageFile
        ? formData.eventImageFile.name
        : "Tidak Ada File",
      speakerImageName: formData.speakerImageFile
        ? formData.speakerImageFile.name
        : "Tidak Ada File",
      // Menghapus objek File dari output konsol agar lebih bersih (opsional)
      eventImageFile: undefined,
      speakerImageFile: undefined,
    };

    console.log("Data Event Baru (Siap Dikirim):", finalData);

    // Simulasi pengiriman file (biasanya dengan FormData API)
    if (formData.eventImageFile) {
      console.log(
        `Mengunggah Gambar Event: ${formData.eventImageFile.name}, Tipe: ${formData.eventImageFile.type}`
      );
    }
    if (formData.speakerImageFile) {
      console.log(
        `Mengunggah Gambar Pembicara: ${formData.speakerImageFile.name}, Tipe: ${formData.speakerImageFile.type}`
      );
    }

    alert(
      "Event berhasil diproses! Cek konsol untuk data dan simulasi upload file."
    );

    // Reset formulir setelah submit
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "webinar",
      category: "",
      speaker: "",
      price: "Gratis",
      difficulty: "Pemula",
      tags: "",
      eventImageFile: null,
      speakerImageFile: null,
    });
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Navbar />
      {/* Header di tengah (menggantikan sidebar) */}
      <header className="mb-8 pt-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="w-8 h-8 text-indigo-600" />
          Buat Event Baru
        </h1>
        <p className="text-gray-500 mt-2">
          Masukkan detail event, termasuk media dan jadwal, kemudian
          publikasikan.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-strong border border-gray-100 space-y-8"
        >
          {/* Bagian 1: Detail Utama Event */}
          <div className="space-y-6 border-b pb-6">
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi Event (Max 300 Karakter){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan secara singkat dan menarik tentang event ini..."
                required={true}
                rows="3"
                maxLength={300}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tipe Event */}
              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipe Event <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  {eventTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kategori Event */}
              <FormInput
                label="Kategori"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Contoh: Literasi Digital"
                icon={Tag}
                required={true}
              />

              {/* Tingkat Kesulitan */}
              <div className="space-y-2">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tingkat Kesulitan <span className="text-red-500">*</span>
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  {difficulties.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bagian 2: Waktu, Biaya & Tags */}
          <div className="space-y-6 border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
              2. Jadwal & Tags
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="Tanggal Event"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                icon={Calendar}
                required={true}
              />
              <FormInput
                label="Waktu Event"
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                icon={Clock}
                required={true}
              />
              <FormInput
                label="Harga (Rp / Gratis)"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Contoh: Gratis atau Rp 250.000"
                icon={DollarSign}
                required={true}
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags (Pisahkan dengan koma)
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Contoh: Membaca Kritis, Digital Literacy, Fact-Checking"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">
                Pisahkan setiap tag dengan koma (contoh: #tag1, #tag2).
              </p>
            </div>
          </div>

          {/* Bagian 3: Pembicara & Media Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
              3. Pembicara & Media
            </h2>

            <FormInput
              label="Nama Pembicara"
              id="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="Contoh: Dr. Sarah Wijaya"
              icon={User}
              required={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upload Gambar Pembicara */}
              <FormInput
                label="Upload Foto Pembicara (JPG, PNG)"
                id="speakerImageFile"
                type="file"
                onChange={handleChange}
                icon={Upload}
                isFile={true}
              />

              {/* Upload Gambar Event Utama */}
              <FormInput
                label="Upload Poster Event Utama (Wajib)"
                id="eventImageFile"
                type="file"
                onChange={handleChange}
                icon={Upload}
                isFile={true}
                required={true}
              />
            </div>
            <div className="text-xs text-gray-500 italic mt-2">
              {formData.eventImageFile && (
                <span>
                  Poster Event terpilih: **{formData.eventImageFile.name}**
                </span>
              )}
              {formData.speakerImageFile && (
                <span>
                  {" "}
                  | Foto Pembicara terpilih: **{formData.speakerImageFile.name}
                  **
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <Send className="w-5 h-5" />
              Publikasikan Event
            </button>
          </div>
        </form>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default CreateEventPage;
