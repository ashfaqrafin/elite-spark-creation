
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ChevronRight, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Our Team", href: "#" },
        { text: "Portfolio", href: "#" },
        { text: "Testimonials", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { text: "Website Design", href: "#services" },
        { text: "Web Development", href: "#services" },
        { text: "AI Solutions", href: "#services" },
        { text: "Graphic Design", href: "#services" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "#" },
        { text: "Case Studies", href: "#" },
        { text: "FAQs", href: "#" },
        { text: "Terms of Service", href: "#" }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Instagram size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" }
  ];
  
  return (
    <footer className="bg-elite-bg-darker pt-16 pb-8 relative">
      <div className="absolute inset-0 opacity-5 bg-hero-pattern"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-4">
              <span className="text-2xl font-bold text-gradient">Elite Site Creation</span>
            </a>
            <p className="text-elite-text/70 mb-4 max-w-md">
              We deliver premium digital experiences through innovative web design, AI solutions, and creative graphics that help brands stand out.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-elite-surface/50 flex items-center justify-center hover:bg-elite-primary/20 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-elite-text/70 hover:text-elite-primary flex items-center transition-colors">
                      <ChevronRight size={14} className="mr-1" />
                      <span>{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-elite-surface/50 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-elite-text/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Elite Site Creation. All rights reserved.
          </p>
          <p className="text-elite-text/60 text-sm flex items-center">
            Designed with <Heart size={14} className="mx-1 text-elite-primary" /> by Elite Site Creation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
