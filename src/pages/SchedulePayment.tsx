import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { CalendarClock, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductRow {
  id: number;
  producto: string;
  cantidad: number;
  precioUnitario: string;
}

export default function SchedulePayment() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [products, setProducts] = useState<ProductRow[]>([
    { id: 1, producto: "", cantidad: 0, precioUnitario: "" },
    { id: 2, producto: "", cantidad: 0, precioUnitario: "" },
    { id: 3, producto: "", cantidad: 0, precioUnitario: "" },
  ]);

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { id: newId, producto: "", cantidad: 0, precioUnitario: "" }]);
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, cantidad: Math.max(0, p.cantidad + delta) } : p
    ));
  };

  return (
    <Layout userInitial="G">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-6xl mx-auto">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-petmanager-accent/20 flex items-center justify-center">
            <CalendarClock className="w-8 h-8 text-petmanager-primary" />
          </div>
          <h1 className="text-3xl font-bold">Programar pago</h1>
        </div>

        {/* Main Content: Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Date Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Selecciona la fecha del pago</h2>
            
            {/* Date Input Fields */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="dd" 
                  className="w-16 text-center"
                  maxLength={2}
                />
                <Input 
                  placeholder="mm" 
                  className="w-16 text-center"
                  maxLength={2}
                />
                <Input 
                  placeholder="aa" 
                  className="w-16 text-center"
                  maxLength={2}
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="border rounded-md p-4 bg-muted/10">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={cn("pointer-events-auto")}
              />
            </div>
          </div>

          {/* Right Column: Products */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Añade los productos para esta fecha</h2>
            
            {/* Product Headers */}
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 text-sm text-muted-foreground font-medium mb-2">
              <div>Producto</div>
              <div className="text-center">Cantidad</div>
              <div>Precio unitario</div>
            </div>

            {/* Product Rows */}
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center">
                  <Input 
                    placeholder="Nombre del producto"
                    value={product.producto}
                    onChange={(e) => setProducts(products.map(p => 
                      p.id === product.id ? { ...p, producto: e.target.value } : p
                    ))}
                  />
                  
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="default"
                      className="h-8 w-8 bg-petmanager-primary hover:bg-petmanager-primary/90"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{product.cantidad}</span>
                    <Button
                      size="icon"
                      variant="default"
                      className="h-8 w-8 bg-petmanager-primary hover:bg-petmanager-primary/90"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input 
                    placeholder="$0.000"
                    value={product.precioUnitario}
                    onChange={(e) => setProducts(products.map(p => 
                      p.id === product.id ? { ...p, precioUnitario: e.target.value } : p
                    ))}
                  />
                </div>
              ))}
            </div>

            {/* Add Another Product Button */}
            <Button
              variant="default"
              className="bg-petmanager-primary hover:bg-petmanager-primary/90 text-white"
              onClick={addProduct}
            >
              Añadir otro producto
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-petmanager-success hover:bg-petmanager-success/90 text-foreground px-16 py-6 text-lg"
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
