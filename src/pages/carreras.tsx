import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Carrera } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";

export default function CarrerasPage() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Carrera | null>(null);
  const [form, setForm] = useState({ clave: "", nombre: "", descripcion: "", creditosTotales: 0, duracionSemestres: 8 });
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await api.getCarreras();
      setCarreras(data);
    } catch { toast.error("Error al cargar carreras"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ clave: "", nombre: "", descripcion: "", creditosTotales: 0, duracionSemestres: 8 });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await api.updateCarrera(editing.id, form);
        toast.success("Carrera actualizada");
      } else {
        await api.createCarrera(form as any);
        toast.success("Carrera creada");
      }
      resetForm();
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta carrera?")) return;
    try {
      await api.deleteCarrera(id);
      toast.success("Carrera eliminada");
      load();
    } catch { toast.error("Error al eliminar"); }
  };

  const startEdit = (c: Carrera) => {
    setEditing(c);
    setForm({ clave: c.clave, nombre: c.nombre, descripcion: c.descripcion || "", creditosTotales: c.creditosTotales, duracionSemestres: c.duracionSemestres });
    setShowForm(true);
  };

  const columns: Column<Carrera>[] = [
    { key: "clave", header: "Clave" },
    { key: "nombre", header: "Nombre" },
    { key: "creditosTotales", header: "Créditos" },
    { key: "duracionSemestres", header: "Semestres" },
    {
      key: "activa",
      header: "Activa",
      render: (c) => <span className={c.activa ? "text-green-600" : "text-red-600"}>{c.activa ? "Sí" : "No"}</span>,
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (c) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); startEdit(c); }}>Editar</Button>
          <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}>Eliminar</Button>
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Carreras</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus className="h-4 w-4 mr-1" />Nueva</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>{editing ? "Editar Carrera" : "Nueva Carrera"}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Clave</Label>
                <Input value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} placeholder="Ej: ISW" />
              </div>
              <div>
                <Label>Nombre</Label>
                <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre de la carrera" />
              </div>
              <div>
                <Label>Créditos Totales</Label>
                <Input type="number" value={form.creditosTotales} onChange={(e) => setForm({ ...form, creditosTotales: +e.target.value })} />
              </div>
              <div>
                <Label>Duración (semestres)</Label>
                <Input type="number" value={form.duracionSemestres} onChange={(e) => setForm({ ...form, duracionSemestres: +e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Descripción</Label>
              <Input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleSubmit}>{editing ? "Actualizar" : "Crear"}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={carreras} />
    </div>
  );
}
