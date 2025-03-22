
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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from 'sonner';
import { useMediaQuery } from "@/hooks/use-media-query";

interface WhatsAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({ open, onOpenChange }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIsLoading(false);
  };

  // Choose between Dialog (desktop) and Drawer (mobile)
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] max-h-[80vh] glass-card border-elite-surface/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <span>WhatsApp Web</span>
            </DialogTitle>
            <DialogDescription>
              Chat directly without leaving the website
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative mt-2 flex-1 overflow-hidden rounded-md h-[60vh]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-elite-bg-dark/80">
                <div className="loader" style={{ width: '40px', height: '40px' }}></div>
              </div>
            )}
            <iframe 
              src="https://web.whatsapp.com" 
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title="WhatsApp Web"
            ></iframe>
          </div>
          
          <DialogFooter className="mt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-elite-surface hover:bg-elite-surface/80 text-white transition-colors"
            >
              Close
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
            <span className="font-semibold">WhatsApp Web</span>
          </div>
          <p className="text-sm text-elite-text/70">Chat directly without leaving the website</p>
        </div>
        
        <div className="relative flex-1 overflow-hidden h-[70vh]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-elite-bg-dark/80">
              <div className="loader" style={{ width: '40px', height: '40px' }}></div>
            </div>
          )}
          <iframe 
            src="https://web.whatsapp.com" 
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title="WhatsApp Web"
          ></iframe>
        </div>
        
        <div className="p-4 border-t border-elite-surface/30">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-elite-surface hover:bg-elite-surface/80 text-white transition-colors"
          >
            Close
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WhatsAppDialog;
