import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProviderForm from "./pages/ProviderForm";
import RoleManagement from "./pages/RoleManagement";
import Proveedores from "./pages/Proveedores";
import ProviderProfile from "./pages/ProviderProfile";
import PaymentRegistry from "./pages/PaymentRegistry";
import SchedulePayment from "./pages/SchedulePayment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/providers" element={<ProviderForm />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/proveedores/:id" element={<ProviderProfile />} />
          <Route path="/proveedores/:id/pagos" element={<PaymentRegistry />} />
          <Route path="/proveedores/:id/programar-pago" element={<SchedulePayment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
