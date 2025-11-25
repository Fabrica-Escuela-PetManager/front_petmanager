import { useEffect, useState } from "react";
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
import { Search, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { UserRegistrationForm } from "@/components/user/UserRegistrationForm";
import { userService, User } from "@/services/userService";




export default function RoleManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadUsers = async () => {
    };
    loadUsers();
  }, []);

 const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

 const getRoleBadgeVariant = (roleName: string) => {
    switch (roleName) {
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

  // Si se está mostrando el formulario de creación de usuario
  if (showCreateUser) {
    return (
      <Layout userInitial="A">
        <UserRegistrationForm onCancel={() => setShowCreateUser(false)} />
      </Layout>
    );
  }

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
                onClick={() => setShowCreateUser(true)}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Crear Usuario
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                 placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
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
                      <TableCell className="font-mono text-sm">{user.idNumber}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role.name)} className="text-xs">
                          {user.role.name}
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
      </div>
    </Layout>
  );
}