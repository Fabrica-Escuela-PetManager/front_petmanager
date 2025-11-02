import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ValidationModal } from "@/components/provider/ValidationModal";
import {
  validateName,
  validateNIT,
  validateEmail,
  validatePhone,
  validateAddress,
  validatePassword,
  checkNITExists,
  saveProvider
} from "@/utils/providerValidation";

export default function ProviderForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    telefono: "",
    email: "",
    direccion: "",
    password: ""
  });
  
  const [validationMessage, setValidationMessage] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar nombre
    const nameValidation = validateName(formData.nombre);
    if (!nameValidation.isValid) {
      setValidationMessage(nameValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Validar NIT formato
    const nitValidation = validateNIT(formData.nit);
    if (!nitValidation.isValid) {
      setValidationMessage(nitValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Verificar si el NIT ya existe
    if (checkNITExists(formData.nit)) {
      setValidationMessage("Ya existe un usuario con ese número de documento registrado.");
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Validar email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setValidationMessage(emailValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Validar teléfono
    const phoneValidation = validatePhone(formData.telefono);
    if (!phoneValidation.isValid) {
      setValidationMessage(phoneValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Validar dirección
    const addressValidation = validateAddress(formData.direccion);
    if (!addressValidation.isValid) {
      setValidationMessage(addressValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setValidationMessage(passwordValidation.message!);
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }

    // Guardar proveedor
    try {
      saveProvider({
        nombre: formData.nombre,
        nit: formData.nit,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion
      });

      // Mostrar notificación de éxito
      setValidationMessage("Usuario registrado exitosamente.");
      setIsSuccess(true);
      setShowValidationModal(true);
      
      // Reset form
      setFormData({
        nombre: "",
        nit: "",
        telefono: "",
        email: "",
        direccion: "",
        password: ""
      });
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
    }
  };

  return (
    <Layout userInitial="G">
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md bg-petmanager-surface shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-foreground">
              Agregar proveedor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange("nombre")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nit">NIT</Label>
                <Input
                  id="nit"
                  type="text"
                  value={formData.nit}
                  onChange={handleInputChange("nit")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfonos de contacto</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleInputChange("telefono")}
                  className="bg-muted/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange("direccion")}
                  className="bg-muted/30 resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  variant="petmanager"
                  className="w-full"
                >
                  Registrar
                </Button>
                
                <Button
                  type="button"
                  variant="cancel"
                  className="w-full"
                  asChild
                >
                  <Link to="/" className="inline-flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Regresar
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        message={validationMessage}
        isSuccess={isSuccess}
      />
    </Layout>
  );
}