import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { BoletaResult } from "@/types";
import * as api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, BookOpen } from "lucide-react";

export default function BoletaAlumnoPage() {
  const { id: alumnoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<BoletaResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!alumnoId) return;
      try {
        const result = await api.getBoletaAlumno(alumnoId);
        setData(result);
      } catch {
        toast.error("Error al cargar boleta");
      }
      setLoading(false);
    };
    load();
  }, [alumnoId]);

  const getColorForGrade = (n: number | null) => {
    if (n == null) return "text-muted-foreground";
    if (n >= 9) return "text-green-600";
    if (n >= 7) return "text-blue-600";
    if (n >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const promedioGeneral = data?.boleta
    ? (() => {
        const promedios = data.boleta.filter((b) => b.promedio != null).map((b) => b.promedio!);
        return promedios.length > 0 ? Math.round((promedios.reduce((s, p) => s + p, 0) / promedios.length) * 10) / 10 : null;
      })()
    : null;

  if (loading) return <p className="text-muted-foreground p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Boleta de Calificaciones</h1>
          {data?.alumno && (
            <p className="text-sm text-muted-foreground">
              {data.alumno.nombre} — Matrícula: {data.alumno.matricula} — Semestre {data.alumno.semestre}
            </p>
          )}
        </div>
      </div>

      {/* Summary Card */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Materias</p>
                <p className="text-2xl font-bold">{data.boleta.length}</p>
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
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {data.alumno.semestre}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semestre</p>
                <p className="text-2xl font-bold">{data.alumno.semestre}°</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Grade Table */}
      {data && data.boleta.length > 0 ? (
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
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Créditos</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U1</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U2</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">U3</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.boleta.map((item) => (
                    <tr key={item.grupoId} className="border-t hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium">{item.materia.nombre}</p>
                          <p className="text-xs text-muted-foreground">{item.materia.clave} • {item.grupoClave}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.docente.nombre}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.materia.creditos}</td>
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
          No hay calificaciones registradas
        </div>
      )}
    </div>
  );
}
