import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Inscripcion, Grupo, AlumnoFull } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";

export default function InscripcionesPage() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [alumnos, setAlumnos] = useState<AlumnoFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ alumnoId: "", grupoId: "" });

  const load = async () => {
    try {
      const [insc, g, a] = await Promise.all([api.getInscripciones(), api.getGrupos(), api.getAlumnos()]);
      setInscripciones(insc); setGrupos(g); setAlumnos(a);
    } catch { toast.error("Error"); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ alumnoId: "", grupoId: "" }); setShowForm(false); };

  const handleInscribir = async () => {
    try {
      await api.inscribirAlumno(form.alumnoId, form.grupoId);
      toast.success("Alumno inscrito");
      resetForm(); load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Dar de baja?")) return;
    try { await api.deleteInscripcion(id); toast.success("Baja registrada"); load(); }
    catch { toast.error("Error"); }
  };

  const columns: Column<Inscripcion>[] = [
    {
      key: "alumno", header: "Alumno",
      render: (i) => <span>{i.alumno?.nombre} <span className="text-xs text-muted-foreground">({i.alumno?.matricula})</span></span>,
    },
    {
      key: "materia", header: "Materia",
      render: (i) => i.grupo?.materia?.nombre ?? "-",
    },
    {
      key: "grupo", header: "Grupo",
      render: (i) => i.grupo?.clave ?? "-",
    },
    {
      key: "docente", header: "Docente",
      render: (i) => i.grupo?.docente?.nombre ?? "-",
    },
    {
      key: "estatus", header: "Estatus",
      render: (i) => <span className={`px-2 py-0.5 rounded-full text-xs ${i.estatus === "INSCRITO" ? "bg-green-100 text-green-700" : i.estatus === "BAJA" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{i.estatus}</span>,
    },
    {
      key: "acciones", header: "",
      render: (i) => <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(i.id); }}>Dar de baja</Button>,
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inscripciones</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-1" />Nueva</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Nueva Inscripción</CardTitle></CardHeader>
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
                <Label>Grupo</Label>
                <Select value={form.grupoId} onValueChange={(v) => setForm({ ...form, grupoId: v })}>
                  <SelectTrigger><SelectValue placeholder="Grupo" /></SelectTrigger>
                  <SelectContent>
                    {grupos.map((g) => <SelectItem key={g.id} value={g.id}>{g.clave} - {g.materia?.nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleInscribir} disabled={!form.alumnoId || !form.grupoId}>Inscribir</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={inscripciones} />
    </div>
  );
}
