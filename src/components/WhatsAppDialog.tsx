
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from 'sonner';
import { useMediaQuery } from "@/hooks/use-media-query";

interface WhatsAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({ open, onOpenChange }) => {
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Business Phone that will receive the messages (replace with your actual WhatsApp Business number)
  const BUSINESS_PHONE_NUMBER = "8801640063079"; // Replace with your actual number

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    let recipientNumber = BUSINESS_PHONE_NUMBER;
    
    // If user entered a phone number, use that instead
    if (phoneNumber.trim()) {
      recipientNumber = phoneNumber.trim().replace(/[^0-9]/g, '');
    }
    
    setIsLoading(true);
    
    try {
      // Format the URL for WhatsApp API
      const encodedMessage = encodeURIComponent(message);
      const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${recipientNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappApiUrl, '_blank');
      
      toast.success("Redirecting to WhatsApp");
      setMessage('');
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      toast.error("Failed to open WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  const DialogContent = (
    <>
      <div className="space-y-4 mt-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Your Phone Number (optional)</label>
          <Input
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="bg-elite-bg-darker border-elite-surface"
          />
          <p className="text-xs text-elite-text/50 mt-1">If not provided, we'll send to our business number</p>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[120px] bg-elite-bg-darker border-elite-surface"
          />
        </div>
      </div>
    </>
  );

  // Choose between Dialog (desktop) and Drawer (mobile)
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] glass-card border-elite-surface/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <span>WhatsApp Business</span>
            </DialogTitle>
            <DialogDescription>
              Send us a message directly via WhatsApp
            </DialogDescription>
          </DialogHeader>
          
          {DialogContent}
          
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="w-full bg-[#25D366] hover:bg-[#20BF5B] text-white transition-colors"
            >
              {isLoading ? (
                <div className="loader" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] glass-card border-elite-surface/30">
        <div className="px-4 py-3 border-b border-elite-surface/30">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <span className="font-semibold">WhatsApp Business</span>
          </div>
          <p className="text-sm text-elite-text/70">Send us a message directly via WhatsApp</p>
        </div>
        
        <div className="p-4">
          {DialogContent}
        </div>
        
        <div className="p-4 border-t border-elite-surface/30 flex gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-1/2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="w-1/2 bg-[#25D366] hover:bg-[#20BF5B] text-white transition-colors"
          >
            {isLoading ? (
              <div className="loader" style={{ width: '20px', height: '20px' }}></div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WhatsAppDialog;
