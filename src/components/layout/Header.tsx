import { Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "./NotificationBell";

interface HeaderProps {
  userInitial?: string;
  onMenuClick?: () => void;
}

export function Header({ userInitial = "G" }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-petmanager-primary text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-4">
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/providers"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                Registro de Proveedores
              </Link>
              <Link
                to="/roles"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                Gestión de Roles
              </Link>
              <Link
                to="/proveedores"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                Proveedores
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">PetManager</h1>
      </div>

      <div className="flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="h-8 w-8 bg-white/20 cursor-pointer hover:bg-white/30 transition-colors">
                <AvatarFallback className="bg-white text-petmanager-primary font-medium text-sm">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}