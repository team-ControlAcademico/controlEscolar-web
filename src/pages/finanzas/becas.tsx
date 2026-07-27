import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Beca, AlumnoFull } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { Plus, RefreshCw } from "lucide-react";

const TIPOS = ["ACADEMICA", "DEPORTIVA", "CONVENIO", "SOCIOECONOMICA"];

export default function BecasPage() {
  const [becas, setBecas] = useState<Beca[]>([]);
  const [alumnos, setAlumnos] = useState<AlumnoFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Beca | null>(null);
  const [form, setForm] = useState({ alumnoId: "", tipo: "ACADEMICA", porcentaje: 0, descripcion: "", vigenciaInicio: "", vigenciaFin: "" });

  const load = async () => {
    try {
      const [b, a] = await Promise.all([api.getBecas(), api.getAlumnos()]);
      setBecas(b);
      setAlumnos(a);
    } catch { toast.error("Error al cargar becas"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ alumnoId: "", tipo: "ACADEMICA", porcentaje: 0, descripcion: "", vigenciaInicio: "", vigenciaFin: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await api.updateBeca(editing.id, { tipo: form.tipo, porcentaje: form.porcentaje as any, descripcion: form.descripcion, vigenciaInicio: form.vigenciaInicio, vigenciaFin: form.vigenciaFin });
        toast.success("Beca actualizada");
      } else {
        await api.createBeca(form as any);
        toast.success("Beca creada");
      }
      resetForm();
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const startEdit = (b: Beca) => {
    setEditing(b);
    setForm({
      alumnoId: b.alumnoId || "",
      tipo: b.tipo,
      porcentaje: Number(b.porcentaje),
      descripcion: b.descripcion || "",
      vigenciaInicio: b.vigenciaInicio.slice(0, 10),
      vigenciaFin: b.vigenciaFin.slice(0, 10),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta beca?")) return;
    try {
      await api.deleteBeca(id);
      toast.success("Beca eliminada");
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const columns: Column<Beca>[] = [
    { key: "alumno", header: "Alumno", render: (b) => b.alumno ? `${b.alumno.nombre} (${b.alumno.matricula})` : "—" },
    { key: "tipo", header: "Tipo" },
    { key: "porcentaje", header: "%", render: (b) => `${Number(b.porcentaje)}%` },
    { key: "vigenciaInicio", header: "Desde", render: (b) => formatDate(b.vigenciaInicio) },
    { key: "vigenciaFin", header: "Hasta", render: (b) => formatDate(b.vigenciaFin) },
    { key: "activa", header: "Activa", render: (b) => <span className={b.activa ? "text-green-600" : "text-red-600"}>{b.activa ? "Sí" : "No"}</span> },
    {
      key: "acciones", header: "Acciones",
      render: (b) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => startEdit(b)}>Editar</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Becas</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus className="h-4 w-4 mr-1" />Nueva</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>{editing ? "Editar Beca" : "Nueva Beca"}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Alumno</Label>
                <Select value={form.alumnoId} onValueChange={(v) => setForm({ ...form, alumnoId: v })} disabled={!!editing}>
                  <SelectTrigger><SelectValue placeholder="Alumno" /></SelectTrigger>
                  <SelectContent>{alumnos.map((a) => <SelectItem key={a.id} value={a.id}>{a.nombre} ({a.matricula})</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TIPOS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Porcentaje (%)</Label><Input type="number" value={form.porcentaje} onChange={(e) => setForm({ ...form, porcentaje: +e.target.value })} /></div>
              <div><Label>Descripción</Label><Input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></div>
              <div><Label>Vigencia inicio</Label><Input type="date" value={form.vigenciaInicio} onChange={(e) => setForm({ ...form, vigenciaInicio: e.target.value })} /></div>
              <div><Label>Vigencia fin</Label><Input type="date" value={form.vigenciaFin} onChange={(e) => setForm({ ...form, vigenciaFin: e.target.value })} /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleSubmit}>{editing ? "Actualizar" : "Crear"}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={becas} emptyMessage="No hay becas registradas" />
    </div>
  );
}
