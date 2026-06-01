import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type { PlanEstudio, Materia, PlanMateria } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlanDetallePage() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<PlanEstudio | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [semestre, setSemestre] = useState("1");
  const [materiaId, setMateriaId] = useState("");

  const load = async () => {
    if (!id) return;
    try {
      const [p, m] = await Promise.all([api.getPlan(id), api.getMaterias()]);
      setPlan(p);
      setMaterias(m);
    } catch { toast.error("Error al cargar"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleAgregar = async () => {
    if (!id || !materiaId) return;
    try {
      await api.agregarMateriaPlan(id, materiaId, +semestre);
      toast.success("Materia agregada");
      setMateriaId("");
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleQuitar = async (materiaId: string) => {
    if (!id) return;
    try {
      await api.quitarMateriaPlan(id, materiaId);
      toast.success("Materia removida");
      load();
    } catch { toast.error("Error"); }
  };

  const materiasPorSemestre = (plan?.materias || []).reduce((acc, pm) => {
    const s = pm.semestre;
    if (!acc[s]) acc[s] = [];
    acc[s].push(pm);
    return acc;
  }, {} as Record<number, PlanMateria[]>);

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;
  if (!plan) return <p>Plan no encontrado</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{plan.nombre} <span className="text-muted-foreground text-lg">({plan.clave})</span></h1>
      <p className="text-muted-foreground">Carrera: {plan.carrera?.nombre}</p>

      <Card>
        <CardHeader><CardTitle>Agregar Materia</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Semestre</Label>
              <Select value={semestre} onValueChange={setSemestre}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>Semestre {n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Materia</Label>
              <Select value={materiaId} onValueChange={setMateriaId}>
                <SelectTrigger><SelectValue placeholder="Selecciona materia" /></SelectTrigger>
                <SelectContent>
                  {materias.map((m) => <SelectItem key={m.id} value={m.id}>{m.clave} - {m.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAgregar} disabled={!materiaId}>Agregar Materia</Button>
        </CardContent>
      </Card>

      {Object.entries(materiasPorSemestre)
        .sort(([a], [b]) => +a - +b)
        .map(([s, planMaterias]) => (
          <Card key={s}>
            <CardHeader><CardTitle>Semestre {s}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {(planMaterias || []).map((pm) => (
                <div key={pm.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span className="font-medium">{pm.materia.clave}</span>
                    <span className="ml-2">{pm.materia.nombre}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{pm.materia.creditos} créditos</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleQuitar(pm.id)}>Quitar</Button>
                </div>
              ))}
              {(!materias || materias.length === 0) && <p className="text-muted-foreground text-sm">Sin materias</p>}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
