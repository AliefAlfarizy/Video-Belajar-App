import { useState } from 'react';
import CourseCard from '../molecules/CourseCard.jsx';

function CourseSection({ courses = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kelas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Semua Kelas', key: 'all' },
    { name: 'Pemasaran', key: 'Pemasaran' },
    { name: 'Desain', key: 'Desain' },
    { name: 'Pengembangan Diri', key: 'Pengembangan Diri' },
    { name: 'Bisnis', key: 'Bisnis' }
  ];

  // Logic to filter courses based on category AND search query
  const filteredCourses = courses.filter((course) => {
    // Category match
    const categoryMatches = 
      selectedCategory === 'Semua Kelas' || 
      course.title.toLowerCase().includes(selectedCategory.toLowerCase()) || 
      (course.jobTitle && course.jobTitle.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      // Handled manually or in metadata mapping
      (selectedCategory === 'Pemasaran' && course.title.toLowerCase().includes('auditor')) ||
      (selectedCategory === 'Desain' && course.title.toLowerCase().includes('design')) ||
      (selectedCategory === 'Bisnis' && (course.title.toLowerCase().includes('analyst') || course.title.toLowerCase().includes('management'))) ||
      (selectedCategory === 'Pengembangan Diri' && course.title.toLowerCase().includes('essential'));

    // Search query match
    const searchMatches = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatches && searchMatches;
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

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-10 gap-5 border-b border-gray-200/60 pb-3">
          
          {/* Category tabs */}
          <div className="flex justify-start space-x-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 items-center no-scrollbar flex-1 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.name)}
                className={`pb-3 text-sm sm:text-base font-semibold cursor-pointer border-b-2 transition-all duration-200 outline-none select-none ${
                  selectedCategory === cat.name
                    ? 'text-[#F64920] border-[#F64920]'
                    : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-2.5 pl-10 pr-4 text-sm text-gray-950 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-[#F64920] focus:border-[#F64920] outline-none shadow-sm focus:shadow-md transition-all placeholder-gray-400"
              placeholder="Cari kelas favorit Anda..."
            />
          </div>
        </div>

        {/* Courses Grid */}
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
            <p className="text-sm text-gray-400">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseSection;
