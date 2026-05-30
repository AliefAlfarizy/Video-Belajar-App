import { useState, useEffect } from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import HeroSection from '../components/organisms/HeroSection.jsx';
import CourseSection from '../components/organisms/CourseSection.jsx';
import NewsletterSection from '../components/organisms/NewsletterSection.jsx';
import Footer from '../components/organisms/Footer.jsx';


function Home() {
  //  data courses
  const initialCoursesData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Pelajari cara kerja auditor profesional di perusahaan Big 4 dan kuasai analisis laporan keuangan dari nol hingga mahir.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '4.8 (1.2K)',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
      title: 'UI/UX Design Mastery dengan Figma',
      description: 'Kuasai desain antarmuka modern menggunakan Figma, dari wireframe hingga prototype interaktif yang siap presentasi.',
      mentor: 'Rina Kusuma',
      jobTitle: 'Lead UI/UX Designer di Tokopedia',
      price: 'Rp 450K',
      rating: '4.9 (3.4K)',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop',
      title: 'Full Stack Web Development Bootcamp',
      description: 'Bangun aplikasi web lengkap dari frontend hingga backend menggunakan React, Node.js, dan database modern.',
      mentor: 'Budi Santoso',
      jobTitle: 'Senior Software Engineer di Shopee',
      price: 'Rp 750K',
      rating: '4.7 (2.1K)',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      title: 'Digital Marketing & Growth Hacking',
      description: 'Strategi pemasaran digital terkini mulai dari SEO, Google Ads, hingga social media marketing untuk bisnis kamu.',
      mentor: 'Sari Dewi',
      jobTitle: 'Head of Marketing di Traveloka',
      price: 'Rp 350K',
      rating: '4.6 (987)',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      title: 'Data Science & Machine Learning',
      description: 'Pelajari analisis data, visualisasi, dan machine learning menggunakan Python dan library populer seperti Pandas dan Scikit-learn.',
      mentor: 'Ahmad Fauzi',
      jobTitle: 'Data Scientist di Bukalapak',
      price: 'Rp 600K',
      rating: '4.9 (4.7K)',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
      title: 'Public Speaking & Komunikasi Efektif',
      description: 'Tingkatkan kepercayaan diri dan kemampuan berbicara di depan umum dengan teknik komunikasi yang terbukti efektif.',
      mentor: 'Maya Putri',
      jobTitle: 'Corporate Trainer di Unilever',
      price: 'Rp 250K',
      rating: '4.5 (756)',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop',
      title: 'Mobile App Development dengan Flutter',
      description: 'Buat aplikasi mobile cross-platform untuk Android dan iOS menggunakan Flutter dan Dart dari dasar hingga publish ke store.',
      mentor: 'Dimas Prasetyo',
      jobTitle: 'Mobile Developer di OVO',
      price: 'Rp 500K',
      rating: '4.7 (1.8K)',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop',
      title: 'Manajemen Bisnis & Kewirausahaan',
      description: 'Pelajari strategi membangun bisnis dari nol, manajemen tim, keuangan bisnis, dan cara scale-up usaha kamu.',
      mentor: 'Hendra Wijaya',
      jobTitle: 'CEO & Founder di StartupID',
      price: 'Rp 400K',
      rating: '4.6 (1.1K)',
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
      title: 'Fotografi & Editing Profesional',
      description: 'Kuasai teknik fotografi dari komposisi, pencahayaan, hingga editing foto menggunakan Adobe Lightroom dan Photoshop.',
      mentor: 'Lestari Ningrum',
      jobTitle: 'Professional Photographer & Content Creator',
      price: 'Rp 280K',
      rating: '4.8 (2.3K)',
    },
  ];


  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const savedCourses = localStorage.getItem('adminCourses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses(initialCoursesData);
      localStorage.setItem('adminCourses', JSON.stringify(initialCoursesData));
    }
  }, []);


  useEffect(() => {
    const handleFocus = () => {
      const savedCourses = localStorage.getItem('adminCourses');
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-premium antialiased">

      <Navbar />


      <main className="flex flex-col flex-1 w-full pb-10">
        <HeroSection />
        <CourseSection courses={courses} />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}


export default Home;
