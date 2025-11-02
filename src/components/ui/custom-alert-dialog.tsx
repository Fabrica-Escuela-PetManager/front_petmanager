import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  variant?: "error" | "warning" | "info";
}

export function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  variant = "error"
}: CustomAlertDialogProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return {
          bg: "bg-petmanager-error/20",
          border: "border-petmanager-error/40",
          text: "text-petmanager-error-foreground",
          icon: <AlertCircle className="h-5 w-5 text-petmanager-error-foreground" />
        };
      case "warning":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-300",
          text: "text-yellow-800",
          icon: <AlertCircle className="h-5 w-5 text-yellow-600" />
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <AlertCircle className="h-5 w-5 text-blue-600" />
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className={`w-full max-w-sm mx-4 ${styles.bg} ${styles.border} border-2 shadow-lg`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {styles.icon}
              <CardTitle className={`text-lg font-semibold ${styles.text}`}>
                {title}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={`h-6 w-6 ${styles.text} hover:bg-black/10`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className={`text-sm mb-4 ${styles.text}`}>{description}</p>
          <Button
            onClick={onClose}
            variant="petmanager"
            size="sm"
            className="w-full"
          >
            Regresar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}