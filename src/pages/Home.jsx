import React from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import HeroSection from '../components/organisms/HeroSection.jsx';
import CourseSection from '../components/organisms/CourseSection.jsx';
import NewsletterSection from '../components/organisms/NewsletterSection.jsx';
import Footer from '../components/organisms/Footer.jsx';
import useCourses from '../hooks/useCourses';


function Home() {
  const { courses, loading, fetchCourses } = useCourses();

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

