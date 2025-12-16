import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpenText, 
    Plus, 
    Trash2, 
    ListChecks, 
    Image, 
    Trophy,
    AlertCircle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar'; // Pastikan path ini benar
import Footer from '../components/layout/Footer';

// Data referensi untuk dropdown
const CATEGORIES = [
    { value: 'digital-literacy', label: 'Literasi Digital' },
    { value: 'fact-checking', label: 'Fact-Checking' },
    { value: 'reading-techniques', label: 'Teknik Membaca' },
    { value: 'critical-thinking', label: 'Berpikir Kritis' },
];

const DIFFICULTIES = [
    { value: 'easy', label: 'Pemula' },
    { value: 'medium', label: 'Menengah' },
    { value: 'hard', label: 'Lanjutan' },
];

const initialQuestionState = {
    question: '',
    options: ['', '', '', ''], // 4 pilihan
    correctAnswer: 0, // 0-based index (0, 1, 2, atau 3)
    explanation: '',
    learningTips: '',
    relatedConcepts: '', // Dipisahkan koma
    difficulty: 'easy',
    timeLimit: 30, // Dalam detik
};

const initialQuizState = {
    title: '',
    description: '',
    category: CATEGORIES[0].value,
    image: '', // Tetap dipertahankan, tapi nilainya akan diset dari file.name jika ada
    tags: '',
};

const CreateQuizPage = () => {
    const navigate = useNavigate();
    const [quizMetadata, setQuizMetadata] = useState(initialQuizState);
    const [questions, setQuestions] = useState([initialQuestionState]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🚨 STATE BARU UNTUK GAMBAR COVER DAN PREVIEW
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);

    // --- HANDLER METADATA ---
    const handleMetadataChange = (e) => {
        const { name, value } = e.target;
        setQuizMetadata(prev => ({ ...prev, [name]: value }));
    };

    // 🚨 HANDLER BARU UNTUK UPLOAD FILE GAMBAR COVER
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            // Membuat URL lokal untuk pratinjau
            setCoverImagePreview(URL.createObjectURL(file)); 
            // Opsional: set nama file ke metadata.image (untuk simulasi backend)
            setQuizMetadata(prev => ({ ...prev, image: file.name })); 
        } else {
            setCoverImageFile(null);
            setCoverImagePreview(null);
            setQuizMetadata(prev => ({ ...prev, image: '' }));
        }
    };

    // --- HANDLER PERTANYAAN (TIDAK BERUBAH) ---
    const handleAddQuestion = () => {
        setQuestions(prev => [...prev, initialQuestionState]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index, name, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [name]: value };
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    // --- SUBMIT FINAL ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const finalQuestions = questions.map((q, index) => ({
            id: index + 1, 
            question: q.question,
            options: q.options.filter(o => o.trim() !== ''),
            correctAnswer: Number(q.correctAnswer),
            explanation: q.explanation,
            learningTips: q.learningTips,
            relatedConcepts: q.relatedConcepts.split(',').map(c => c.trim()).filter(c => c.length > 0),
            category: q.category || quizMetadata.category,
            difficulty: q.difficulty,
            tags: quizMetadata.tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
            timeLimit: Number(q.timeLimit)
        }));

        // Logika pengiriman file: Di aplikasi nyata, 'coverImageFile' akan dikirim
        // melalui FormData ke endpoint upload, dan backend akan mengembalikan URL
        // yang kemudian disimpan di 'metadata.image'. Di sini kita hanya mensimulasikannya.
        const finalQuizData = {
            metadata: {
                id: Math.floor(Math.random() * 1000) + 100, 
                title: quizMetadata.title,
                description: quizMetadata.description,
                category: quizMetadata.category,
                // Menggunakan nama file untuk simulasi URL/nama file yang diunggah
                image: coverImageFile ? coverImageFile.name : null, 
                tags: quizMetadata.tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
            },
            questions: finalQuestions,
            // File gambar (Hanya untuk referensi di client, tidak dikirim langsung dalam JSON ini)
            // coverFile: coverImageFile 
        };

        console.log("DATA KUIS FINAL (Siap Kirim ke Backend):", finalQuizData);
        if (coverImageFile) {
            console.log("FILE GAMBAR YANG AKAN DIUNGGAH:", coverImageFile);
        }

        // Simulasi pengiriman data
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Kuis "${quizMetadata.title}" berhasil dibuat dengan ${questions.length} pertanyaan! Lihat di console untuk detail data.`);
            navigate('/quiz');
        }, 1500);
    };


    // --- SUB-KOMPONEN INPUT FIELDS (TIDAK BERUBAH) ---
    const InputField = ({ label, name, value, onChange, placeholder, type = 'text', required = true, children }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children ? children : (
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
    
    // --- KOMPONEN FORMULIR PERTANYAAN (TIDAK BERUBAH) ---
    const QuestionForm = ({ questionData, index }) => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6 relative">
            
            <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <ListChecks className="w-5 h-5"/> Pertanyaan #{index + 1}
            </h3>

            {questions.length > 1 && (
                <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Hapus Pertanyaan Ini"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teks Pertanyaan <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={questionData.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    placeholder="Masukkan pertanyaan kuis di sini..."
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                ></textarea>
            </div>

            <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-gray-700">Pilihan Jawaban (Options)</p>
                {questionData.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full text-xs font-semibold">
                            {String.fromCharCode(65 + oIndex)}
                        </span>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                            placeholder={`Pilihan ${oIndex + 1}`}
                            required
                            className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                                questionData.correctAnswer === oIndex 
                                ? 'border-green-500 ring-1 ring-green-500 bg-green-50' 
                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                        />
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <InputField label="Jawaban Benar" name="correctAnswer" required={false}>
                    <select
                        value={questionData.correctAnswer}
                        onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                    >
                        {questionData.options.map((_, oIndex) => (
                            <option key={oIndex} value={oIndex}>
                                {String.fromCharCode(65 + oIndex)}
                            </option>
                        ))}
                    </select>
                </InputField>

                <InputField label="Batas Waktu (Detik)" name="timeLimit" type="number" required={true}>
                    <input
                        type="number"
                        min="10"
                        max="180"
                        value={questionData.timeLimit}
                        onChange={(e) => handleQuestionChange(index, 'timeLimit', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </InputField>
                
                <InputField label="Tingkat Kesulitan" name="difficulty" required={false}>
                    <select
                        value={questionData.difficulty}
                        onChange={(e) => handleQuestionChange(index, 'difficulty', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                    >
                        {DIFFICULTIES.map(diff => (
                            <option key={diff.value} value={diff.value}>{diff.label}</option>
                        ))}
                    </select>
                </InputField>
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-500"/> Penjelasan Jawaban (Explanation) <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={questionData.explanation}
                    onChange={(e) => handleQuestionChange(index, 'explanation', e.target.value)}
                    placeholder="Jelaskan mengapa jawaban tersebut benar. Ini akan ditampilkan setelah kuis selesai."
                    required
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-indigo-500"/> Tips Belajar Terkait (Learning Tips)
                </label>
                <textarea
                    value={questionData.learningTips}
                    onChange={(e) => handleQuestionChange(index, 'learningTips', e.target.value)}
                    placeholder="Tambahkan tips atau insight terkait konsep ini."
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                ></textarea>
            </div>
            
            <InputField
                label="Konsep Terkait (Pisahkan koma)"
                name="relatedConcepts"
                value={questionData.relatedConcepts}
                onChange={(e) => handleQuestionChange(index, 'relatedConcepts', e.target.value)}
                placeholder="misal: Verifikasi Visual, Literasi Media Sosial"
                required={false}
            />

        </div>
    );


    return (
    <>
        <div className="min-h-screen bg-gray-50 pt-16 pb-12">
            
            <Navbar />

            <div className="container-optimized max-w-5xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                        <BookOpenText className="w-8 h-8 text-indigo-600" />
                        Buat Kuis Baru
                    </h1>
                    <p className="text-gray-500 mt-2">Definisikan metadata dan pertanyaan untuk kuis interaktif Anda.</p>
                </header>

                <form onSubmit={handleSubmit}>
                    
                    {/* --- BAGIAN 1: METADATA KUIS --- */}
                    <div className="bg-white p-8 rounded-xl shadow-strong border border-indigo-100 mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center gap-2">
                           <Image className='w-5 h-5 text-indigo-500' /> Detail & Metadata Kuis
                        </h2>
                        
                        <InputField
                            label="Judul Kuis"
                            name="title"
                            value={quizMetadata.title}
                            onChange={handleMetadataChange}
                            placeholder="Contoh: Tes Literasi Digital Tingkat Menengah"
                        />

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi Kuis <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={quizMetadata.description}
                                onChange={handleMetadataChange}
                                placeholder="Jelaskan tujuan kuis ini dalam satu atau dua kalimat."
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            ></textarea>
                        </div>
                        
                        {/* 🚨 BLOK UNGGAH GAMBAR BARU */}
                        <div className="mb-6">
                            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                                Unggah Gambar Cover (Opsional)
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
                                        alt="Pratinjau Cover Kuis" 
                                        className="w-full sm:w-32 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0 mt-2 sm:mt-0"
                                    />
                                )}
                            </div>
                            {/* Menghilangkan input URL gambar yang lama */}
                        </div>
                        {/* 🚨 AKHIR BLOK UNGGAH GAMBAR BARU */}


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Kategori" name="category" required={true}>
                                <select
                                    id="category"
                                    name="category"
                                    value={quizMetadata.category}
                                    onChange={handleMetadataChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </InputField>
                            
                            <InputField
                                label="Tags (Dipisahkan koma)"
                                name="tags"
                                value={quizMetadata.tags}
                                onChange={handleMetadataChange}
                                placeholder="misal: fact-checking, verifikasi, hoaks"
                                required={false}
                            />
                        </div>
                    </div>


                    {/* --- BAGIAN 2: PERTANYAAN KUIS --- */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                        <span><ListChecks className='w-6 h-6 inline mr-2 text-indigo-600'/> Daftar Pertanyaan ({questions.length})</span>
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                        >
                            <Plus className="w-5 h-5"/> Tambah Pertanyaan
                        </button>
                    </h2>

                    <div className="space-y-6">
                        {questions.map((q, index) => (
                            <QuestionForm key={index} questionData={q} index={index} />
                        ))}
                    </div>

                    <div className="pt-8 mt-10 border-t">
                        <button
                            type="submit"
                            disabled={isSubmitting || questions.length === 0}
                            className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-semibold leading-6 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan Kuis...
                                </div>
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