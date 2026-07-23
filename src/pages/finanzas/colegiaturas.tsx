import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Colegiatura, AlumnoFull, CicloEscolar } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatMoney, formatDate } from "@/lib/format";
import { Plus, RefreshCw, Wand2 } from "lucide-react";

const ESTATUS_COLOR: Record<string, string> = {
  PAGADA: "text-green-600",
  PENDIENTE: "text-amber-600",
  PARCIAL: "text-blue-600",
  VENCIDA: "text-red-600",
  CANCELADA: "text-muted-foreground",
};

export default function ColegiaturasPage() {
  const [colegiaturas, setColegiaturas] = useState<Colegiatura[]>([]);
  const [alumnos, setAlumnos] = useState<AlumnoFull[]>([]);
  const [ciclos, setCiclos] = useState<CicloEscolar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showGenerar, setShowGenerar] = useState(false);
  const [pagoDe, setPagoDe] = useState<Colegiatura | null>(null);
  const [form, setForm] = useState({ alumnoId: "", cicloEscolarId: "", concepto: "Colegiatura", monto: 0, descuento: 0, recargo: 0, fechaVencimiento: "" });
  const [gen, setGen] = useState({ cicloEscolarId: "", concepto: "Colegiatura", monto: 0, fechaVencimiento: "" });
  const [pago, setPago] = useState({ monto: 0, metodo: "EFECTIVO", referencia: "" });

  const load = async () => {
    try {
      const [c, a, ci] = await Promise.all([api.getColegiaturas(), api.getAlumnos(), api.getCiclos()]);
      setColegiaturas(c);
      setAlumnos(a);
      setCiclos(ci);
    } catch { toast.error("Error al cargar colegiaturas"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ alumnoId: "", cicloEscolarId: "", concepto: "Colegiatura", monto: 0, descuento: 0, recargo: 0, fechaVencimiento: "" });
    setShowForm(false);
  };

  const handleCreate = async () => {
    try {
      await api.createColegiatura(form as any);
      toast.success("Colegiatura creada");
      resetForm();
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleGenerar = async () => {
    try {
      const res = await api.generarCargos(gen);
      toast.success(`Cargos generados: ${res.creados} nuevos, ${res.omitidos} existentes`);
      setShowGenerar(false);
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handlePago = async () => {
    if (!pagoDe) return;
    try {
      await api.registrarPago({ colegiaturaId: pagoDe.id, monto: pago.monto, metodo: pago.metodo, referencia: pago.referencia });
      toast.success("Pago registrado");
      setPagoDe(null);
      setPago({ monto: 0, metodo: "EFECTIVO", referencia: "" });
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta colegiatura?")) return;
    try {
      await api.deleteColegiatura(id);
      toast.success("Colegiatura eliminada");
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error al eliminar"); }
  };

  const columns: Column<Colegiatura>[] = [
    { key: "alumno", header: "Alumno", render: (c) => c.alumno ? `${c.alumno.nombre} (${c.alumno.matricula})` : "—" },
    { key: "concepto", header: "Concepto" },
    { key: "cicloEscolar", header: "Ciclo", render: (c) => c.cicloEscolar?.nombre ?? "—" },
    { key: "total", header: "Total", render: (c) => formatMoney(c.total) },
    { key: "fechaVencimiento", header: "Vence", render: (c) => formatDate(c.fechaVencimiento) },
    { key: "estatus", header: "Estatus", render: (c) => <span className={ESTATUS_COLOR[c.estatus] || ""}>{c.estatus}</span> },
    {
      key: "acciones", header: "Acciones",
      render: (c) => (
        <div className="flex gap-2">
          {c.estatus !== "PAGADA" && c.estatus !== "CANCELADA" && (
            <Button variant="outline" size="sm" onClick={() => { setPagoDe(c); setPago({ monto: Number(c.total), metodo: "EFECTIVO", referencia: "" }); }}>Pagar</Button>
          )}
          <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Colegiaturas</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={() => setShowGenerar((v) => !v)}><Wand2 className="h-4 w-4 mr-1" />Generar cargos</Button>
          <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus className="h-4 w-4 mr-1" />Nueva</Button>
        </div>
      </div>

      {showGenerar && (
        <Card>
          <CardHeader><CardTitle>Generar cargos masivos por ciclo</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ciclo escolar</Label>
                <Select value={gen.cicloEscolarId} onValueChange={(v) => setGen({ ...gen, cicloEscolarId: v })}>
                  <SelectTrigger><SelectValue placeholder="Ciclo" /></SelectTrigger>
                  <SelectContent>{ciclos.map((c) => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Concepto</Label><Input value={gen.concepto} onChange={(e) => setGen({ ...gen, concepto: e.target.value })} /></div>
              <div><Label>Monto base</Label><Input type="number" value={gen.monto} onChange={(e) => setGen({ ...gen, monto: +e.target.value })} /></div>
              <div><Label>Fecha de vencimiento</Label><Input type="date" value={gen.fechaVencimiento} onChange={(e) => setGen({ ...gen, fechaVencimiento: e.target.value })} /></div>
            </div>
            <p className="text-sm text-muted-foreground">Se aplicará automáticamente la beca vigente de cada alumno inscrito en el ciclo.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowGenerar(false)}>Cancelar</Button>
              <Button onClick={handleGenerar}>Generar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Nueva Colegiatura</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Alumno</Label>
                <Select value={form.alumnoId} onValueChange={(v) => setForm({ ...form, alumnoId: v })}>
                  <SelectTrigger><SelectValue placeholder="Alumno" /></SelectTrigger>
                  <SelectContent>{alumnos.map((a) => <SelectItem key={a.id} value={a.id}>{a.nombre} ({a.matricula})</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ciclo escolar</Label>
                <Select value={form.cicloEscolarId} onValueChange={(v) => setForm({ ...form, cicloEscolarId: v })}>
                  <SelectTrigger><SelectValue placeholder="Ciclo" /></SelectTrigger>
                  <SelectContent>{ciclos.map((c) => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Concepto</Label><Input value={form.concepto} onChange={(e) => setForm({ ...form, concepto: e.target.value })} /></div>
              <div><Label>Monto</Label><Input type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: +e.target.value })} /></div>
              <div><Label>Descuento</Label><Input type="number" value={form.descuento} onChange={(e) => setForm({ ...form, descuento: +e.target.value })} /></div>
              <div><Label>Recargo</Label><Input type="number" value={form.recargo} onChange={(e) => setForm({ ...form, recargo: +e.target.value })} /></div>
              <div><Label>Fecha de vencimiento</Label><Input type="date" value={form.fechaVencimiento} onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })} /></div>
            </div>
            <p className="text-sm text-muted-foreground">Total: {formatMoney(form.monto - form.descuento + form.recargo)}</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleCreate}>Crear</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {pagoDe && (
        <Card>
          <CardHeader><CardTitle>Registrar pago — {pagoDe.concepto} ({formatMoney(pagoDe.total)})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Monto</Label><Input type="number" value={pago.monto} onChange={(e) => setPago({ ...pago, monto: +e.target.value })} /></div>
              <div>
                <Label>Método</Label>
                <Select value={pago.metodo} onValueChange={(v) => setPago({ ...pago, metodo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                    <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                    <SelectItem value="TARJETA">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Referencia</Label><Input value={pago.referencia} onChange={(e) => setPago({ ...pago, referencia: e.target.value })} /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setPagoDe(null)}>Cancelar</Button>
              <Button onClick={handlePago}>Registrar pago</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={colegiaturas} emptyMessage="No hay colegiaturas registradas" />
    </div>
  );
}
