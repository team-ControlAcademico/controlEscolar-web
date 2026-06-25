import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Grupo, Horario } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, RefreshCw, Trash2, Clock } from "lucide-react";

const DIAS = [
  { value: "LUNES", label: "Lunes" },
  { value: "MARTES", label: "Martes" },
  { value: "MIERCOLES", label: "Miércoles" },
  { value: "JUEVES", label: "Jueves" },
  { value: "VIERNES", label: "Viernes" },
  { value: "SABADO", label: "Sábado" },
];

const DIA_ORDEN: Record<string, number> = {
  LUNES: 1, MARTES: 2, MIERCOLES: 3, JUEVES: 4, VIERNES: 5, SABADO: 6,
};

export default function HorariosGrupoPage() {
  const { id: grupoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ dia: "LUNES", horaInicio: "", horaFin: "", aula: "" });

  const load = async () => {
    if (!grupoId) return;
    try {
      const g = await api.getGrupo(grupoId);
      setGrupo(g);
      setForm((f) => ({ ...f, aula: f.aula || g.aula || "" }));
    } catch {
      toast.error("Error al cargar el grupo");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [grupoId]);

  const handleAgregar = async () => {
    if (!grupoId) return;
    if (!form.horaInicio || !form.horaFin) {
      toast.error("Indica hora de inicio y fin");
      return;
    }
    if (form.horaFin <= form.horaInicio) {
      toast.error("La hora de fin debe ser posterior a la de inicio");
      return;
    }
    setSaving(true);
    try {
      await api.addHorario(grupoId, {
        dia: form.dia,
        horaInicio: form.horaInicio,
        horaFin: form.horaFin,
        aula: form.aula || null,
      });
      toast.success("Horario agregado");
      setForm({ dia: "LUNES", horaInicio: "", horaFin: "", aula: grupo?.aula || "" });
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al agregar horario");
    }
    setSaving(false);
  };

  const handleQuitar = async (horarioId: string) => {
    if (!grupoId) return;
    if (!confirm("¿Eliminar este horario?")) return;
    try {
      await api.removeHorario(grupoId, horarioId);
      toast.success("Horario eliminado");
      load();
    } catch {
      toast.error("Error al eliminar horario");
    }
  };

  const horarios = [...(grupo?.horarios || [])].sort((a, b) => {
    const d = (DIA_ORDEN[a.dia] ?? 9) - (DIA_ORDEN[b.dia] ?? 9);
    return d !== 0 ? d : a.horaInicio.localeCompare(b.horaInicio);
  });

  const diaLabel = (dia: string) => DIAS.find((d) => d.value === dia)?.label ?? dia;

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;
  if (!grupo) return <p className="p-4">Grupo no encontrado</p>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate("/grupos")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Horarios del Grupo</h1>
          <p className="text-sm text-muted-foreground">
            {grupo.clave} — {grupo.materia?.nombre ?? ""}
            {grupo.docente?.nombre ? ` · ${grupo.docente.nombre}` : ""}
          </p>
        </div>
      </div>

      {/* Form: agregar horario */}
      <Card>
        <CardHeader><CardTitle>Agregar Horario</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <Label>Día</Label>
              <Select value={form.dia} onValueChange={(v) => setForm({ ...form, dia: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DIAS.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Hora inicio</Label>
              <Input type="time" value={form.horaInicio} onChange={(e) => setForm({ ...form, horaInicio: e.target.value })} />
            </div>
            <div>
              <Label>Hora fin</Label>
              <Input type="time" value={form.horaFin} onChange={(e) => setForm({ ...form, horaFin: e.target.value })} />
            </div>
            <div>
              <Label>Aula</Label>
              <Input value={form.aula} onChange={(e) => setForm({ ...form, aula: e.target.value })} placeholder="A-201" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAgregar} disabled={saving}>
              <Plus className="h-4 w-4 mr-1" />{saving ? "Agregando..." : "Agregar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de horarios */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Horarios asignados</CardTitle>
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent>
          {horarios.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
              <Clock className="h-8 w-8" />
              <p className="text-sm">Este grupo aún no tiene horarios asignados.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {horarios.map((h: Horario) => (
                <div key={h.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium w-24">{diaLabel(h.dia)}</span>
                    <span>{h.horaInicio} - {h.horaFin}</span>
                    {h.aula && <span className="text-muted-foreground">Aula: {h.aula}</span>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleQuitar(h.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
