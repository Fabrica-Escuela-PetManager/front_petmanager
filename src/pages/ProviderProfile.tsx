import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCog } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data - esto puede venir de una base de datos más adelante
const providersData: Record<string, any> = {
  "1": {
    name: "PetNova Colombia",
    nit: "900123456-7",
    phone: "+57 301 234 5678",
    email: "contacto@petnova.co",
    address: "Calle 45 #23-10, Bogotá D.C.",
    paymentCondition: "Crédito a 30 días",
    additionalInfo: "Aplica solo para compras mayores a $500.000",
  },
  "2": {
    name: "Huella Viva S.A.S.",
    nit: "900234567-8",
    phone: "+57 302 345 6789",
    email: "info@huellaviva.com",
    address: "Av. El Dorado #68-45, Bogotá D.C.",
    paymentCondition: "Crédito a 45 días",
    additionalInfo: "Descuento del 5% en compras superiores a $1.000.000",
  },
  "3": {
    name: "MundoPet Distribuciones",
    nit: "900345678-9",
    phone: "+57 303 456 7890",
    email: "ventas@mundopet.co",
    address: "Carrera 15 #100-50, Bogotá D.C.",
    paymentCondition: "Crédito a 60 días",
    additionalInfo: "Entregas gratuitas para pedidos mayores a $800.000",
  },
  "4": {
    name: "PetCare Solutions Ltda.",
    nit: "800912345-1",
    phone: "+57 320 915 7482",
    email: "servicio@petcaresolutions.com.co",
    address: "Cl. 72 #10-15, Barrio Chapinero, Bogotá D.C.",
    paymentCondition: "Crédito a 30 días",
    additionalInfo: "Aplica solo para compras mayores a $500.000",
  },
  "5": {
    name: "Animalia Express",
    nit: "900456789-0",
    phone: "+57 304 567 8901",
    email: "pedidos@animaliaexpress.co",
    address: "Calle 80 #30-20, Bogotá D.C.",
    paymentCondition: "Contado",
    additionalInfo: "Entregas el mismo día en Bogotá",
  },
};

export default function ProviderProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const provider = id ? providersData[id] : null;

  if (!provider) {
    return (
      <Layout userInitial="G">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground">Proveedor no encontrado</h2>
          <Button onClick={() => navigate("/proveedores")} className="mt-4">
            Volver a la lista
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userInitial="G">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-petmanager-surface shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <UserCog className="h-8 w-8 text-[hsl(var(--petmanager-accent))]" />
              <CardTitle className="text-2xl">Perfil del Proveedor</CardTitle>
            </div>
            <p className="text-muted-foreground mt-2">
              Información acerca del proveedor:
            </p>
          </CardHeader>
          <CardContent className="space-y-4 px-12">
            {/* Nombre */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Nombre</Label>
              <Input value={provider.name} readOnly className="bg-background border-input" />
            </div>

            {/* NIT */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">NIT</Label>
              <Input value={provider.nit} readOnly className="bg-background border-input" />
            </div>

            {/* Teléfono */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Teléfono</Label>
              <Input value={provider.phone} readOnly className="bg-background border-input" />
            </div>

            {/* Email */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Email</Label>
              <Input value={provider.email} readOnly className="bg-background border-input" />
            </div>

            {/* Dirección */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Dirección</Label>
              <Input value={provider.address} readOnly className="bg-background border-input" />
            </div>

            {/* Condiciones de pago */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
              <Label className="font-bold text-foreground pt-2">Condiciones de pago</Label>
              <div className="flex gap-4 items-center">
                <Select value={provider.paymentCondition} disabled>
                  <SelectTrigger className="w-[200px] bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contado">Contado</SelectItem>
                    <SelectItem value="Crédito a 30 días">Crédito a 30 días</SelectItem>
                    <SelectItem value="Crédito a 45 días">Crédito a 45 días</SelectItem>
                    <SelectItem value="Crédito a 60 días">Crédito a 60 días</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-foreground">Otra:</Label>
                <Input className="flex-1 bg-background border-input" readOnly />
              </div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
              <Label className="font-bold text-foreground pt-2">Información adicional</Label>
              <Textarea
                value={provider.additionalInfo}
                readOnly
                className="bg-background border-input min-h-[120px] resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-8">
            <Button
                onClick={() => navigate(`/proveedores/${id}/pagos`)}
                className="bg-[hsl(180,60%,70%)] hover:bg-[hsl(180,60%,65%)] text-foreground"
              >
                Ver registro de pagos
              </Button>
              <Button
                className="bg-[hsl(350,60%,75%)] hover:bg-[hsl(350,60%,70%)] text-foreground"
                onClick={() => navigate("/proveedores")}
              >
                Regresar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
