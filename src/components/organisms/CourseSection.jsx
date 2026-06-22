import { useState } from 'react';
import CourseCard from '../molecules/CourseCard.jsx';



function CourseSection({ courses = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kelas');


  const categories = [
    { name: 'Semua Kelas', key: 'all' },
    { name: 'Pemasaran', key: 'Pemasaran' },
    { name: 'Desain', key: 'Desain' },
    { name: 'Pengembangan Diri', key: 'Pengembangan Diri' },
    { name: 'Bisnis', key: 'Bisnis' }
  ];

  const filteredCourses = courses.filter((course) => {
    return (
      selectedCategory === 'Semua Kelas' ||
      course.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (course.jobTitle && course.jobTitle.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (selectedCategory === 'Pemasaran' && course.title.toLowerCase().includes('auditor')) ||
      (selectedCategory === 'Desain' && course.title.toLowerCase().includes('design')) ||
      (selectedCategory === 'Bisnis' && (course.title.toLowerCase().includes('analyst') || course.title.toLowerCase().includes('management'))) ||
      (selectedCategory === 'Pengembangan Diri' && course.title.toLowerCase().includes('essential'))
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
                  ? 'text-accent border-accent'
                  : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>


        {/* Courses */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
            {filteredCourses.map((course) => (
              <div key={course.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-base font-bold text-gray-700 mb-1">Tidak Ada Kelas Ditemukan</h3>
            <p className="text-sm text-gray-400">Coba pilih kategori lain.</p>
          </div>
        )}
      </div>
    </section>
  );
}



export default CourseSection;
