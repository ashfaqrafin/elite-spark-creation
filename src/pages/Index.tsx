
import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  
  useEffect(() => {
    // Set pageReady to true after a small delay to ensure smooth animations
    setTimeout(() => {
      setPageReady(true);
    }, 100);
    
    // Preload images and resources
    const preloadResources = async () => {
      // You can add preloading logic here if needed
      return new Promise(resolve => setTimeout(resolve, 2000));
    };
    
    preloadResources().then(() => {
      // Loading is complete
    });
  }, []);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div className={`transition-opacity duration-500 ${pageReady && !loading ? 'opacity-100' : 'opacity-0'}`}>
        <CustomCursor />
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
