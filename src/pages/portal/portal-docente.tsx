import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { PortalDocenteData } from "@/types";
import * as api from "@/services/api";
import { StatCard } from "@/components/ui/StatCard";
import { Users, BookOpen, Bell, MessageSquare, ClipboardList, BarChart3 } from "lucide-react";

const DIA_LABELS: Record<string, string> = {
  LUNES: "Lun", MARTES: "Mar", MIERCOLES: "Mié", JUEVES: "Jue", VIERNES: "Vie", SABADO: "Sáb",
};

export default function PortalDocentePage() {
  const [data, setData] = useState<PortalDocenteData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getPortalDocente()
      .then(setData)
      .catch(() => toast.error("Error al cargar portal"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground p-4">Cargando portal...</p>;
  if (!data) return <p className="text-red-500 p-4">Error: no se pudieron cargar los datos</p>;

  const totalInscritos = data.grupos.reduce((sum, g) => sum + g.inscritos, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Portal del Docente</p>
        <h1 className="text-2xl font-bold mt-1">{data.docente.nombre}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
          {data.docente.especialidad && <span>📖 {data.docente.especialidad}</span>}
          {data.cicloActivo && <span>📅 {data.cicloActivo.nombre}</span>}
          <span>📚 {data.grupos.length} grupo(s) asignados</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Alumnos totales"
          value={totalInscritos.toString()}
          hint={`En ${data.grupos.length} grupo(s)`}
          tone="primary"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          label="Avisos publicados"
          value={data.avisosPublicados.toString()}
          hint="Avisos activos"
          tone="primary"
        />
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

      {/* Grupos */}
      <div>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Mis grupos del ciclo
        </h2>
        {data.grupos.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tienes grupos asignados en el ciclo activo.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.grupos.map((grupo) => (
              <div key={grupo.id} className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{grupo.materia.nombre}</p>
                    <p className="text-xs text-muted-foreground">{grupo.clave} · {grupo.materia.clave}</p>
                  </div>
                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                    {grupo.inscritos}/{grupo.cupoMaximo}
                  </span>
                </div>
                {grupo.aula && <p className="text-xs text-muted-foreground mt-1">📍 {grupo.aula}</p>}
                {grupo.horarios.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {grupo.horarios.map((h) => (
                      <span key={h.id} className="bg-muted rounded px-2 py-0.5 text-xs">
                        {DIA_LABELS[h.dia] ?? h.dia} {h.horaInicio}–{h.horaFin}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    onClick={() => navigate(`/grupos/${grupo.id}/asistencia`)}
                  >
                    <ClipboardList className="h-3 w-3" /> Asistencia
                  </button>
                  <button
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    onClick={() => navigate(`/grupos/${grupo.id}/calificaciones`)}
                  >
                    <BarChart3 className="h-3 w-3" /> Calificaciones
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
