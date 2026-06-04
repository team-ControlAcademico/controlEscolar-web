import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Materia } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";

export default function MateriasPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clave: "", nombre: "", creditos: 0, tipo: "OBLIGATORIA" as string, descripcion: "" });

  const load = async () => {
    try { setMaterias(await api.getMaterias()); }
    catch { toast.error("Error"); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ clave: "", nombre: "", creditos: 0, tipo: "OBLIGATORIA", descripcion: "" }); setShowForm(false); };

  const handleSubmit = async () => {
    try {
      await api.createMateria(form as any);
      toast.success("Materia creada");
      resetForm(); load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar?")) return;
    try { await api.deleteMateria(id); toast.success("Eliminada"); load(); }
    catch { toast.error("Error"); }
  };

  const columns: Column<Materia>[] = [
    { key: "clave", header: "Clave" },
    { key: "nombre", header: "Nombre" },
    { key: "creditos", header: "Créditos" },
    {
      key: "tipo", header: "Tipo",
      render: (m) => <span className={m.tipo === "OBLIGATORIA" ? "text-blue-600" : "text-orange-600"}>{m.tipo}</span>,
    },
    {
      key: "acciones", header: "",
      render: (m) => <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}>Eliminar</Button>,
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Materias</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-1" />Nueva</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Nueva Materia</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Clave</Label><Input value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} placeholder="MAT-101" /></div>
              <div><Label>Nombre</Label><Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></div>
              <div><Label>Créditos</Label><Input type="number" value={form.creditos} onChange={(e) => setForm({ ...form, creditos: +e.target.value })} /></div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OBLIGATORIA">Obligatoria</SelectItem>
                    <SelectItem value="OPTATIVA">Optativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Descripción</Label><Input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleSubmit}>Crear</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={materias} />
    </div>
  );
}
