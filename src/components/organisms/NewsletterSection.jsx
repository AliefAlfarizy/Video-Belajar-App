import backgroundNewsletter from '../../assets/images/background newsletter.jpg';

function NewsletterSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Terima kasih! Anda berhasil berlangganan newsletter VideoBelajar.');
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto">
      <div 
        className="relative bg-cover bg-center rounded-2xl py-20 px-6 text-center w-full overflow-hidden shadow-lg border border-gray-800/10"
        style={{ backgroundImage: `url(${backgroundNewsletter})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-2xl mx-auto flex flex-col items-center z-10 text-white">
          <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-2 select-none">
            NEWSLETTER
          </span>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
            Mau Belajar Lebih Banyak?
          </h2>
          
          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl mb-8 font-light">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik Harisenin.id
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-3">
            <div className="relative w-full">
              <input
                type="email"
                required
                placeholder="Masukkan Email"
                className="w-full pr-5 sm:pr-28 px-5 py-3 rounded-lg bg-white text-gray-950 placeholder:text-center sm:placeholder:text-left placeholder-gray-400 text-center sm:text-left text-xs sm:text-sm outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
              />

              <button
                type="submit"
                className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary-hover text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer select-none outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                Subscribe
              </button>
            </div>

            <button
              type="submit"
              className="sm:hidden bg-secondary hover:bg-secondary-hover text-white px-5 py-3 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer select-none outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
