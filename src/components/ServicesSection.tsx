
import React from 'react';
import { 
  Globe, 
  Code, 
  Layout, 
  RefreshCw, 
  Bot, 
  Cpu, 
  PenTool, 
  Palette, 
  Video, 
  Film 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index }) => {
  return (
    <div 
      className="glass-card p-6 rounded-lg hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="w-12 h-12 rounded-lg bg-elite-gradient flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-elite-text/70">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Website Design",
      description: "Custom designed websites that perfectly represent your brand identity and captivate your audience.",
      icon: <Layout className="text-white" size={24} />
    },
    {
      title: "Web Development",
      description: "Professional development of robust, responsive, and high-performance websites and web applications.",
      icon: <Code className="text-white" size={24} />
    },
    {
      title: "Website Maintenance",
      description: "Regular updates, monitoring, and optimizations to keep your website secure and performing optimally.",
      icon: <RefreshCw className="text-white" size={24} />
    },
    {
      title: "AI Solutions",
      description: "Advanced AI and chatbot implementations to automate processes and enhance customer interactions.",
      icon: <Bot className="text-white" size={24} />
    },
    {
      title: "Machine Learning",
      description: "Custom machine learning solutions to extract insights from your data and power intelligent features.",
      icon: <Cpu className="text-white" size={24} />
    },
    {
      title: "Graphic Design",
      description: "Eye-catching logos, branding materials, and marketing graphics that make your brand stand out.",
      icon: <PenTool className="text-white" size={24} />
    },
    {
      title: "Visual Identity",
      description: "Comprehensive brand identity design including color schemes, typography, and design systems.",
      icon: <Palette className="text-white" size={24} />
    },
    {
      title: "Visual Effects",
      description: "Stunning visual effects for videos, websites, and digital content that captivate your audience.",
      icon: <Video className="text-white" size={24} />
    }
  ];
  
  return (
    <section id="services" className="relative py-24 bg-elite-bg-darker">
      <div className="absolute inset-0 opacity-10 bg-hero-pattern"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-elite-surface/80 backdrop-blur-sm rounded-full text-sm font-medium text-elite-text/70 mb-6">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Premium</span> Digital Services
          </h2>
          <p className="text-elite-text/70">
            We offer a wide range of digital services to help your business grow and succeed in the digital world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Divider with brand gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-elite-gradient opacity-30"></div>
    </section>
  );
};

export default ServicesSection;
