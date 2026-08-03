import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { EstadoCuenta, AlumnoFull, EstadoCuentaMovimiento } from "@/types";
import * as api from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatMoney, formatDate } from "@/lib/format";

const ESTATUS_COLOR: Record<string, string> = {
  PAGADA: "text-green-600",
  PENDIENTE: "text-amber-600",
  PARCIAL: "text-blue-600",
  VENCIDA: "text-red-600",
  CANCELADA: "text-muted-foreground",
};

export default function EstadoCuentaPage() {
  const { user } = useAuthStore();
  const esAlumno = user?.role === "ALUMNO" || user?.role === "PADRE";

  const [estado, setEstado] = useState<EstadoCuenta | null>(null);
  const [alumnos, setAlumnos] = useState<AlumnoFull[]>([]);
  const [alumnoId, setAlumnoId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (esAlumno) {
          setEstado(await api.getMiEstadoCuenta());
        } else {
          setAlumnos(await api.getAlumnos());
        }
      } catch { toast.error("Error al cargar estado de cuenta"); }
      setLoading(false);
    })();
  }, [esAlumno]);

  const cargarAlumno = async (id: string) => {
    setAlumnoId(id);
    if (!id) { setEstado(null); return; }
    try {
      setEstado(await api.getEstadoCuenta(id));
    } catch { toast.error("Error al cargar estado de cuenta"); }
  };

  const handlePagar = async (movimiento: EstadoCuentaMovimiento) => {
    try {
      await api.pagarEnLinea({ colegiaturaId: movimiento.id, monto: Number(movimiento.saldo) });
      toast.success("Pago en línea exitoso");
      // Recargar datos
      if (esAlumno) {
        setEstado(await api.getMiEstadoCuenta());
      } else {
        setEstado(await api.getEstadoCuenta(alumnoId));
      }
    } catch (e) {
      toast.error("Error al procesar el pago");
    }
  };

  const columns: Column<EstadoCuentaMovimiento>[] = [
    { key: "concepto", header: "Concepto" },
    { key: "cicloEscolar", header: "Ciclo", render: (m) => m.cicloEscolar?.nombre ?? "—" },
    { key: "total", header: "Total", render: (m) => formatMoney(m.total) },
    { key: "pagado", header: "Pagado", render: (m) => formatMoney(m.pagado) },
    { key: "saldo", header: "Saldo", render: (m) => <span className={Number(m.saldo) > 0 ? "font-medium" : ""}>{formatMoney(m.saldo)}</span> },
    { key: "fechaVencimiento", header: "Vence", render: (m) => formatDate(m.fechaVencimiento) },
    { key: "estatus", header: "Estatus", render: (m) => <span className={ESTATUS_COLOR[m.estatus] || ""}>{m.estatus}</span> },
    { 
      key: "acciones", 
      header: "Acciones", 
      render: (m) => esAlumno && (m.estatus === "PENDIENTE" || m.estatus === "PARCIAL" || m.estatus === "VENCIDA") ? (
        <Button size="sm" onClick={() => handlePagar(m)}>Pagar</Button>
      ) : null
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Estado de Cuenta</h1>

      {!esAlumno && (
        <div className="max-w-sm">
          <Label>Alumno</Label>
          <Select value={alumnoId} onValueChange={cargarAlumno}>
            <SelectTrigger><SelectValue placeholder="Selecciona un alumno" /></SelectTrigger>
            <SelectContent>{alumnos.map((a) => <SelectItem key={a.id} value={a.id}>{a.nombre} ({a.matricula})</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}

      {estado && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total cargado</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{formatMoney(estado.resumen.totalCargado)}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total pagado</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{formatMoney(estado.resumen.totalPagado)}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Saldo</CardTitle></CardHeader><CardContent><p className={`text-2xl font-bold ${Number(estado.resumen.saldoTotal) > 0 ? "text-red-600" : "text-green-600"}`}>{formatMoney(estado.resumen.saldoTotal)}</p></CardContent></Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">{estado.alumno.nombre} — {estado.alumno.matricula}</h2>
            <DataTable columns={columns} data={estado.movimientos} emptyMessage="Sin movimientos" />
          </div>

          {estado.becas.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Becas vigentes</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                {estado.becas.map((b) => (
                  <p key={b.id} className="text-sm">{b.tipo}: <span className="font-medium">{Number(b.porcentaje)}%</span> ({formatDate(b.vigenciaInicio)} – {formatDate(b.vigenciaFin)})</p>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
