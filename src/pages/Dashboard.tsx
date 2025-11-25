import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Package, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Layout userInitial="G">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido a PetManager
          </h1>
          <p className="text-muted-foreground">
            Sistema integral de gestión para mascotas y proveedores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-petmanager-surface shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-6 w-6 text-petmanager-primary" />
                <CardTitle className="text-lg">Gestión de Proveedores</CardTitle>
              </div>
              <CardDescription>
                Registra y administra los proveedores de productos para mascotas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="petmanager" className="w-full">
                <Link to="/providers">Agregar Proveedor</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-petmanager-surface shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-petmanager-primary" />
                <CardTitle className="text-lg">Gestión de Roles</CardTitle>
              </div>
              <CardDescription>
                Administra usuarios y sus permisos en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="petmanager" className="w-full">
                <Link to="/roles">Ver Usuarios</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-petmanager-surface shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-6 w-6 text-petmanager-primary" />
                <CardTitle className="text-lg">Proveedores</CardTitle>
              </div>
              <CardDescription>
                Perfil y registro de pago de los proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="petmanager" className="w-full">
                <Link to="/proveedores">Ver Proveedores</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-petmanager-surface shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-petmanager-primary" />
                <CardTitle className="text-lg">Reportes</CardTitle>
              </div>
              <CardDescription>
                Análisis y reportes del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}