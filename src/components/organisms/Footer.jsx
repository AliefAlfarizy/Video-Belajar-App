import { useState } from 'react';
import logoImage from '../../assets/images/Logo-footer.png';

function Footer() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const categories = [
    { name: 'Digital & Teknologi', link: '#' },
    { name: 'Pemasaran', link: '#' },
    { name: 'Manajemen Bisnis', link: '#' },
    { name: 'Pengembangan Diri', link: '#' },
    { name: 'Desain', link: '#' },
  ];

  const company = [
    { name: 'Tentang Kami', link: '#' },
    { name: 'FAQ', link: '#' },
    { name: 'Kebijakan Privasi', link: '#' },
    { name: 'Ketentuan Layanan', link: '#' },
    { name: 'Bantuan', link: '#' },
  ];

  const community = [
    { name: 'Tips Sukses', link: '#' },
    { name: 'Blog', link: '#' },
  ];

  const socialIcons = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-white text-gray-700 pt-12 pb-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── DESKTOP FOOTER ── */}
        <div className="hidden md:flex md:flex-row gap-12 mb-10">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-3 min-w-[200px] max-w-[240px]">
            <img
              src={logoImage}
              alt="Logo VideoBelajar"
              className="h-7 w-auto object-contain object-left"
            />
            <p className="font-semibold text-sm text-gray-800 leading-snug mt-1">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
            </p>
            <p className="text-sm text-gray-500">
              Jl. Usman Effendi No. 50 Lowokwaru, Malang
            </p>
            <p className="text-sm text-gray-500">+62-877-7123-1234</p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Column 2: Kategori */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-800">Kategori</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <a href={cat.link} className="hover:text-orange-500 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Perusahaan */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-800">Perusahaan</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              {company.map((co, idx) => (
                <li key={idx}>
                  <a href={co.link} className="hover:text-orange-500 transition-colors">
                    {co.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Komunitas */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-800">Komunitas</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              {community.map((comm, idx) => (
                <li key={idx}>
                  <a href={comm.link} className="hover:text-orange-500 transition-colors">
                    {comm.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── MOBILE FOOTER ── */}
        <div className="md:hidden flex flex-col mb-8 gap-1">
          {/* Brand info */}
          <div className="flex flex-col gap-2 mb-6">
            <img src={logoImage} alt="Logo VideoBelajar" className="h-6 w-auto object-contain object-left mb-3" />
            <p className="font-bold text-sm text-gray-800 leading-snug">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
            </p>
            <p className="text-xs text-gray-500">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
            <p className="text-xs text-gray-500">+62-877-7123-1234</p>
          </div>

          {/* Accordion: Kategori */}
          <div className="border-b border-gray-100 py-3">
            <button
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between font-bold text-sm text-gray-800 outline-none cursor-pointer"
            >
              <span>Kategori</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${activeAccordion === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {activeAccordion === 1 && (
              <ul className="flex flex-col gap-2 mt-3 text-sm text-gray-500 pl-1">
                {categories.map((cat, idx) => (
                  <li key={idx}><a href={cat.link} className="hover:text-orange-500 transition-colors">{cat.name}</a></li>
                ))}
              </ul>
            )}
          </div>

          {/* Accordion: Perusahaan */}
          <div className="border-b border-gray-100 py-3">
            <button
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between font-bold text-sm text-gray-800 outline-none cursor-pointer"
            >
              <span>Perusahaan</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${activeAccordion === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {activeAccordion === 2 && (
              <ul className="flex flex-col gap-2 mt-3 text-sm text-gray-500 pl-1">
                {company.map((co, idx) => (
                  <li key={idx}><a href={co.link} className="hover:text-orange-500 transition-colors">{co.name}</a></li>
                ))}
              </ul>
            )}
          </div>

          {/* Accordion: Komunitas */}
          <div className="border-b border-gray-100 py-3">
            <button
              onClick={() => toggleAccordion(3)}
              className="w-full flex items-center justify-between font-bold text-sm text-gray-800 outline-none cursor-pointer"
            >
              <span>Komunitas</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${activeAccordion === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {activeAccordion === 3 && (
              <ul className="flex flex-col gap-2 mt-3 text-sm text-gray-500 pl-1">
                {community.map((comm, idx) => (
                  <li key={idx}><a href={comm.link} className="hover:text-orange-500 transition-colors">{comm.name}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── BOTTOM BAR: Copyright & Socials ── */}
        <div className="pt-6 border-t border-gray-100 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center md:text-left">
            @2023 Gerobak Sayur All Rights Reserved.
          </p>

          <div className="flex items-center gap-2">
            {socialIcons.map((soc, idx) => (
              <a
                key={idx}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
                aria-label={soc.name}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
