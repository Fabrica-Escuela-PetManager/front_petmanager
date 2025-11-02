import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import alertNitExists from "@/assets/alert-nit-exists.png";
import alertInvalidName from "@/assets/alert-invalid-name.png";
import alertInvalidEmail from "@/assets/alert-invalid-email.png";
import alertInvalidPhone from "@/assets/alert-invalid-phone.png";
import alertInvalidNit from "@/assets/alert-invalid-nit.png";
import alertInvalidAddress from "@/assets/alert-invalid-address.png";

interface ProviderAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 
    | "nit-exists"
    | "invalid-name"
    | "invalid-email"
    | "invalid-phone"
    | "invalid-nit"
    | "invalid-address";
}

const alertImages = {
  "nit-exists": alertNitExists,
  "invalid-name": alertInvalidName,
  "invalid-email": alertInvalidEmail,
  "invalid-phone": alertInvalidPhone,
  "invalid-nit": alertInvalidNit,
  "invalid-address": alertInvalidAddress
};

const alertMessages = {
  "nit-exists": "Ya existe un proveedor con ese NIT registrado",
  "invalid-name": "El campo de nombre solo permite letras, espacios y signos diacríticos",
  "invalid-email": "Ingrese un email válido",
  "invalid-phone": "Ingrese un número de teléfono válido",
  "invalid-nit": "Ingrese un NIT válido",
  "invalid-address": "Ingrese una dirección física válida"
};

export function ProviderAlertDialog({ isOpen, onClose, type }: ProviderAlertDialogProps) {
  const alertImage = alertImages[type];
  const altText = alertMessages[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-0 shadow-none">
        <div className="relative w-full flex items-center justify-center">
          <img 
            src={alertImage} 
            alt={altText}
            className="w-full h-auto max-h-[85vh] object-contain"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
          <button
            onClick={onClose}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[35%] h-[8%] cursor-pointer bg-transparent border-0 hover:opacity-80 transition-opacity"
            aria-label="Regresar"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
