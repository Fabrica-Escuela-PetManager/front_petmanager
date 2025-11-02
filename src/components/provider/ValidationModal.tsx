import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isSuccess?: boolean;
}

export function ValidationModal({ isOpen, onClose, message, isSuccess = false }: ValidationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-12 bg-white border-4 rounded-3xl" style={{
        borderColor: isSuccess ? '#A6D785' : '#E5A1A1'
      }}>
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h2 className="text-3xl font-bold text-black leading-relaxed px-4">
            {message}
          </h2>
          
          <Button
            onClick={onClose}
            className="px-16 py-6 text-xl font-semibold rounded-2xl transition-all hover:opacity-90"
            style={{
              backgroundColor: isSuccess ? '#A6D785' : '#E5A1A1',
              color: '#000000'
            }}
          >
            {isSuccess ? "Regresar a Inicio de Sesión" : "Regresar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
