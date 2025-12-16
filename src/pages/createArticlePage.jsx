import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Edit } from "lucide-react"; // Hanya butuh ikon Edit untuk judul halaman

// Import React Quill dan gayanya
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Gaya default Quill (Snow theme)
import Footer from "../components/layout/Footer";

// Data dummy (dibiarkan seperti semula)
const categories = [
  { value: "digital-literacy", label: "Literasi Digital" },
  { value: "tech-review", label: "Ulasan Teknologi" },
  { value: "soft-skills", label: "Soft Skills" },
  { value: "mental-health", label: "Kesehatan Mental" },
];

const difficulties = [
  { value: "Pemula", label: "Pemula" },
  { value: "Menengah", label: "Menengah" },
  { value: "Mahir", label: "Mahir" },
];

const INITIAL_CONTENT = ""; // Konten awal kosong, Quill akan menangani placeholder/inisialisasi

// Definisikan toolbar kustom yang sesuai dengan permintaan Anda:
// Bold, Italic, Underline, List (Ordered/Unordered), dan Header (H1, H2, H3)
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header 1, 2, 3
    ["bold", "italic", "underline"], // Bold, Italic, Underline
    [{ list: "ordered" }, { list: "bullet" }], // Daftar Berurutan dan Tidak Berurutan
    // Anda dapat menambahkan lebih banyak, seperti 'link', 'blockquote', dll.
    ["clean"], // Tombol untuk menghapus format
  ],
};

const CreateArticlePage = () => {
  const navigate = useNavigate();

  // STATE UNTUK INPUT FORM BIASA
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    difficulty: "",
    tags: "",
    readTime: "",
  });

  // STATE KHUSUS UNTUK KONTEN ARTIKEL (Dikendalikan oleh ReactQuill)
  const [articleContent, setArticleContent] = useState(INITIAL_CONTENT);

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efek untuk placeholder (Opsional, Quill memiliki placeholder bawaan)
  // useEffect(() => { ... }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🚨 Konten diambil langsung dari state articleContent
    const content = articleContent;

    const submissionData = {
      ...formData,
      content: content, // HTML yang bersih dan stabil dari Quill
      coverImage: coverImageFile ? coverImageFile.name : "No Image Uploaded",
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    console.log("Data Artikel yang Dikirim:", submissionData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Artikel berhasil dibuat dan gambar disimulasikan untuk diunggah!");
      navigate("/");
    }, 2000);
  };

  // Komponen Input Field
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    required = true,
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
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
      )}
    </div>
  );

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
                rows="3"
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
              <InputField label="Kategori" name="category">
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
              <InputField label="Tingkat Kesulitan" name="difficulty">
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
              <InputField
                label="Perkiraan Waktu Baca"
                name="readTime"
                placeholder="Contoh: 5 min read"
              />
            </div>

            {/* Tags */}
            <InputField
              label="Tags (Dipisahkan koma)"
              name="tags"
              placeholder="Contoh: Literasi Digital, Hoaks, Verifikasi"
            />

            {/* EDITOR KONTEN ARTIKEL BARU MENGGUNAKAN REACT QUILL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten Artikel <span className="text-red-500">*</span>
              </label>

              {/* Komponen ReactQuill */}
              <div className="bg-white rounded-lg">
                <ReactQuill
                  theme="snow" // Tema dengan toolbar di atas
                  value={articleContent}
                  onChange={setArticleContent} // Mengupdate state konten artikel
                  modules={modules} // Menggunakan toolbar kustom yang kita definisikan
                  placeholder="Mulai tulis artikel Anda di sini..."
                  // Kelas untuk tinggi editor dan memastikan tidak terpotong oleh toolbar
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
