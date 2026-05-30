import backgroundOverlay from '../../assets/images/background_overlay.jpg';

function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center py-20 sm:py-24 rounded-2xl overflow-hidden w-full max-w-300 mx-auto mt-6 md:mt-10 shadow-lg text-center"
      style={{ backgroundImage: `url(${backgroundOverlay})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 px-6 sm:px-12 md:px-16 text-white flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight sm:leading-[1.15]">
          Revolusi Pembelajaran: Temukan<br className="hidden sm:inline" /> Ilmu Baru melalui Platform Video<br className="hidden sm:inline" /> Interaktif!
        </h1>
        
        <p className="text-gray-200 mb-8 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light">
          Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
        </p>

        <a
          href="#kelas"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-bold transition-all shadow-md select-none outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-xs sm:text-sm cursor-pointer"
        >
          Temukan Video Course untuk Dipelajari!
        </a>
      </div>
    </section>
  );
}


export default HeroSection;
