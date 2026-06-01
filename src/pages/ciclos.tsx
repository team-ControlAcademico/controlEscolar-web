import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { CicloEscolar } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";

export default function CiclosPage() {
  const [ciclos, setCiclos] = useState<CicloEscolar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", fechaInicio: "", fechaFin: "", tipo: "CUATRIMESTRAL" });

  const load = async () => {
    try { setCiclos(await api.getCiclos()); }
    catch { toast.error("Error"); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ nombre: "", fechaInicio: "", fechaFin: "", tipo: "CUATRIMESTRAL" }); setShowForm(false); };

  const handleSubmit = async () => {
    try {
      await api.createCiclo(form);
      toast.success("Ciclo creado");
      resetForm(); load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleToggle = async (id: string) => {
    try { await api.toggleCiclo(id); toast.success("Estado cambiado"); load(); }
    catch { toast.error("Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar?")) return;
    try { await api.deleteCiclo(id); toast.success("Eliminado"); load(); }
    catch { toast.error("Error"); }
  };

  const columns: Column<CicloEscolar>[] = [
    { key: "nombre", header: "Nombre" },
    { key: "tipo", header: "Tipo" },
    {
      key: "fechaInicio", header: "Inicio",
      render: (c) => new Date(c.fechaInicio).toLocaleDateString("es-MX"),
    },
    {
      key: "fechaFin", header: "Fin",
      render: (c) => new Date(c.fechaFin).toLocaleDateString("es-MX"),
    },
    {
      key: "activo", header: "Estado",
      render: (c) => (
        <Button variant={c.activo ? "default" : "outline"} size="sm" onClick={(e) => { e.stopPropagation(); handleToggle(c.id); }}>
          {c.activo ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      key: "acciones", header: "",
      render: (c) => <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}>Eliminar</Button>,
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ciclos Escolares</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-1" />Nuevo</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Nuevo Ciclo</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Nombre</Label><Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ene-Abr 2024" /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Inicio</Label><Input type="date" value={form.fechaInicio} onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })} /></div>
              <div><Label>Fin</Label><Input type="date" value={form.fechaFin} onChange={(e) => setForm({ ...form, fechaFin: e.target.value })} /></div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUATRIMESTRAL">Cuatrimestral</SelectItem>
                    <SelectItem value="MODULAR">Modular</SelectItem>
                    <SelectItem value="RECURSAMIENTO">Recursamiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleSubmit}>Crear</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={ciclos} />
    </div>
  );
}
