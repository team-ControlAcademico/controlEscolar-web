import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Asistencia } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, Calendar } from "lucide-react";

export default function AsistenciaAlumnoPage() {
  const { id: alumnoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [alumnoInfo, setAlumnoInfo] = useState<{ nombre: string; matricula: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!alumnoId) return;
      try {
        const data = await api.getAsistenciaAlumno(alumnoId);
        setAsistencias(data);

        // Obtener info del alumno
        try {
          const alumno = await api.getAlumno(alumnoId);
          setAlumnoInfo({ nombre: alumno.nombre, matricula: alumno.matricula });
        } catch {
          if (data.length > 0 && data[0].alumno) {
            setAlumnoInfo({ nombre: data[0].alumno.nombre, matricula: data[0].alumno.matricula });
          }
        }
      } catch {
        toast.error("Error al cargar historial");
      }
      setLoading(false);
    };
    load();
  }, [alumnoId]);

  // Agrupar por grupo/materia
  const porGrupo = asistencias.reduce<Record<string, { materia: string; clave: string; registros: Asistencia[] }>>((acc, a) => {
    const key = a.grupoId;
    if (!acc[key]) {
      acc[key] = {
        materia: a.grupo?.materia?.nombre ?? "Sin materia",
        clave: a.grupo?.clave ?? "",
        registros: [],
      };
    }
    acc[key].registros.push(a);
    return acc;
  }, {});

  const calcStats = (registros: Asistencia[]) => {
    const total = registros.length;
    const presentes = registros.filter((r) => r.presente).length;
    const porcentaje = total > 0 ? Math.round((presentes / total) * 100 * 10) / 10 : 100;
    return { total, presentes, ausentes: total - presentes, porcentaje };
  };

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Historial de Asistencia</h1>
          {alumnoInfo && (
            <p className="text-sm text-muted-foreground">
              {alumnoInfo.nombre} — {alumnoInfo.matricula}
            </p>
          )}
        </div>
      </div>

      {Object.keys(porGrupo).length === 0 && (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          No hay registros de asistencia
        </div>
      )}

      {Object.entries(porGrupo).map(([grupoId, grupo]) => {
        const stats = calcStats(grupo.registros);
        return (
          <Card key={grupoId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {grupo.clave} — {grupo.materia}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600 font-medium">{stats.presentes} presentes</span>
                  <span className="text-red-600 font-medium">{stats.ausentes} ausentes</span>
                  <span className={`font-bold ${stats.porcentaje >= 80 ? "text-green-600" : "text-red-600"}`}>
                    {stats.porcentaje}%
                  </span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${stats.porcentaje >= 80 ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${stats.porcentaje}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Fecha</th>
                      <th className="text-center px-4 py-2 text-sm font-medium text-muted-foreground">Asistencia</th>
                      <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Justificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.registros
                      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .map((r) => (
                        <tr key={r.id} className="border-t">
                          <td className="px-4 py-2 text-sm">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(r.fecha).toLocaleDateString("es-MX", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-center">
                            {r.presente ? (
                              <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                                <CheckCircle2 className="h-4 w-4" /> Presente
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
                                <XCircle className="h-4 w-4" /> Ausente
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-sm text-muted-foreground">
                            {r.justificacion || "—"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
