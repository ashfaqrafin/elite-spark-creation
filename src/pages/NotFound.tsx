
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-elite-bg-dark px-4 animated-gradient">
      <div className="absolute inset-0 opacity-10 bg-hero-pattern"></div>
      
      <div className="glass-card p-10 rounded-lg max-w-md w-full text-center">
        <div className="inline-block w-24 h-24 rounded-full bg-elite-surface/50 flex items-center justify-center mb-6 mx-auto">
          <span className="text-5xl font-bold text-gradient">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-elite-text/70 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <a 
          href="/" 
          className="button-glow bg-elite-gradient text-white px-6 py-3 rounded-md hover:shadow-glow-sm transition-shadow inline-flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
