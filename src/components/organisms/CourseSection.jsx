import { useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../../services/api";
import ListView from "./ListView.jsx";

function CourseSection({ courses: propCourses }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");
  
  // Mengambil data dari Redux store menggunakan useSelector
  const reduxCourses = useSelector((state) => state.courses || []);
  const allCourses = propCourses && propCourses.length > 0 ? propCourses : reduxCourses;

  const categories = [
    { name: "Semua Kelas", key: "all" },
    { name: "Pemasaran", key: "Pemasaran" },
    { name: "Desain", key: "Desain" },
    { name: "Pengembangan Diri", key: "Pengembangan Diri" },
    { name: "Bisnis", key: "Bisnis" },
  ];

  const filteredCourses = allCourses.filter((course) => {
    return (
      selectedCategory === "Semua Kelas" ||
      course.title?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (course.jobTitle &&
        course.jobTitle.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (selectedCategory === "Pemasaran" &&
        course.title?.toLowerCase().includes("auditor")) ||
      (selectedCategory === "Desain" &&
        course.title?.toLowerCase().includes("design")) ||
      (selectedCategory === "Bisnis" &&
        (course.title?.toLowerCase().includes("analyst") ||
          course.title?.toLowerCase().includes("management"))) ||
      (selectedCategory === "Pengembangan Diri" &&
        course.title?.toLowerCase().includes("essential"))
    );
  });

  return (
    <section id="kelas" className="pt-20 pb-16 bg-bg-premium scroll-mt-20">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            Koleksi Video Pembelajaran Unggulan
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-medium">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Terbaik Kami!
          </p>
        </div>

        {/* Category */}
        <div className="flex justify-start space-x-6 overflow-x-auto whitespace-nowrap pb-3 mb-10 items-center no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 border-b border-gray-200/60">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.name)}
              className={`pb-3 text-sm sm:text-base font-semibold cursor-pointer border-b-2 transition-all duration-200 outline-none select-none ${
                selectedCategory === cat.name
                  ? "text-accent border-accent"
                  : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Courses ListView */}
        {filteredCourses.length > 0 ? (
          <ListView courses={filteredCourses} />
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-base font-bold text-gray-700 mb-1">
              Tidak Ada Kelas Ditemukan
            </h3>
            <p className="text-sm text-gray-400">Coba pilih kategori lain.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseSection;
