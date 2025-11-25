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
} from "@/utils/providerValidation";
import { providerService } from "@/services/providerService";

export default function ProviderForm() {
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    phoneNumber: "",
    email: "",
    address: "",
    paymentNotes: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validaciones francesas
    if (!validateName(formData.name).isValid) { setValidationMessage(validateName(formData.name).message!); setIsSuccess(false); setShowValidationModal(true); return;}
    if (!validateNIT(formData.nit).isValid) { setValidationMessage(validateNIT(formData.nit).message!); setIsSuccess(false); setShowValidationModal(true); return;}
    if (await providerService.checkNitExists(formData.nit)) {
      setValidationMessage("Ya existe un proveedor con este NIT");
      setIsSuccess(false);
      setShowValidationModal(true);
      return;
    }
    if (!validateEmail(formData.email).isValid) { setValidationMessage(validateEmail(formData.email).message!); setIsSuccess(false); setShowValidationModal(true); return;}
    if (!validatePhone(formData.phoneNumber).isValid) { setValidationMessage(validatePhone(formData.phoneNumber).message!); setIsSuccess(false); setShowValidationModal(true); return;}
    if (!validateAddress(formData.address).isValid) { setValidationMessage(validateAddress(formData.address).message!); setIsSuccess(false); setShowValidationModal(true); return;}

    try {
      await providerService.create({
        nit: formData.nit,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        email: formData.email,
        paymentConditionId: 1,
        paymentNotes: formData.paymentNotes || null,
      });

      setValidationMessage("Proveedor registrado exitosamente.");
      setIsSuccess(true);
      setShowValidationModal(true);

      setFormData({
        name: "",
        nit: "",
        phoneNumber: "",
        email: "",
        address: "",
        paymentNotes: ""
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout userInitial="G">
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md bg-petmanager-surface shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-foreground">Agregar proveedor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleInputChange("name")} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nit">NIT</Label>
                <Input id="nit" type="text" value={formData.nit} onChange={handleInputChange("nit")} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Teléfono</Label>
                <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange("phoneNumber")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange("email")} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea id="address" value={formData.address} onChange={handleInputChange("address")} rows={3}/>
              </div>

              {/* notas opcionales */}
              <div className="space-y-2">
                <Label htmlFor="paymentNotes">Notas de pago</Label>
                <Textarea id="paymentNotes" value={formData.paymentNotes} onChange={handleInputChange("paymentNotes")} rows={2}/>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button type="submit" variant="petmanager" className="w-full">Registrar</Button>
                <Button type="button" variant="cancel" className="w-full" asChild>
                  <Link to="/" className="inline-flex items-center justify-center gap-2"><ArrowLeft className="h-4 w-4" />Regresar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ValidationModal isOpen={showValidationModal} onClose={() => setShowValidationModal(false)} message={validationMessage} isSuccess={isSuccess} />
    </Layout>
  );
}