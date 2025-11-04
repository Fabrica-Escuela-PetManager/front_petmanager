import { useEffect, useState } from "react";
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
import { paymentService } from "@/services/paymentService";

export default function PaymentRegistry() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [lastPayments, setLastPayments] = useState<any[]>([]);
  const [nextPayment, setNextPayment] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        // Últimos pagos completos
        const resLast = await paymentService.getBySupplierId(Number(id));
        setLastPayments(resLast.payments);

        // Próximo pago
        const resNext = await paymentService.getLastAndNextPaymentBySupplier(Number(id));
        setNextPayment(resNext.next);
      } catch (e) {
        console.error("Error cargando pagos:", e);
      }
    };
    load();
  }, [id]);

  const formatDate = (date: string) => {
  if (!date) return "";

  // Crear objeto Date tomando la fecha como año-mes-día local
  const [year, month, day] = date.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // mes en 0-11

  return localDate.toLocaleDateString("es-CO");
};

  const lastPayment = lastPayments.length > 0 ? lastPayments[lastPayments.length - 1] : null;

  return (
    <Layout userInitial="G">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-petmanager-accent/20 flex items-center justify-center">
            <Clock className="w-8 h-8 text-petmanager-primary" />
          </div>
          <h1 className="text-3xl font-bold">Registro de pagos</h1>
        </div>

        {/* Último Pago */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Información del último pago:</h2>

          {!lastPayment && (
            <p className="text-muted-foreground">No hay pagos registrados aún.</p>
          )}

          {lastPayment && (
            <>
              {/* Fecha del último pago */}
              <p className="mb-4 text-muted-foreground">
                Último pago realizado el: <strong>{formatDate(lastPayment.paymentDate)}</strong>
              </p>

              {/* Tabla resumen */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground font-medium">Cantidad</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Producto</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Precio unitario</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {lastPayment.products.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>${item.pricePerUnit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        ${(item.quantity * item.pricePerUnit).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${lastPayment.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </div>

        {/* Próximo Pago */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Información del próximo pago:</h2>

          <div className="border rounded-lg p-8 text-center bg-muted/30">
            {nextPayment ? (
              <p className="text-muted-foreground mb-4">
                Próximo pago programado para: <strong>{formatDate(nextPayment.paymentDate)}</strong>
              </p>
            ) : (
              <p className="text-muted-foreground mb-4">
                No hay un próximo pago programado.
              </p>
            )}

            <Button 
              onClick={() => navigate(`/proveedores/${id}/programar-pago`)}
              className="bg-petmanager-accent hover:bg-petmanager-accent/90 text-foreground"
            >
              {nextPayment ? "Modificar pago" : "Programar pago"}
            </Button>
          </div>
        </div>

        {/* Botón regresar */}
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
