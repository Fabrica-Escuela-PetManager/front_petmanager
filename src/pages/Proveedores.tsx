import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - esto puede venir de una base de datos más adelante
const providers = [
  { id: 1, name: "PetNova Colombia", nit: "900123456-7", phone: "+57 301 234 5678", email: "contacto@petnova.co" },
  { id: 2, name: "Huella Viva S.A.S.", nit: "900234567-8", phone: "+57 302 345 6789", email: "info@huellaviva.com" },
  { id: 3, name: "MundoPet Distribuciones", nit: "900345678-9", phone: "+57 303 456 7890", email: "ventas@mundopet.co" },
  { id: 4, name: "PetCare Solutions Ltda.", nit: "800912345-1", phone: "+57 320 915 7482", email: "servicio@petcaresolutions.com.co" },
  { id: 5, name: "Animalia Express", nit: "900456789-0", phone: "+57 304 567 8901", email: "pedidos@animaliaexpress.co" },
];

export default function Proveedores() {
  const navigate = useNavigate();

  return (
    <Layout userInitial="G">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Proveedores</h1>
            <p className="text-muted-foreground mt-1">
              Lista de proveedores registrados en el sistema
            </p>
          </div>
        </div>

        <Card className="bg-petmanager-surface shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserCog className="h-6 w-6 text-petmanager-primary" />
              <CardTitle>Proveedores Registrados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>NIT</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell>
                      <button
                        onClick={() => navigate(`/proveedores/${provider.id}`)}
                        className="text-petmanager-primary font-medium hover:underline cursor-pointer"
                      >
                        {provider.name}
                      </button>
                    </TableCell>
                    <TableCell>{provider.nit}</TableCell>
                    <TableCell>{provider.phone}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
