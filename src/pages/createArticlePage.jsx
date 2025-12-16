import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Edit } from "lucide-react";

// Import React Quill dan gayanya
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../components/layout/Footer";
import axios from "axios";

// Data dummy (dibiarkan seperti semula)
const categories = [
  { value: "digital-literacy", label: "Literasi Digital" },
  { value: "critical-thinking", label: "Berpikir Kritis" },
  { value: "reading-tech", label: "Teknik Membaca" },
  { value: "skill-research", label: "Skill Research" },
  { value: "fact-checking", label: "Fact Checking" },
];

const difficulties = [
  { value: "Pemula", label: "Pemula" },
  { value: "Menengah", label: "Menengah" },
  { value: "Mahir", label: "Mahir" },
];

// ***************************************************************
// ID PENULIS (SIMULASI): Karena Anda menggunakan token dan backend
// seharusnya mengambil ID dari token, konstanta ini tidak diperlukan
// dan dihapus.
// ***************************************************************

const INITIAL_CONTENT = "";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  children,
}) => (
  <div className="mb-6">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {children ? (
      children
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
      />
    )}
  </div>
);

const CreateArticlePage = () => {
  const navigate = useNavigate();

  // STATE UNTUK INPUT FORM BIASA
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    difficulty: "",
    tags: "",
    readTime: "", // Akan menjadi angka (menit)
  });

  // STATE KHUSUS UNTUK KONTEN ARTIKEL
  const [articleContent, setArticleContent] = useState(INITIAL_CONTENT);

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    } else {
      setCoverImageFile(null);
      setCoverImagePreview(null);
    }
  };

  // ***************************************************************
  // FUNGSI SUBMIT DENGAN PANGGILAN API UNTUK SIMPAN KE DATABASE
  // ***************************************************************
  const token = localStorage.getItem("mindloop_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!articleContent || articleContent === "<p><br></p>") {
      alert("Konten artikel tidak boleh kosong");
      setIsSubmitting(false);
      return;
    }

    if (!formData.readTime || Number(formData.readTime) <= 0) {
      alert("Waktu baca harus lebih dari 0 menit");
      setIsSubmitting(false);
      return;
    }

    if (!formData.title.trim()) {
      alert("Judul artikel wajib diisi");
      setIsSubmitting(false);
      return;
    }

    if (!formData.category) {
      alert("Kategori wajib dipilih");
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      alert("Silakan login terlebih dahulu");
      setIsSubmitting(false);
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const formDataPayload = new FormData();

      // Data form lainnya
      formDataPayload.append("nama_artikel", formData.title);
      formDataPayload.append("deskripsi", formData.excerpt);
      formDataPayload.append("kategori", formData.category);
      formDataPayload.append("kesulitan", formData.difficulty);
      formDataPayload.append(
        "perkiraan_waktu_menit",
        Number(formData.readTime)
      );
      formDataPayload.append("isi_artikel", articleContent);
      // Tags dikirim dalam format JSON string
      formDataPayload.append("tags", JSON.stringify(tagsArray));

      // ⬅️ WAJIB sama dengan multer.single("gambar")
      if (coverImageFile) {
        formDataPayload.append("gambar", coverImageFile);
      }

      const response = await axios.post(
        "http://localhost:3000/api/article/create-article",
        formDataPayload,
        {
          headers: {
            // Penting: Tidak perlu set 'Content-Type': 'multipart/form-data',
            // karena axios/browser akan otomatis melakukannya saat menggunakan FormData
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Artikel berhasil dibuat!`);
      navigate("/");
    } catch (error) {
      console.error("Gagal publikasi:", error);

      const message =
        error.response?.data?.message || error.message || "Terjadi kesalahan";

      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <Navbar />
        <div className="container-optimized max-w-4xl">
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-strong border border-gray-100">
            <header className="mb-8 border-b pb-4">
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <Edit className="w-8 h-8 text-indigo-600" />
                Tulis Artikel Baru
              </h1>
              <p className="text-gray-500 mt-2">
                Bagikan wawasan dan pengetahuan Anda kepada komunitas MindLoop.
              </p>
            </header>

            <form onSubmit={handleSubmit}>
              {/* Input Fields */}
              <InputField
                label="Judul Artikel"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: 5 Cara Meningkatkan Literasi Digital..."
              />
              <div className="mb-6">
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ringkasan Singkat (Excerpt){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Jelaskan artikel Anda dalam satu atau dua kalimat."
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                ></textarea>
              </div>

              {/* Gambar Cover (Tetap sama) */}
              <div className="mb-6">
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Unggah Gambar Utama (Cover Image)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {coverImagePreview && (
                    <img
                      src={coverImagePreview}
                      alt="Pratinjau Cover"
                      className="w-full sm:w-32 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                </div>
              </div>

              {/* Kategori, Kesulitan, Waktu Baca */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Kategori" name="category" required={true}>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                  >
                    <option value="" disabled>
                      Pilih Kategori
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </InputField>
                <InputField
                  label="Tingkat Kesulitan"
                  name="difficulty"
                  required={true}
                >
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                  >
                    <option value="" disabled>
                      Pilih Tingkat
                    </option>
                    {difficulties.map((diff) => (
                      <option key={diff.value} value={diff.value}>
                        {diff.label}
                      </option>
                    ))}
                  </select>
                </InputField>
                {/* PERBAIKAN: Menggunakan type="number" untuk readTime */}
                <InputField
                  label="Perkiraan Waktu Baca (Menit)"
                  name="readTime"
                  type="number"
                  placeholder="Contoh: 5"
                  value={formData.readTime}
                  onChange={handleChange}
                />
              </div>

              {/* Tags */}
              <InputField
                label="Tags (Dipisahkan koma)"
                name="tags"
                placeholder="Contoh: Literasi Digital, Hoaks"
                required={false}
                value={formData.tags}
                onChange={handleChange}
              />

              {/* EDITOR KONTEN ARTIKEL BARU MENGGUNAKAN REACT QUILL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konten Artikel <span className="text-red-500">*</span>
                </label>

                {/* Komponen ReactQuill */}
                <div className="bg-white rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={articleContent}
                    onChange={setArticleContent}
                    modules={modules}
                    placeholder="Mulai tulis artikel Anda di sini..."
                    className="h-96 pb-12"
                  />
                </div>
                <p className="mt-16 text-xs text-gray-500">
                  Editor ini stabil dan menghasilkan HTML yang bersih, mendukung
                  Bold, Italic, Underline, Lists, dan Header 1-3.
                </p>
              </div>

              {/* Tombol Submit */}
              <div className="pt-4 border-t mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 text-lg font-semibold leading-6 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memproses...
                    </div>
                  ) : (
                    "Publikasikan Artikel"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateArticlePage;
