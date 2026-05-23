import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/Logo-videobelajar.png';
import avatarImage from '../../assets/images/Avatar.png';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    });

    return () => window.clearTimeout(timer);
  }, [location]);

  const handleLogout = () => {
    alert('Anda telah keluar dari akun.');
    navigate('/login');
  };

  const handleMenuItemClick = (item) => {
    if (item.label === 'Keluar') {
      handleLogout();
      return;
    }
    navigate(item.path);
  };

  const menuItems = [
    {
      label: 'Profil Saya',
      path: '/profil',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'Kelas Saya',
      path: '/kelas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      label: 'Pesanan Saya',
      path: '/pesanan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      label: 'Keluar',
      path: '/login',
      isDanger: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-4 border-b border-gray-100'
      }`}>
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 outline-none">
            <img src={logoImage} alt="VideoBelajar Logo" className="h-7 sm:h-9 object-contain" />
          </Link>

          {/* Center / Right Section */}
          <div className="flex items-center gap-8">
            {/* Desktop Category Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 text-sm font-semibold select-none cursor-pointer transition-colors outline-none ${
                  dropdownOpen ? 'text-[#F64920]' : 'text-gray-600 hover:text-[#F64920]'
                }`}
              >
                Kategori
                <svg className={`w-4 h-4 transition-transform duration-250 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                    {menuItems.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleMenuItemClick(item);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                          item.isDanger
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#F64920]'
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Avatar image */}
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-gray-100">
              <img
                src={avatarImage}
                alt="Profile Avatar"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-bg-premium shadow-sm select-none"
              />
            </div>
          </div>

          {/* Mobile Hamburger button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't get clipped by fixed navbar */}
      <div className="h-18.25"></div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-18.25 bg-black/40 z-40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute right-0 w-72 h-full bg-white shadow-2xl py-6 px-5 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            
            {/* User Profile display inside Hamburger */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <img
                src={avatarImage}
                alt="Profile Avatar"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="font-bold text-gray-900 leading-none">Raka Wibowo</p>
                <p className="text-xs text-gray-400 mt-1 truncate">raka.wibowo@gmail.com</p>
              </div>
            </div>

            {/* Requested menu items inside Hamburger */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Kategori & Akun</p>
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleMenuItemClick(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    item.isDanger
                      ? 'text-orange-600 hover:bg-orange-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#F64920]'
                  }`}
                >
                  <span className={item.isDanger ? 'text-orange-600' : 'text-gray-400 group-hover:text-emerald-600'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
