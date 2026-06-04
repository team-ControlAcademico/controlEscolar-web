import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { PlanEstudio, Carrera } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";

export default function PlanesPage() {
  const [planes, setPlanes] = useState<PlanEstudio[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clave: "", nombre: "", carreraId: "" });

  const load = async () => {
    try {
      const [p, c] = await Promise.all([api.getPlanes(), api.getCarreras()]);
      setPlanes(p);
      setCarreras(c);
    } catch { toast.error("Error al cargar"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    try {
      await api.createPlan(form);
      toast.success("Plan creado");
      setForm({ clave: "", nombre: "", carreraId: "" });
      setShowForm(false);
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este plan?")) return;
    try { await api.deletePlan(id); toast.success("Plan eliminado"); load(); }
    catch { toast.error("Error"); }
  };

  const columns: Column<PlanEstudio>[] = [
    { key: "clave", header: "Clave" },
    { key: "nombre", header: "Nombre" },
    {
      key: "carrera",
      header: "Carrera",
      render: (p) => p.carrera?.nombre ?? "-",
    },
    {
      key: "materias",
      header: "Materias",
      render: (p) => p._count?.materias ?? 0,
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (p) => (
        <div className="flex gap-2">
          <Link to={`/planes/${p.id}`}><Button variant="outline" size="sm">Ver</Button></Link>
          <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}>Eliminar</Button>
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Planes de Estudio</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-1" />Nuevo</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Nuevo Plan</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Clave</Label>
              <Input value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} placeholder="Ej: PLAN-ISW-2024" />
            </div>
            <div>
              <Label>Nombre</Label>
              <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del plan" />
            </div>
            <div>
              <Label>Carrera</Label>
              <Select value={form.carreraId} onValueChange={(v) => setForm({ ...form, carreraId: v })}>
                <SelectTrigger><SelectValue placeholder="Selecciona carrera" /></SelectTrigger>
                <SelectContent>
                  {carreras.map((c) => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button onClick={handleSubmit}>Crear</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={planes} />
    </div>
  );
}
