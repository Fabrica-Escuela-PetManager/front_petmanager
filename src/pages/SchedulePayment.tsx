import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarClock, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { paymentService } from "@/services/paymentService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductRow {
  id: number;
  producto: string;
  cantidad: number;
  precioUnitario: string;
}

export default function SchedulePayment() {
  const navigate = useNavigate();
  const { id: supplierId } = useParams<{ id: string }>();

  const [date, setDate] = useState<Date>();
  const [paymentConditions, setPaymentConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("");

  const [products, setProducts] = useState<ProductRow[]>([
    { id: 1, producto: "", cantidad: 0, precioUnitario: "" },
  ]);

  useEffect(() => {
    paymentService.getPaymentConditions().then((res) => {
      setPaymentConditions(res.paymentConditions);
    });
  }, []);

  const addProduct = () => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts([...products, {
      id: newId,
      producto: "",
      cantidad: 0,
      precioUnitario: "",
    }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(0, p.cantidad + delta) } : p
      ),
    );
  };
  const handleRegister = async () => {
    if (!supplierId) return;

    const payload = {
      supplierId: Number(supplierId),
      paymentDate: date ? date.toISOString().split("T")[0] : "",
      notes: "", // si luego agregas notas, acá va
      products: products.map((p) => ({
        product: {
          name: p.producto,
          brand: "", // no lo estás capturando en UI, luego lo agregamos
          description: "", // igual
        },
        quantity: p.cantidad,
        pricePerUnit: Number(p.precioUnitario),
      })),
    };

    await paymentService.create(payload);

    navigate(-1);
  };

  return (
    <Layout userInitial="G">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-petmanager-accent/20 flex items-center justify-center">
            <CalendarClock className="w-8 h-8 text-petmanager-primary" />
          </div>
          <h1 className="text-3xl font-bold">Programar pago</h1>
        </div>

        <p className="mb-6 text-muted-foreground font-medium">
          Proveedor ID: <span className="font-bold">{supplierId}</span>
        </p>

        {/* Payment conditions select */}
        <div className="mb-6">
          <label className="text-sm font-medium">Condición de pago</label>
          <Select
            value={selectedCondition}
            onValueChange={(v) => setSelectedCondition(v)}
          >
            <SelectTrigger className="mt-1 w-[280px] bg-background border-input">
              <SelectValue placeholder="Selecciona condición" />
            </SelectTrigger>
            <SelectContent>
              {paymentConditions.map((pc) => (
                <SelectItem key={pc.id} value={pc.name}>
                  {pc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Selecciona la fecha del pago
            </h2>

            <div className="border rounded-md p-4 bg-muted/10">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={cn("pointer-events-auto")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Añade los productos para esta fecha
            </h2>

            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-sm text-muted-foreground font-medium mb-2">
              <div>Producto</div>
              <div className="text-center">Cantidad</div>
              <div>Precio unitario</div>
              <div className="w-10"></div>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center"
                >
                  <Input
                    placeholder="Nombre del producto"
                    value={product.producto}
                    onChange={(e) =>
                      setProducts(products.map((p) =>
                        p.id === product.id
                          ? { ...p, producto: e.target.value }
                          : p
                      ))}
                  />

                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-petmanager-primary hover:bg-petmanager-primary/90"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {product.cantidad}
                    </span>
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-petmanager-primary hover:bg-petmanager-primary/90"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    placeholder="$0.000"
                    value={product.precioUnitario}
                    onChange={(e) =>
                      setProducts(products.map((p) =>
                        p.id === product.id
                          ? { ...p, precioUnitario: e.target.value }
                          : p
                      ))}
                  />

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    onClick={() => removeProduct(product.id)}
                    disabled={products.length === 1}
                    title={products.length === 1 ? "Debe haber al menos un producto" : "Eliminar producto"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="bg-petmanager-primary hover:bg-petmanager-primary/90 text-white"
              onClick={addProduct}
            >
              Añadir otro producto
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-petmanager-success hover:bg-petmanager-success/90 text-foreground px-16 py-6 text-lg"
            onClick={handleRegister}
          >
            Registrar
          </Button>
          <Button
            variant="cancel"
            onClick={() => navigate(-1)}
            className="px-16 py-6 text-lg"
          >
            Regresar
          </Button>
        </div>
      </div>
    </Layout>
  );
}