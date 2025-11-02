import { useEffect } from "react";
import successNotificationImg from "@/assets/success-notification.png";

interface SuccessNotificationProps {
  isVisible: boolean;
  providerName: string;
  onClose: () => void;
}

export function SuccessNotification({ isVisible, providerName, onClose }: SuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="relative">
        <img 
          src={successNotificationImg} 
          alt="Proveedor registrado" 
          className="w-96 h-auto drop-shadow-2xl"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pt-4">
          <p className="text-sm font-medium text-foreground mb-1">Proveedor registrado</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">{providerName}</span> se ha registrado exitosamente
          </p>
        </div>
      </div>
    </div>
  );
}
