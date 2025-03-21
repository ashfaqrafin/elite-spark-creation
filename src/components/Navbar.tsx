
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const navLinks = [
    { text: 'Home', href: '#home' },
    { text: 'Services', href: '#services' },
    { text: 'Contact', href: '#contact' },
  ];
  
  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300",
          scrolled ? "py-3 bg-elite-bg-darker/80 backdrop-blur-lg shadow-md" : "py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-gradient">Elite Site Creation</span>
          </a>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="nav-link font-medium">
                {link.text}
              </a>
            ))}
            <a 
              href="#contact" 
              className="button-glow bg-elite-gradient text-white px-6 py-2 rounded-md hover:shadow-glow-sm transition-shadow"
            >
              Get Started
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center text-elite-text focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-elite-bg-darker/95 backdrop-blur-lg transform transition-transform duration-300 md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4 text-center">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-2xl font-medium hover:text-elite-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-elite-gradient text-white px-8 py-3 rounded-md mt-4 hover:shadow-glow-md transition-shadow"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
