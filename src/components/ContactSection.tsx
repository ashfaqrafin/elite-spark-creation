
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import WhatsAppDialog from './WhatsAppDialog';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsAppDialogOpen, setWhatsAppDialogOpen] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // When deployed on Hostinger, this path will point to the PHP mail script
      const response = await fetch('mail.php', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
      });
      
      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          description: 'Thank you for contacting Elite Site Creation.',
          duration: 5000,
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
        duration: 5000,
      });
      console.error('Email send error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-elite-primary" />,
      label: "Phone",
      value: "+880 1640-063079",
      href: "tel:+8801640063079"
    },
    {
      icon: <Mail size={20} className="text-elite-primary" />,
      label: "Email",
      value: "support@elitesitecreation.com",
      href: "mailto:support@elitesitecreation.com"
    },
    {
      icon: <MapPin size={20} className="text-elite-primary" />,
      label: "Address",
      value: "Mirpur 1, Dhaka, Bangladesh",
      href: "https://maps.google.com/?q=Mirpur+1,+Dhaka,+Bangladesh"
    }
  ];
  
  return (
    <section id="contact" className="relative py-24 bg-elite-bg-dark">
      <div className="absolute top-0 left-0 w-full h-full bg-elite-bg-dark">
        <div className="absolute inset-0 opacity-10 bg-hero-pattern"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-elite-surface/80 backdrop-blur-sm rounded-full text-sm font-medium text-elite-text/70 mb-6">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-elite-text/70">
            Reach out to us for a consultation or to discuss your project. We're here to help bring your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-lg animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-elite-text/70 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-elite-bg-darker border border-elite-surface rounded-md px-4 py-3 focus:ring-2 focus:ring-elite-primary/50 focus:border-elite-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-elite-text/70 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-elite-bg-darker border border-elite-surface rounded-md px-4 py-3 focus:ring-2 focus:ring-elite-primary/50 focus:border-elite-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-elite-text/70 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-elite-bg-darker border border-elite-surface rounded-md px-4 py-3 focus:ring-2 focus:ring-elite-primary/50 focus:border-elite-primary transition-colors"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-elite-text/70 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-elite-bg-darker border border-elite-surface rounded-md px-4 py-3 focus:ring-2 focus:ring-elite-primary/50 focus:border-elite-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-glow bg-elite-gradient w-full text-white px-6 py-3 rounded-md hover:shadow-glow-sm transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="loader mr-2" style={{ width: '20px', height: '20px' }}></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info and Map */}
          <div className="flex flex-col">
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index} 
                    href={info.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start hover:bg-elite-surface/30 p-3 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-elite-surface/50 flex items-center justify-center mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-elite-text/70">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* WhatsApp Button - Updated to open dialog */}
              <button
                onClick={() => setWhatsAppDialogOpen(true)}
                className="mt-6 w-full bg-[#25D366] text-white px-6 py-3 rounded-md hover:bg-[#20BF5B] transition-colors flex items-center justify-center"
              >
                <MessageCircle size={18} className="mr-2" />
                <span>Chat on WhatsApp</span>
              </button>
              
              {/* WhatsApp Dialog Component */}
              <WhatsAppDialog 
                open={whatsAppDialogOpen}
                onOpenChange={setWhatsAppDialogOpen} 
              />
            </div>
            
            {/* Google Map */}
            <div className="glass-card p-0 rounded-lg overflow-hidden h-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.654399048788!2d90.34276368981952!3d23.79588324278772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6b8c2ff%3A0x3b138861ee9c8c30!2sMirpur%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1697011214251!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Elite Site Creation Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
