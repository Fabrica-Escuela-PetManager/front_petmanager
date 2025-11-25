import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// Mock data - esto vendrá de la base de datos más adelante
const upcomingPayments = [
  {
    id: 1,
    providerName: "PetCare",
    amount: "COP $2,000",
    dueDate: "16 de noviembre",
  },
  {
    id: 2,
    providerName: "Pago de proveedor",
    amount: "COP $1,500",
    dueDate: "20 de noviembre",
  },
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const hasNotifications = upcomingPayments.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 relative"
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-[hsl(120,40%,85%)]" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notificaciones</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          {hasNotifications ? (
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-start gap-3">
                  <Bell className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {payment.providerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Se vence el pago programado para el {payment.dueDate}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                className="w-full bg-[hsl(0,60%,70%)] hover:bg-[hsl(0,60%,65%)] text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Borrar
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No hay pagos próximos
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
