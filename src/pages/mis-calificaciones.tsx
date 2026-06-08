import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { BoletaResult, Asistencia } from "@/types";
import * as api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, CheckCircle2, XCircle, Calendar } from "lucide-react";

export default function MisCalificacionesPage() {
  const [boleta, setBoleta] = useState<BoletaResult | null>(null);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const boletaData = await api.getMisCalificaciones();
        setBoleta(boletaData);

        // Cargar asistencia del alumno
        if (boletaData?.alumno?.id) {
          try {
            const asistData = await api.getAsistenciaAlumno(boletaData.alumno.id);
            setAsistencias(asistData);
          } catch {
            // No attendance data available
          }
        }
      } catch {
        toast.error("Error al cargar datos");
      }
      setLoading(false);
    };
    load();
  }, []);

  const getColorForGrade = (n: number | null) => {
    if (n == null) return "text-muted-foreground";
    if (n >= 9) return "text-green-600";
    if (n >= 7) return "text-blue-600";
    if (n >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const promedioGeneral = boleta?.boleta
    ? (() => {
        const promedios = boleta.boleta.filter((b) => b.promedio != null).map((b) => b.promedio!);
        return promedios.length > 0 ? Math.round((promedios.reduce((s, p) => s + p, 0) / promedios.length) * 10) / 10 : null;
      })()
    : null;

  // Calcular estadísticas de asistencia
  const totalAsistencias = asistencias.length;
  const presentes = asistencias.filter((a) => a.presente).length;
  const porcentajeAsistencia = totalAsistencias > 0 ? Math.round((presentes / totalAsistencias) * 100 * 10) / 10 : 100;

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis Calificaciones</h1>
      {boleta?.alumno && (
        <p className="text-sm text-muted-foreground">
          {boleta.alumno.nombre} — Matrícula: {boleta.alumno.matricula} — Semestre {boleta.alumno.semestre}
        </p>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Materias</p>
              <p className="text-2xl font-bold">{boleta?.boleta.length ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Promedio General</p>
              <p className={`text-2xl font-bold ${getColorForGrade(promedioGeneral)}`}>
                {promedioGeneral != null ? promedioGeneral.toFixed(1) : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className={`h-8 w-8 ${porcentajeAsistencia >= 80 ? "text-green-500" : "text-red-500"}`} />
            <div>
              <p className="text-sm text-muted-foreground">Asistencia</p>
              <p className={`text-2xl font-bold ${porcentajeAsistencia >= 80 ? "text-green-600" : "text-red-600"}`}>
                {porcentajeAsistencia}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Clases Registradas</p>
              <p className="text-2xl font-bold">{totalAsistencias}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade Table */}
      {boleta && boleta.boleta.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Calificaciones por Materia</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Materia</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Docente</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U1</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U2</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U3</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {boleta.boleta.map((item) => (
                    <tr key={item.grupoId} className="border-t hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{item.materia.nombre}</p>
                        <p className="text-xs text-muted-foreground">{item.materia.clave}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.docente.nombre}</td>
                      {[1, 2, 3].map((u) => {
                        const cal = item.unidades[u]?.find((c) => c.tipo === "ORDINARIO");
                        return (
                          <td key={u} className={`px-4 py-3 text-sm text-center font-medium ${cal ? getColorForGrade(cal.calificacion) : "text-muted-foreground"}`}>
                            {cal ? cal.calificacion.toFixed(1) : "—"}
                          </td>
                        );
                      })}
                      <td className={`px-4 py-3 text-sm text-center font-bold ${getColorForGrade(item.promedio)}`}>
                        {item.promedio != null ? item.promedio.toFixed(1) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          No hay calificaciones registradas aún
        </div>
      )}

      {/* Attendance History */}
      {asistencias.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historial de Asistencia Reciente</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Fecha</th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Materia</th>
                    <th className="text-center px-4 py-2 text-sm font-medium text-muted-foreground">Asistencia</th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Justificación</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencias.slice(0, 20).map((a) => (
                    <tr key={a.id} className="border-t">
                      <td className="px-4 py-2 text-sm">
                        {new Date(a.fecha).toLocaleDateString("es-MX", { weekday: "short", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-4 py-2 text-sm">{a.grupo?.materia?.nombre ?? "—"}</td>
                      <td className="px-4 py-2 text-center">
                        {a.presente ? (
                          <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Presente
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                            <XCircle className="h-3.5 w-3.5" /> Ausente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-muted-foreground">{a.justificacion || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
