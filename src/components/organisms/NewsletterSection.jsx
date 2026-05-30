import backgroundNewsletter from '../../assets/images/background newsletter.jpg';
import ToastContainer from '../atoms/ToastContainer';
import useToast from '../../hooks/useToast';

function NewsletterSection() {
  const { toasts, showToast, removeToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Berhasil Berlangganan!',
      message: 'Terima kasih! Kamu akan mendapat info terbaru dari VideoBelajar.',
      duration: 4000,
    });
    e.target.reset();
  };

  return (
    <section
      className="relative bg-cover bg-center py-20 sm:py-24 rounded-2xl overflow-hidden w-full max-w-300 mx-auto mt-6 md:mt-10 shadow-lg text-center"
      style={{ backgroundImage: `url(${backgroundNewsletter})` }}
    >
      <ToastContainer toasts={toasts} onClose={removeToast} />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 px-6 sm:px-12 md:px-16 text-white flex flex-col items-center max-w-4xl mx-auto">
        <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-2 select-none">
          NEWSLETTER
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4">
          Mau Belajar Lebih Banyak?
        </h2>

        <p className="text-gray-200 mb-8 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light">
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
    </section>
  );
}


export default NewsletterSection;
