import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import Journey from '../components/sections/Journey';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Journey />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;