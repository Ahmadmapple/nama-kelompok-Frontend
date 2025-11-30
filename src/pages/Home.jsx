import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ProblemAwareness from '../components/sections/ProblemAwareness';
import Features from '../components/sections/Features'; // ✅ INI YANG DARI SECTIONS
import DemoSection from '../components/sections/DemoSection';
import CaseStudies from '../components/sections/CaseStudies';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import FreeResources from '../components/sections/FreeResources';
import CTA from '../components/sections/CTA';
import LiveChat from '../components/layout/LiveChat';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemAwareness />
      <Features /> {/* ✅ INI MENGGUNAKAN COMPONENT DARI SECTIONS */}
      <DemoSection />
      <CaseStudies />
      <Stats />
      <Testimonials />
      <FreeResources />
      <CTA />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Home;
//penanda