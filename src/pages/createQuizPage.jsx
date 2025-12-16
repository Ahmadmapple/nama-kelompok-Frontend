import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpenText,
  Plus,
  Trash2,
  ListChecks,
  Image,
  Trophy,
  AlertCircle,
  Sliders, // Ikon untuk Kesulitan
  Clock, // Ikon baru untuk Batas Waktu
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";

// --- KONSTANTA ---

const API_URL = "http://localhost:3000/api/kuis/create-kuis";

const CATEGORIES = [
  { value: "digital-literacy", label: "Literasi Digital" },
  { value: "fact-checking", label: "Fact-Checking" },
  { value: "reading-techniques", label: "Teknik Membaca" },
  { value: "skill-research", label: "Skill Research" },
  { value: "critical-thinking", label: "Berpikir Kritis" },
];

const DIFFICULTIES = [
  { value: "easy", label: "Pemula" },
  { value: "medium", label: "Menengah" },
  { value: "hard", label: "Lanjutan" },
];

const initialQuestionState = {
  id: "", // Untuk key dan manipulasi state
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0, // Indeks (0, 1, 2, atau 3)
  explanation: "",
  learningTips: "",
  relatedConcepts: "", // String, diparsing saat submit
  difficulty: "easy",
  timeLimit: 30, // Dalam detik
};

const initialQuizState = {
  title: "",
  description: "",
  category: CATEGORIES[0].value,
  image: "", // Nama file/URL gambar cover
  tags: "", // String, diparsing saat submit
  difficulty: DIFFICULTIES[0].value,
  // totalTime dihapus karena waktu diatur per pertanyaan (timeLimit)
};

// --- KOMPONEN UTAMA ---

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [quizMetadata, setQuizMetadata] = useState(initialQuizState);
  const [questions, setQuestions] = useState([
    {
      ...initialQuestionState,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);

  // Fungsi untuk menghasilkan ID unik
  const generateUniqueId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  // Cleanup object URL untuk menghindari kebocoran memori
  useEffect(() => {
    return () => {
      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  // --- HANDLER MEMOIZED ---

  const handleQuestionChange = useCallback((id, name, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [name]: value } : q))
    );
  }, []);

  const handleOptionChange = useCallback((qId, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === qId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === oIndex ? value : option
              ),
            }
          : question
      )
    );
  }, []);

  const handleAddQuestion = useCallback(() => {
    const newQuestion = {
      ...initialQuestionState,
      id: generateUniqueId(),
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }, []);

  const handleRemoveQuestion = useCallback((idToRemove) => {
    setQuestions((prev) => prev.filter((q) => q.id !== idToRemove));
  }, []);

  const handleMetadataChange = useCallback((e) => {
    const { name, value } = e.target;
    setQuizMetadata((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];

      // Cleanup pratinjau lama
      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }

      if (file) {
        setCoverImageFile(file);
        setCoverImagePreview(URL.createObjectURL(file));
        setQuizMetadata((prev) => ({ ...prev, image: file.name }));
      } else {
        setCoverImageFile(null);
        setCoverImagePreview(null);
        setQuizMetadata((prev) => ({ ...prev, image: "" }));
      }
    },
    [coverImagePreview]
  );

  // --- VALIDASI & SUBMIT ---

  const validateForm = () => {
    setSubmissionError(null);

    if (!coverImageFile) {
      setSubmissionError("Silakan unggah gambar cover kuis terlebih dahulu.");
      return false;
    }

    if (questions.length === 0) {
      setSubmissionError("Kuis harus memiliki setidaknya 1 pertanyaan!");
      return false;
    }

    if (!quizMetadata.title.trim() || !quizMetadata.description.trim()) {
      setSubmissionError("Judul dan Deskripsi kuis harus diisi.");
      return false;
    }

    // Validasi setiap pertanyaan
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setSubmissionError(`Pertanyaan #${i + 1}: Teks pertanyaan wajib diisi.`);
        return false;
      }
      if (q.options.some((o) => !o.trim())) {
        setSubmissionError(
          `Pertanyaan #${i + 1}: Semua 4 pilihan jawaban wajib diisi.`
        );
        return false;
      }
      if (!q.explanation.trim()) {
        setSubmissionError(`Pertanyaan #${i + 1}: Penjelasan jawaban wajib diisi.`);
        return false;
      }
      if (Number(q.timeLimit) <= 0) {
        setSubmissionError(
          `Pertanyaan #${i + 1}: Batas waktu harus lebih dari 0 detik.`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert(submissionError);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Siapkan data pertanyaan
      const finalQuestions = questions.map((q) => ({
        question: q.question,
        options: q.options.filter((o) => o.trim() !== ""), // Filter out empty options just in case
        correctAnswer: Number(q.correctAnswer),
        explanation: q.explanation,
        learningTips: q.learningTips,
        // Konversi string koma menjadi array of string
        relatedConcepts: q.relatedConcepts
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
        difficulty: q.difficulty,
        timeLimit: Number(q.timeLimit),
      }));

      // 2. Metadata kuis
      const metadata = {
        title: quizMetadata.title,
        description: quizMetadata.description,
        category: quizMetadata.category,
        difficulty: quizMetadata.difficulty, // Kesulitan kuis keseluruhan
        // Konversi string koma menjadi array of string
        tags: quizMetadata.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        tips: "", // Jika ada field tips global
      };

      // 3. Buat FormData
      const formData = new FormData();
      formData.append("metadata", JSON.stringify(metadata));
      formData.append("questions", JSON.stringify(finalQuestions));
      formData.append("gambar", coverImageFile); // Nama field harus sesuai backend: 'gambar'

      // 4. Kirim ke backend
      const token = localStorage.getItem("mindloop_token");
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("RESPON BACKEND:", response.data);
      alert(`Kuis "${metadata.title}" berhasil dibuat!`);
      navigate("/quiz"); // Arahkan ke halaman daftar kuis
    } catch (error) {
      console.error("Gagal membuat kuis:", error.response || error.message);
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan saat membuat kuis.";
      setSubmissionError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER KOMPONEN ---

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <Navbar />

        <div className="container-optimized max-w-5xl mx-auto mt-10 px-4">
          <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <BookOpenText className="w-8 h-8 text-indigo-600" />
              Buat Kuis Baru
            </h1>
            <p className="text-gray-500 mt-2">
              Definisikan metadata dan pertanyaan untuk kuis interaktif Anda.
            </p>
            {submissionError && (
              <div
                className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-100"
                role="alert"
              >
                <span className="font-medium">Kesalahan:</span>{" "}
                {submissionError}
              </div>
            )}
          </header>

          <form onSubmit={handleSubmit}>
            {/* METADATA KUIS */}
            <div className="bg-white p-8 rounded-xl shadow-strong border border-indigo-100 mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-indigo-500" />
                Detail & Metadata Kuis
              </h2>

              {/* JUDUL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Kuis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={quizMetadata.title}
                  onChange={handleMetadataChange}
                  placeholder="Contoh: Tes Literasi Digital Tingkat Menengah"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
                />
              </div>

              {/* DESKRIPSI */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kuis <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={quizMetadata.description}
                  onChange={handleMetadataChange}
                  placeholder="Jelaskan tujuan kuis ini dalam satu atau dua kalimat."
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-vertical"
                />
              </div>

              {/* COVER IMAGE */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Unggah Gambar Cover <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-200"
                  />
                  {coverImagePreview && (
                    <img
                      src={coverImagePreview}
                      alt="Pratinjau Cover"
                      className="w-32 h-20 object-cover rounded-lg border-2 border-gray-200 flex-shrink-0 shadow-sm"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={quizMetadata.category}
                    onChange={handleMetadataChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 2. Kesulitan Kuis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kesulitan Kuis <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="difficulty"
                    value={quizMetadata.difficulty}
                    onChange={handleMetadataChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff.value} value={diff.value}>
                        {diff.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 3. Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={quizMetadata.tags}
                    onChange={handleMetadataChange}
                    placeholder="fact-checking, verifikasi, hoaks"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  />
                </div>
              </div>
            </div>

            {/* PERTANYAAN KUIS */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <ListChecks className="w-7 h-7 text-indigo-600" />
                  Daftar Pertanyaan ({questions.length})
                </h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Pertanyaan
                </button>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-3">
                        <ListChecks className="w-6 h-6" />
                        Pertanyaan #{index + 1}
                      </h3>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105"
                          title="Hapus Pertanyaan"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* TEKS PERTANYAAN */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Teks Pertanyaan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            question.id,
                            "question",
                            e.target.value
                          )
                        }
                        placeholder="Masukkan pertanyaan kuis di sini..."
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-vertical text-lg"
                      />
                    </div>

                    {/* OPTIONS */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Pilihan Jawaban <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-start gap-4">
                            <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-xl text-lg mt-1">
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  oIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Pilihan ${oIndex + 1}`}
                              className={`flex-1 px-4 py-3 border-2 rounded-xl transition-all duration-200 text-lg ${
                                question.correctAnswer === oIndex
                                  ? "border-green-500 bg-green-50 shadow-md"
                                  : "border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              }`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QUICK CONTROLS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jawaban Benar
                        </label>
                        <select
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "correctAnswer",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-medium"
                        >
                          {question.options.map((_, oIndex) => (
                            <option key={oIndex} value={oIndex}>
                              {String.fromCharCode(65 + oIndex)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          Batas Waktu (detik)
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="300"
                          value={question.timeLimit}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "timeLimit",
                              Number(e.target.value)
                            )
                          }
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Sliders className="w-4 h-4 text-indigo-500" />
                          Kesulitan
                        </label>
                        <select
                          value={question.difficulty}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "difficulty",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-medium"
                        >
                          {DIFFICULTIES.map((diff) => (
                            <option key={diff.value} value={diff.value}>
                              {diff.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* EXPLANATION */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Penjelasan Jawaban <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) =>
                          handleQuestionChange(
                            question.id,
                            "explanation",
                            e.target.value
                          )
                        }
                        placeholder="Jelaskan mengapa jawaban tersebut benar dan berikan insight..."
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-vertical"
                      />
                    </div>

                    {/* LEARNING TIPS */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        Tips Belajar
                      </label>
                      <textarea
                        value={question.learningTips}
                        onChange={(e) =>
                          handleQuestionChange(
                            question.id,
                            "learningTips",
                            e.target.value
                          )
                        }
                        placeholder="Berikan tips praktis untuk memahami konsep ini..."
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-vertical"
                      />
                    </div>

                    {/* RELATED CONCEPTS */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Konsep Terkait (pisahkan koma)
                      </label>
                      <input
                        type="text"
                        value={question.relatedConcepts}
                        onChange={(e) =>
                          handleQuestionChange(
                            question.id,
                            "relatedConcepts",
                            e.target.value
                          )
                        }
                        placeholder="Verifikasi Visual, Literasi Media, Hoaks"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-12 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting || questions.length === 0}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-2xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Menyimpan Kuis...
                  </>
                ) : (
                  `Simpan dan Publikasikan Kuis (${questions.length} Pertanyaan)`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateQuizPage;