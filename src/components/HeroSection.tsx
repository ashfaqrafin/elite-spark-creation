
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const parallaxEffect = (e: MouseEvent) => {
    if (!heroRef.current) return;
    
    const bgElements = heroRef.current.querySelectorAll('.parallax-bg');
    const contentElements = heroRef.current.querySelectorAll('.parallax-content');
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    bgElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
      }
    });
    
    contentElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
    });
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', parallaxEffect);
    
    return () => {
      document.removeEventListener('mousemove', parallaxEffect);
    };
  }, []);
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 animated-gradient"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-hero-pattern parallax-bg"></div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-elite-primary/20 rounded-full blur-[100px] parallax-bg"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-elite-secondary/20 rounded-full blur-[100px] parallax-bg"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,17,24,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,24,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_20%,transparent_100%)]"></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto parallax-content">
          <div className="inline-block px-3 py-1 bg-elite-surface/80 backdrop-blur-sm rounded-full text-sm font-medium text-elite-text/70 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Web Design & Development Agency
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="text-gradient glow-text">Elite</span> Digital Experiences for Modern Brands
          </h1>
          
          <p className="text-lg md:text-xl text-elite-text/80 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            We create stunning websites, powerful AI solutions, and eye-catching graphics that transform your vision into digital reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <a href="#services" className="button-glow bg-elite-gradient text-white px-8 py-3 rounded-md hover:shadow-glow-md transition-shadow text-lg font-medium">
              Explore Services
            </a>
            <a href="#contact" className="glass-card text-elite-text px-8 py-3 rounded-md hover:bg-white/10 transition-colors text-lg font-medium">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <a href="#services" className="flex flex-col items-center text-elite-text/70 hover:text-elite-text transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
      
      {/* 3D decorative elements */}
      <div className="hidden lg:block absolute -bottom-20 -left-20 w-80 h-80 border border-elite-primary/20 rounded-full animate-spin-slow opacity-30 parallax-bg"></div>
      <div className="hidden lg:block absolute top-40 -right-40 w-96 h-96 border border-elite-secondary/20 rounded-full animate-spin-slow opacity-20 parallax-bg" style={{ animationDuration: '10s' }}></div>
    </section>
  );
};

export default HeroSection;
