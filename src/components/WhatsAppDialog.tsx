
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
import { toast } from 'sonner';

interface WhatsAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({ open, onOpenChange }) => {
  const [message, setMessage] = useState<string>('Hello! I would like to inquire about your services.');
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSend = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsSending(true);
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/8801640063079?text=${encodedMessage}`, '_blank');
    
    // Reset and close dialog
    setTimeout(() => {
      setIsSending(false);
      setMessage('Hello! I would like to inquire about your services.');
      onOpenChange(false);
      
      toast.success('WhatsApp opened with your message!');
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-elite-surface/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <span>WhatsApp Message</span>
          </DialogTitle>
          <DialogDescription>
            Type your message below to send directly to our WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[120px] bg-elite-bg-darker border border-elite-surface rounded-md px-4 py-3 focus:ring-2 focus:ring-elite-primary/50 focus:border-elite-primary transition-colors"
          />
        </div>
        
        <DialogFooter className="mt-4">
          <Button
            onClick={handleSend}
            disabled={isSending}
            className="w-full bg-[#25D366] hover:bg-[#20BF5B] text-white transition-colors"
          >
            {isSending ? (
              <>
                <span className="loader mr-2" style={{ width: '20px', height: '20px' }}></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                <span>Send to WhatsApp</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppDialog;
