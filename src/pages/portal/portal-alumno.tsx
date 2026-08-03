import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { PortalAlumnoData } from "@/types";
import * as api from "@/services/api";
import { StatCard } from "@/components/ui/StatCard";
import { GraduationCap, BookOpen, Wallet, Bell, MessageSquare, Clock } from "lucide-react";

const DIA_LABELS: Record<string, string> = {
  LUNES: "Lun", MARTES: "Mar", MIERCOLES: "Mié", JUEVES: "Jue", VIERNES: "Vie", SABADO: "Sáb",
};

export default function PortalAlumnoPage() {
  const [data, setData] = useState<PortalAlumnoData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getPortalAlumno()
      .then(setData)
      .catch(() => toast.error("Error al cargar portal"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground p-4">Cargando portal...</p>;
  if (!data) return <p className="text-red-500 p-4">Error: no se pudieron cargar los datos</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Portal del Alumno</p>
        <h1 className="text-2xl font-bold mt-1">{data.alumno.nombre}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
          <span>📋 Matrícula: {data.alumno.matricula}</span>
          <span>📚 Semestre: {data.alumno.semestre}</span>
          {data.alumno.carrera && <span>🎓 {data.alumno.carrera.nombre}</span>}
          {data.cicloActivo && <span>📅 {data.cicloActivo.nombre}</span>}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div onClick={() => navigate("/mis-calificaciones")} className="cursor-pointer hover:opacity-90 transition-opacity">
          <StatCard
            icon={<GraduationCap className="h-6 w-6" />}
            label="Promedio General"
            value={data.promedioGeneral !== null ? data.promedioGeneral.toFixed(1) : "—"}
            hint={data.inscripciones.length > 0 ? `${data.inscripciones.length} materias inscritas` : "Sin inscripciones"}
            tone="primary"
          />
        </div>
        <div onClick={() => navigate("/finanzas/estado-cuenta")} className="cursor-pointer hover:opacity-90 transition-opacity">
          <StatCard
            icon={<Wallet className="h-6 w-6" />}
            label="Saldo Pendiente"
            value={`$${data.saldoPendiente}`}
            hint={`${data.colegiaturasPendientes} colegiatura(s) por pagar`}
            tone={Number(data.saldoPendiente) > 0 ? "secondary" : "primary"}
            trend={Number(data.saldoPendiente) > 0 ? "down" : "up"}
          />
        </div>
        <div onClick={() => navigate("/avisos")} className="cursor-pointer">
          <StatCard
            icon={<Bell className="h-6 w-6" />}
            label="Avisos no leídos"
            value={data.avisosNoLeidos.toString()}
            hint="Ir a avisos →"
            tone={data.avisosNoLeidos > 0 ? "secondary" : "primary"}
          />
        </div>
        <div onClick={() => navigate("/mensajes")} className="cursor-pointer">
          <StatCard
            icon={<MessageSquare className="h-6 w-6" />}
            label="Mensajes no leídos"
            value={data.mensajesNoLeidos.toString()}
            hint="Ir a mensajes →"
            tone={data.mensajesNoLeidos > 0 ? "secondary" : "primary"}
          />
        </div>
      </div>

      {/* Materias inscritas con horario */}
      <div>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Materias del ciclo
        </h2>
        {data.inscripciones.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tienes materias inscritas en el ciclo activo.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {data.inscripciones.map((ins) => (
              <div key={ins.grupoId} className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{ins.materia.nombre}</p>
                    <p className="text-xs text-muted-foreground">{ins.materia.clave} · {ins.materia.creditos} créditos</p>
                    <p className="text-xs text-muted-foreground mt-1">Prof. {ins.docente.nombre}</p>
                  </div>
                </div>
                {ins.horarios.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {ins.horarios.map((h) => (
                      <span key={h.id} className="inline-flex items-center gap-1 bg-muted rounded px-2 py-0.5 text-xs">
                        <Clock className="h-3 w-3" />
                        {DIA_LABELS[h.dia] ?? h.dia} {h.horaInicio}–{h.horaFin}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
