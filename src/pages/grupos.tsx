import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Grupo, Materia, CicloEscolar, DocenteProfile } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw, ClipboardCheck, FileText } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

export default function GruposPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdminOrEscolar = user?.role === "ADMIN" || user?.role === "ESCOLAR";

  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [ciclos, setCiclos] = useState<CicloEscolar[]>([]);
  const [docentes, setDocentes] = useState<DocenteProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clave: "", materiaId: "", cicloEscolarId: "", docenteId: "", aula: "", cupoMaximo: 30 });

  const load = async () => {
    try {
      if (isAdminOrEscolar) {
        const [g, m, c, d] = await Promise.all([api.getGrupos(), api.getMaterias(), api.getCiclos(), api.getDocentes()]);
        setGrupos(g); setMaterias(m); setCiclos(c); setDocentes(d);
      } else {
        const g = await api.getGrupos({ docenteId: user?.docente?.id });
        setGrupos(g);
      }
    } catch { toast.error("Error al cargar grupos"); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ clave: "", materiaId: "", cicloEscolarId: "", docenteId: "", aula: "", cupoMaximo: 30 }); setShowForm(false); };

  const handleSubmit = async () => {
    try {
      await api.createGrupo(form);
      toast.success("Grupo creado");
      resetForm(); load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar?")) return;
    try { await api.deleteGrupo(id); toast.success("Grupo eliminado"); load(); }
    catch { toast.error("Error"); }
  };

  const columns: Column<Grupo>[] = [
    { key: "clave", header: "Clave" },
    {
      key: "materia", header: "Materia",
      render: (g) => g.materia?.nombre ?? "-",
    },
    {
      key: "docente", header: "Docente",
      render: (g) => g.docente?.nombre ?? "-",
    },
    {
      key: "ciclo", header: "Ciclo",
      render: (g) => g.cicloEscolar?.nombre ?? "-",
    },
    { key: "aula", header: "Aula" },
    {
      key: "cupo", header: "Cupo",
      render: (g) => `${g._count?.inscripciones ?? 0}/${g.cupoMaximo}`,
    },
    {
      key: "acciones", header: "Acciones",
      render: (g) => (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/grupos/${g.id}/asistencia`); }} title="Pasar lista">
            <ClipboardCheck className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/grupos/${g.id}/calificaciones`); }} title="Calificaciones">
            <FileText className="h-3.5 w-3.5" />
          </Button>
          {isAdminOrEscolar && (
            <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(g.id); }}>Eliminar</Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Grupos</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          {isAdminOrEscolar && (
            <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-1" />Nuevo</Button>
          )}
        </div>
      </div>

      {showForm && isAdminOrEscolar && (
        <Card>
          <CardHeader><CardTitle>Nuevo Grupo</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Clave</Label><Input value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} placeholder="MAT101-G1" /></div>
              <div><Label>Aula</Label><Input value={form.aula} onChange={(e) => setForm({ ...form, aula: e.target.value })} placeholder="A-201" /></div>
              <div><Label>Cupo máximo</Label><Input type="number" value={form.cupoMaximo} onChange={(e) => setForm({ ...form, cupoMaximo: +e.target.value })} /></div>
              <div>
                <Label>Materia</Label>
                <Select value={form.materiaId} onValueChange={(v) => setForm({ ...form, materiaId: v })}>
                  <SelectTrigger><SelectValue placeholder="Materia" /></SelectTrigger>
                  <SelectContent>{materias.map((m) => <SelectItem key={m.id} value={m.id}>{m.clave} - {m.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ciclo</Label>
                <Select value={form.cicloEscolarId} onValueChange={(v) => setForm({ ...form, cicloEscolarId: v })}>
                  <SelectTrigger><SelectValue placeholder="Ciclo" /></SelectTrigger>
                  <SelectContent>{ciclos.map((c) => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Docente</Label>
                <Select value={form.docenteId} onValueChange={(v) => setForm({ ...form, docenteId: v })}>
                  <SelectTrigger><SelectValue placeholder="Docente" /></SelectTrigger>
                  <SelectContent>{docentes.map((d) => <SelectItem key={d.id} value={d.id}>{d.nombre}</SelectItem>)}</SelectContent>
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

      <DataTable columns={columns} data={grupos} />
    </div>
  );
}
