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
import { UserCog, Package, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { providerService } from "@/services/providerService";
import { productService, type SupplierProducts } from "@/services/products";
import { useToast } from "@/hooks/use-toast";

export default function ProviderProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [provider, setProvider] = useState<any>(null);
  const [supplierProducts, setSupplierProducts] = useState<SupplierProducts["supplierProducts"]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProvider = async () => {
      if (!id) return;
      try {
        const response = await providerService.getById(Number(id));
        setProvider(response);

        // Cargar productos relacionados al proveedor
        try {
          setIsLoadingProducts(true);
          const res = await productService.getSupplierProducts(Number(id));
          setSupplierProducts(res.supplierProducts);
        } catch (err) {
          console.error("Error cargando productos del proveedor:", err);
        } finally {
          setIsLoadingProducts(false);
        }

      } catch (error) {
        console.error("Error cargando proveedor:", error);
      }
    };

    loadProvider();
  }, [id]);

  const handleAddProduct = async () => {
    if (!id || !newProduct.trim()) return;

    try {
      setIsLoadingProducts(true);
      // Buscar el producto por nombre entre los productos existentes
      const all = await productService.getProducts();
      const match = all.find(
        (p) => p.name.toLowerCase() === newProduct.trim().toLowerCase()
      );

      if (!match) {
        toast({
          title: "Producto no encontrado",
          description: "No existe un producto con ese nombre. Por favor verifique.",
          variant: "destructive",
        });
        return;
      }

      const response = await productService.createSupplierProduct(Number(id), match.id);

      // Añadir a la lista local
      setSupplierProducts((prev) => [
        ...prev,
        { supplierProductId: response.id, product: response.product },
      ]);
      setNewProduct("");

      toast({
        title: "Producto añadido",
        description: `${response.product.name} fue agregado al proveedor.`,
        variant: "default",
      });

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al agregar producto";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleRemoveSupplierProduct = async (supplierProductId: number) => {
    try {
      await productService.deleteSupplierProduct(supplierProductId);
      setSupplierProducts((prev) => prev.filter((p) => p.supplierProductId !== supplierProductId));
      toast({ title: "Eliminado", description: "Producto eliminado del proveedor", variant: "default" });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al eliminar producto";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
  };

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
        {/* Productos del Proveedor */}
        <Card className="bg-petmanager-surface shadow-lg mt-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-[hsl(var(--petmanager-accent))]" />
              <CardTitle className="text-2xl">Productos del Proveedor</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-12">
            {/* Lista de productos */}
            <div className="space-y-2 mb-6">
              {supplierProducts.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground">No hay productos asociados a este proveedor.</div>
              ) : (
                supplierProducts.map((sp) => (
                  <div
                    key={sp.supplierProductId}
                    className="p-3 bg-background border border-input rounded-md text-foreground flex items-center justify-between"
                  >
                    <div className="font-medium">{sp.product.name}</div>
                    <div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveSupplierProduct(sp.supplierProductId)}
                        title="Eliminar producto del proveedor"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Campo para añadir producto */}
            <div className="space-y-3">
              <Input
                placeholder="Nombre del producto"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
                className="bg-background border-input"
              />
              <Button
                onClick={handleAddProduct}
                className="bg-[hsl(120,40%,75%)] hover:bg-[hsl(120,40%,70%)] text-foreground w-full"
              >
                Añadir producto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}