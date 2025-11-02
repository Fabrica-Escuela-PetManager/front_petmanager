import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentRegistry() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const lastPaymentData = [
    {
      fecha: "15/10/25",
      cantidad: 10,
      producto: "Comida para perro",
      precioUnitario: "$40.000",
      total: "$400.000",
    },
    {
      fecha: "15/10/25",
      cantidad: 10,
      producto: "Comida para gato",
      precioUnitario: "$40.000",
      total: "$400.000",
    },
  ];

  return (
    <Layout userInitial="G">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl mx-auto">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-petmanager-accent/20 flex items-center justify-center">
            <Clock className="w-8 h-8 text-petmanager-primary" />
          </div>
          <h1 className="text-3xl font-bold">Registro de pagos</h1>
        </div>

        {/* Last Payment Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Información del último pago:</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground font-medium">Fecha</TableHead>
                <TableHead className="text-muted-foreground font-medium">Cantidad</TableHead>
                <TableHead className="text-muted-foreground font-medium">Producto</TableHead>
                <TableHead className="text-muted-foreground font-medium">Precio unitario</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastPaymentData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fecha}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.precioUnitario}</TableCell>
                  <TableCell className="text-right">{item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-semibold">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold">$800.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Next Payment Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Información del próximo pago:</h2>
          
          <div className="border rounded-lg p-8 text-center bg-muted/30">
            <p className="text-muted-foreground mb-4">
              No hay un próximo pago programado.
            </p>
            <Button 
              onClick={() => navigate(`/proveedores/${id}/programar-pago`)}
              className="bg-petmanager-accent hover:bg-petmanager-accent/90 text-foreground"
            >
              Programar pago
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end">
          <Button
            variant="cancel"
            onClick={() => navigate(`/proveedores/${id}`)}
            className="px-8"
          >
            Regresar
          </Button>
        </div>
      </div>
    </Layout>
  );
}
