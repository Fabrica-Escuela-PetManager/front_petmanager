import { useEffect, useState } from "react";
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
import { providerService } from "@/services/providerService";

export default function ProviderProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (!id) return;
      try {
        const response = await providerService.getById(Number(id));
        setProvider(response);
      } catch (error) {
        console.error("Error cargando proveedor:", error);
      }
    };

    loadProvider();
  }, [id]);

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

            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Nombre</Label>
              <Input value={provider.name} readOnly className="bg-background border-input" />
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">NIT</Label>
              <Input value={provider.nit} readOnly className="bg-background border-input" />
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Teléfono</Label>
              <Input value={provider.phoneNumber} readOnly className="bg-background border-input" />
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Email</Label>
              <Input value={provider.email} readOnly className="bg-background border-input" />
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
              <Label className="font-bold text-foreground">Dirección</Label>
              <Input value={provider.address} readOnly className="bg-background border-input" />
            </div>

            {/* Condición de pago */}
            <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
              <Label className="font-bold text-foreground pt-2">Condiciones de pago</Label>
              <Select disabled value={provider.paymentCondition?.name}>
                <SelectTrigger className="w-[200px] bg-background border-input">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={provider.paymentCondition?.name}>
                    {provider.paymentCondition?.name}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
              <Label className="font-bold text-foreground pt-2">Información adicional</Label>
              <Textarea
                value={provider.paymentNotes ?? ""}
                readOnly
                className="bg-background border-input min-h-[120px] resize-none"
              />
            </div>

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
