import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CalificacionGrupoResult } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";

interface CalRegistro {
  alumnoId: string;
  nombre: string;
  matricula: string;
  calificacion: string;
}

export default function CalificacionesGrupoPage() {
  const { id: grupoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<CalificacionGrupoResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unidad, setUnidad] = useState(1);
  const [tipo, setTipo] = useState("ORDINARIO");
  const [registros, setRegistros] = useState<CalRegistro[]>([]);

  const loadData = async () => {
    if (!grupoId) return;
    setLoading(true);
    try {
      const result = await api.getCalificacionesGrupo(grupoId);
      setData(result);

      // Inicializar registros con valores existentes
      const regs = result.alumnos.map((al) => {
        const calUnidad = al.unidades[unidad];
        const calTipo = calUnidad?.find((c) => c.tipo === tipo);
        return {
          alumnoId: al.alumnoId,
          nombre: al.nombre,
          matricula: al.matricula,
          calificacion: calTipo ? String(calTipo.calificacion) : "",
        };
      });
      setRegistros(regs);
    } catch {
      toast.error("Error al cargar calificaciones");
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [grupoId]);

  // Recargar registros cuando cambia unidad o tipo
  useEffect(() => {
    if (!data) return;
    const regs = data.alumnos.map((al) => {
      const calUnidad = al.unidades[unidad];
      const calTipo = calUnidad?.find((c) => c.tipo === tipo);
      return {
        alumnoId: al.alumnoId,
        nombre: al.nombre,
        matricula: al.matricula,
        calificacion: calTipo ? String(calTipo.calificacion) : "",
      };
    });
    setRegistros(regs);
  }, [unidad, tipo, data]);

  const setCalificacion = (alumnoId: string, value: string) => {
    // Validar que sea un número válido o vacío
    if (value !== "" && !/^\d{0,2}(\.\d{0,1})?$/.test(value)) return;
    const num = parseFloat(value);
    if (value !== "" && !isNaN(num) && num > 10) return;

    setRegistros((prev) =>
      prev.map((r) => (r.alumnoId === alumnoId ? { ...r, calificacion: value } : r))
    );
  };

  const handleGuardar = async () => {
    if (!grupoId) return;

    const registrosValidos = registros
      .filter((r) => r.calificacion !== "")
      .map((r) => ({
        alumnoId: r.alumnoId,
        calificacion: parseFloat(r.calificacion),
      }));

    if (registrosValidos.length === 0) {
      toast.error("No hay calificaciones para guardar");
      return;
    }

    // Validar rango
    for (const r of registrosValidos) {
      if (r.calificacion < 0 || r.calificacion > 10) {
        toast.error("Las calificaciones deben estar entre 0 y 10");
        return;
      }
    }

    setSaving(true);
    try {
      await api.registrarCalificaciones(grupoId, unidad, tipo, registrosValidos);
      toast.success("Calificaciones guardadas");
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al guardar");
    }
    setSaving(false);
  };

  const getColorForGrade = (cal: string) => {
    const n = parseFloat(cal);
    if (isNaN(n)) return "";
    if (n >= 9) return "text-green-600 font-semibold";
    if (n >= 7) return "text-blue-600";
    if (n >= 6) return "text-yellow-600";
    return "text-red-600 font-semibold";
  };

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate("/grupos")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Captura de Calificaciones</h1>
          {data && (
            <p className="text-sm text-muted-foreground">
              {data.grupo.clave} — {data.grupo.materia.nombre}
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Unidad:</label>
          <Select value={String(unidad)} onValueChange={(v) => setUnidad(Number(v))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Tipo:</label>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ORDINARIO">Ordinario</SelectItem>
              <SelectItem value="EXTRAORDINARIO">Extraordinario</SelectItem>
              <SelectItem value="TITULO">Título</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" onClick={loadData}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Grades Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Unidad {unidad} — {tipo === "ORDINARIO" ? "Ordinario" : tipo === "EXTRAORDINARIO" ? "Extraordinario" : "Título"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground w-28">Matrícula</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Alumno</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground w-36">Calificación</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground w-28">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((r) => {
                  const alumnoData = data?.alumnos.find((a) => a.alumnoId === r.alumnoId);
                  return (
                    <tr key={r.alumnoId} className="border-t hover:bg-muted/30">
                      <td className="px-4 py-3 text-sm font-mono">{r.matricula}</td>
                      <td className="px-4 py-3 text-sm font-medium">{r.nombre}</td>
                      <td className="px-4 py-3 text-center">
                        <Input
                          type="text"
                          inputMode="decimal"
                          value={r.calificacion}
                          onChange={(e) => setCalificacion(r.alumnoId, e.target.value)}
                          placeholder="0-10"
                          className={`h-8 w-20 text-center mx-auto ${getColorForGrade(r.calificacion)}`}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-sm ${alumnoData?.promedio != null ? getColorForGrade(String(alumnoData.promedio)) : "text-muted-foreground"}`}>
                          {alumnoData?.promedio != null ? alumnoData.promedio.toFixed(1) : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Overview — existing grades across all units */}
      {data && data.alumnos.some((a) => Object.keys(a.unidades).length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen por Unidad</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Alumno</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U1</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U2</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U3</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.alumnos.map((al) => (
                    <tr key={al.alumnoId} className="border-t">
                      <td className="px-4 py-2 text-sm">{al.nombre}</td>
                      {[1, 2, 3].map((u) => {
                        const cal = al.unidades[u]?.find((c) => c.tipo === "ORDINARIO");
                        return (
                          <td key={u} className={`px-4 py-2 text-sm text-center ${cal ? getColorForGrade(String(cal.calificacion)) : "text-muted-foreground"}`}>
                            {cal ? cal.calificacion.toFixed(1) : "—"}
                          </td>
                        );
                      })}
                      <td className={`px-4 py-2 text-sm text-center font-bold ${al.promedio != null ? getColorForGrade(String(al.promedio)) : "text-muted-foreground"}`}>
                        {al.promedio != null ? al.promedio.toFixed(1) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleGuardar} disabled={saving} className="min-w-[180px]">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Calificaciones"}
        </Button>
      </div>
    </div>
  );
}
