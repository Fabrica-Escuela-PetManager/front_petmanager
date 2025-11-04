import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { providerService, type Provider } from "@/services";
import { Loader2 } from "lucide-react";

export default function Proveedores() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providerService.getAll();
        setProviders(data);
      } catch (error) {
        console.error("Error obteniendo proveedores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

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
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
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
                      <TableCell>{provider.phoneNumber}</TableCell>
                      <TableCell>{provider.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
