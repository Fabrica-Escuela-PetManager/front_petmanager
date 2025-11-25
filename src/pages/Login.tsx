import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      // Guardar el token en localStorage
      localStorage.setItem('authToken', response.accessToken);
      
      // Mostrar notificación de éxito
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
        variant: "default",
      });

      // Navegar al Dashboard
      navigate("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al iniciar sesión";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      {/* Header */}
      <div className="w-full bg-petmanager-primary-light py-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">PetManager</h1>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-normal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-normal">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-gray-300"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-petmanager-primary-light hover:bg-petmanager-primary-light/90 text-gray-800 font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
