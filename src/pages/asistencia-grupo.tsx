import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Asistencia, AsistenciaEstadistica } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface AlumnoAsistencia {
  alumnoId: string;
  nombre: string;
  matricula: string;
  presente: boolean;
  justificacion: string;
}

export default function AsistenciaGrupoPage() {
  const { id: grupoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]);
  const [alumnos, setAlumnos] = useState<AlumnoAsistencia[]>([]);
  const [estadisticas, setEstadisticas] = useState<AsistenciaEstadistica[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [grupoInfo, setGrupoInfo] = useState<{ clave: string; materia?: { nombre: string } } | null>(null);
  const [showStats, setShowStats] = useState(false);

  const loadGrupoData = async () => {
    if (!grupoId) return;
    setLoading(true);
    try {
      const grupo = await api.getGrupo(grupoId);
      setGrupoInfo({ clave: grupo.clave, materia: grupo.materia ? { nombre: grupo.materia.nombre } : undefined });

      // Obtener inscripciones para lista de alumnos
      const inscripciones = await api.getInscripciones({ grupoId });
      const alumnosInscritos = inscripciones
        .filter((i) => i.estatus === "INSCRITO")
        .map((i) => ({
          alumnoId: i.alumnoId,
          nombre: i.alumno?.nombre ?? "Sin nombre",
          matricula: i.alumno?.matricula ?? "",
          presente: true,
          justificacion: "",
        }));

      // Cargar asistencia existente para la fecha
      try {
        const existente = await api.getAsistenciaGrupo(grupoId, fecha);
        const existMap = new Map(existente.map((a: Asistencia) => [a.alumnoId, a]));

        const merged = alumnosInscritos.map((al) => {
          const exist = existMap.get(al.alumnoId);
          if (exist) {
            return { ...al, presente: exist.presente, justificacion: exist.justificacion || "" };
          }
          return al;
        });
        setAlumnos(merged);
      } catch {
        setAlumnos(alumnosInscritos);
      }

      // Cargar estadísticas
      try {
        const stats = await api.getEstadisticasAsistencia(grupoId);
        setEstadisticas(stats);
      } catch {
        setEstadisticas([]);
      }
    } catch {
      toast.error("Error al cargar datos del grupo");
    }
    setLoading(false);
  };

  useEffect(() => { loadGrupoData(); }, [grupoId, fecha]);

  const togglePresente = (alumnoId: string) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.alumnoId === alumnoId ? { ...a, presente: !a.presente } : a))
    );
  };

  const setJustificacion = (alumnoId: string, justificacion: string) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.alumnoId === alumnoId ? { ...a, justificacion } : a))
    );
  };

  const marcarTodos = (presente: boolean) => {
    setAlumnos((prev) => prev.map((a) => ({ ...a, presente })));
  };

  const handleGuardar = async () => {
    if (!grupoId) return;
    setSaving(true);
    try {
      const registros = alumnos.map((a) => ({
        alumnoId: a.alumnoId,
        presente: a.presente,
        justificacion: a.justificacion || undefined,
      }));
      await api.registrarAsistencia(grupoId, fecha, registros);
      toast.success("Asistencia registrada correctamente");
      // Recargar estadísticas
      const stats = await api.getEstadisticasAsistencia(grupoId);
      setEstadisticas(stats);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al guardar asistencia");
    }
    setSaving(false);
  };

  const presentes = alumnos.filter((a) => a.presente).length;
  const ausentes = alumnos.length - presentes;

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate("/grupos")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Pasar Lista</h1>
          <p className="text-sm text-muted-foreground">
            {grupoInfo?.clave} — {grupoInfo?.materia?.nombre ?? ""}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Fecha:</label>
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-44"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => marcarTodos(true)}>
          Todos presentes
        </Button>
        <Button variant="outline" size="sm" onClick={() => marcarTodos(false)}>
          Todos ausentes
        </Button>
        <Button variant="outline" size="icon" onClick={loadGrupoData}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant={showStats ? "default" : "outline"} size="sm" onClick={() => setShowStats(!showStats)}>
          <AlertTriangle className="h-4 w-4 mr-1" />
          Estadísticas
        </Button>
      </div>

      {/* Summary */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="font-medium">{presentes}</span> presentes
        </div>
        <div className="flex items-center gap-2 text-sm">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="font-medium">{ausentes}</span> ausentes
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {alumnos.length} alumnos
        </div>
      </div>

      {/* Stats panel */}
      {showStats && estadisticas.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Estadísticas de Asistencia</CardTitle></CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Matrícula</th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Alumno</th>
                    <th className="text-center px-4 py-2 text-sm font-medium text-muted-foreground">Asistencias</th>
                    <th className="text-center px-4 py-2 text-sm font-medium text-muted-foreground">Porcentaje</th>
                    <th className="text-center px-4 py-2 text-sm font-medium text-muted-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {estadisticas.map((s) => (
                    <tr key={s.alumnoId} className="border-t">
                      <td className="px-4 py-2 text-sm font-mono">{s.matricula}</td>
                      <td className="px-4 py-2 text-sm">{s.nombre}</td>
                      <td className="px-4 py-2 text-sm text-center">{s.presentes}/{s.total}</td>
                      <td className="px-4 py-2 text-sm text-center">
                        <span className={`font-medium ${s.porcentaje >= 80 ? "text-green-600" : "text-red-600"}`}>
                          {s.porcentaje}%
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-center">
                        {s.enRiesgo ? (
                          <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                            <AlertTriangle className="h-3.5 w-3.5" /> En riesgo
                          </span>
                        ) : (
                          <span className="text-green-600">OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground w-28">Matrícula</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Alumno</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground w-32">Asistencia</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Justificación</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((al) => (
                  <tr key={al.alumnoId} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono">{al.matricula}</td>
                    <td className="px-4 py-3 text-sm font-medium">{al.nombre}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePresente(al.alumnoId)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          al.presente
                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {al.presente ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                        {al.presente ? "Presente" : "Ausente"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {!al.presente && (
                        <Input
                          placeholder="Motivo de ausencia (opcional)"
                          value={al.justificacion}
                          onChange={(e) => setJustificacion(al.alumnoId, e.target.value)}
                          className="h-8 text-sm"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleGuardar} disabled={saving || alumnos.length === 0} className="min-w-[160px]">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Asistencia"}
        </Button>
      </div>
    </div>
  );
}
