
import Navbar from '../components/organisms/Navbar.jsx';
import HeroSection from '../components/organisms/HeroSection.jsx';
import CourseSection from '../components/organisms/CourseSection.jsx';
import NewsletterSection from '../components/organisms/NewsletterSection.jsx';
import Footer from '../components/organisms/Footer.jsx';

function Home() {
  const initialCourses = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 200K',
      rating: '3.5 (86)',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 200K',
      rating: '3.5 (86)',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&f      Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Forceit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
      title: 'Big 4 Auditor Financial Analyst',
      description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik.',
      mentor: 'Jenna Ortega',
      jobTitle: 'Senior Accountant di Gojek',
      price: 'Rp 300K',
      rating: '3.5 (86)',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-premium antialiased">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Areas */}
      <main className="flex flex-col flex-1 w-full pb-10">
        <HeroSection />
        <CourseSection courses={initialCourses} />
        <NewsletterSection />
      </main>

      {/* Footer Area */}
      <Footer />
    </div>
  );
}

export default Home;
