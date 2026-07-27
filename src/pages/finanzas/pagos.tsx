import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Pago } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { formatMoney, formatDate } from "@/lib/format";
import { RefreshCw } from "lucide-react";

export default function PagosPage() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setPagos(await api.getPagos());
    } catch { toast.error("Error al cargar pagos"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCancelar = async (id: string) => {
    if (!confirm("¿Cancelar este pago? El saldo de la colegiatura se recalculará.")) return;
    try {
      await api.cancelarPago(id);
      toast.success("Pago cancelado");
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const columns: Column<Pago>[] = [
    { key: "fecha", header: "Fecha", render: (p) => formatDate(p.fecha) },
    { key: "alumno", header: "Alumno", render: (p) => p.alumno ? `${p.alumno.nombre} (${p.alumno.matricula})` : "—" },
    { key: "colegiatura", header: "Concepto", render: (p) => p.colegiatura?.concepto ?? "—" },
    { key: "monto", header: "Monto", render: (p) => formatMoney(p.monto) },
    { key: "metodo", header: "Método" },
    { key: "referencia", header: "Referencia", render: (p) => p.referencia || "—" },
    { key: "estatus", header: "Estatus", render: (p) => <span className={p.estatus === "CANCELADO" ? "text-red-600" : "text-green-600"}>{p.estatus}</span> },
    { key: "factura", header: "Factura", render: (p) => p.factura ? p.factura.cfdiUuid.slice(0, 8) + "…" : "—" },
    {
      key: "acciones", header: "Acciones",
      render: (p) => p.estatus === "CONFIRMADO"
        ? <Button variant="destructive" size="sm" onClick={() => handleCancelar(p.id)}>Cancelar</Button>
        : null,
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
      </div>
      <DataTable columns={columns} data={pagos} emptyMessage="No hay pagos registrados" />
    </div>
  );
}
