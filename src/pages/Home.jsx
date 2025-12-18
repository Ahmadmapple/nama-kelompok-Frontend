import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ProblemAwareness from '../components/sections/ProblemAwareness';
import Features from '../components/sections/Features'; // ✅ INI YANG DARI SECTIONS
import DemoSection from '../components/sections/DemoSection';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import FreeResources from '../components/sections/FreeResources';
import CTA from '../components/sections/CTA';
import LiveChat from '../components/layout/LiveChat';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemAwareness />
      <Features /> {/* ✅ INI MENGGUNAKAN COMPONENT DARI SECTIONS */}
      <DemoSection />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
//penanda