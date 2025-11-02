import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { CustomAlertDialog } from "@/components/ui/custom-alert-dialog";

interface User {
  id: string;
  nombre: string;
  rol: "Admin" | "Empleado" | "Usuario";
}

const mockUsers: User[] = [
  { id: "58347522", nombre: "Andrés Felipe Cárdenas García", rol: "Admin" },
  { id: "1043737691", nombre: "Laura Vanessa Silva Jiménez", rol: "Empleado" },
  { id: "1007542678", nombre: "Mariana Llanos Rodríguez", rol: "Empleado" },
  { id: "1214056396", nombre: "Juan Esteban Mejía Torres", rol: "Empleado" },
  { id: "1019647152", nombre: "Camilo Andrés Contreras Pérez", rol: "Usuario" },
];

export default function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const itemsPerPage = 5;

  const filteredUsers = mockUsers.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getRoleBadgeVariant = (rol: User["rol"]) => {
    switch (rol) {
      case "Admin":
        return "default";
      case "Empleado":
        return "secondary";
      case "Usuario":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Layout userInitial="A">
      <div className="space-y-6">
        <Card className="bg-petmanager-surface shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Gestión de Roles</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPermissionDialog(true)}
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                Permisos Avanzados
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24"># ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="w-32">Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.nombre}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.rol)} className="text-xs">
                          {user.rol}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando usuarios del {startIndex + 1} al {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-8"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            </CardContent>
        </Card>

        <CustomAlertDialog
          isOpen={showPermissionDialog}
          onClose={() => setShowPermissionDialog(false)}
          title="Error"
          description="No tienes permisos para acceder a esta funcionalidad"
          variant="error"
        />
      </div>
    </Layout>
  );
}