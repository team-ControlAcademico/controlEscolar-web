import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { ReporteFinanciero, CicloEscolar } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatMoney } from "@/lib/format";

type CicloRow = ReporteFinanciero["porCiclo"][number] & { id: string };

export default function ReportesFinancierosPage() {
  const [reporte, setReporte] = useState<ReporteFinanciero | null>(null);
  const [ciclos, setCiclos] = useState<CicloEscolar[]>([]);
  const [cicloId, setCicloId] = useState("todos");
  const [loading, setLoading] = useState(true);

  const load = async (ciclo?: string) => {
    try {
      const [r, c] = await Promise.all([
        api.getReporteFinanciero(ciclo && ciclo !== "todos" ? ciclo : undefined),
        ciclos.length ? Promise.resolve(ciclos) : api.getCiclos(),
      ]);
      setReporte(r);
      if (!ciclos.length) setCiclos(c as CicloEscolar[]);
    } catch { toast.error("Error al cargar el reporte"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onCiclo = (v: string) => { setCicloId(v); load(v); };

  const columns: Column<CicloRow>[] = [
    { key: "ciclo", header: "Ciclo" },
    { key: "ingresos", header: "Ingresos", render: (r) => formatMoney(r.ingresos) },
    { key: "cartera", header: "Cartera pendiente", render: (r) => formatMoney(r.cartera) },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  const filas: CicloRow[] = (reporte?.porCiclo ?? []).map((r) => ({ ...r, id: r.cicloEscolarId }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reportes Financieros</h1>
        <div className="w-56">
          <Label className="sr-only">Ciclo</Label>
          <Select value={cicloId} onValueChange={onCiclo}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los ciclos</SelectItem>
              {ciclos.map((c) => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {reporte && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ingresos</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{formatMoney(reporte.resumen.totalIngresos)}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Cartera</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{formatMoney(reporte.resumen.totalCartera)}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Cartera vencida</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-red-600">{formatMoney(reporte.resumen.carteraVencida)}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alumnos con adeudo</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{reporte.resumen.alumnosConAdeudo}</p></CardContent></Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Desglose por ciclo</h2>
            <DataTable columns={columns} data={filas} emptyMessage="Sin datos" />
          </div>
        </>
      )}
    </div>
  );
}
