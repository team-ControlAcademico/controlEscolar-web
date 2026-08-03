import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { Inscripcion, CicloEscolar, Horario } from "@/types";
import * as api from "@/services/api";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User as UserIcon } from "lucide-react";

const DIAS_SEMANA = [
  { key: "LUNES", label: "Lun" },
  { key: "MARTES", label: "Mar" },
  { key: "MIERCOLES", label: "Mie" },
  { key: "JUEVES", label: "Jue" },
  { key: "VIERNES", label: "Vie" },
  { key: "SABADO", label: "Sab" },
];

const HORAS = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

// Paleta de colores pastel para distintas materias
const COLOR_CLASSES = [
  { bg: "bg-blue-100 dark:bg-blue-950/60 border-blue-400 text-blue-900 dark:text-blue-200", dot: "bg-blue-500" },
  { bg: "bg-purple-100 dark:bg-purple-950/60 border-purple-400 text-purple-900 dark:text-purple-200", dot: "bg-purple-500" },
  { bg: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200", dot: "bg-emerald-500" },
  { bg: "bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200", dot: "bg-amber-500" },
  { bg: "bg-rose-100 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200", dot: "bg-rose-500" },
  { bg: "bg-indigo-100 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200", dot: "bg-indigo-500" },
  { bg: "bg-teal-100 dark:bg-teal-950/60 border-teal-400 text-teal-900 dark:text-teal-200", dot: "bg-teal-500" },
  { bg: "bg-orange-100 dark:bg-orange-950/60 border-orange-400 text-orange-900 dark:text-orange-200", dot: "bg-orange-500" },
];

interface EventoHorario {
  horarioId: string;
  materiaNombre: string;
  materiaClave: string;
  grupoClave: string;
  docenteNombre: string;
  aula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  colorIndex: number;
}

export default function MiHorarioPage() {
  const { user } = useAuthStore();
  const [ciclos, setCiclos] = useState<CicloEscolar[]>([]);
  const [selectedCicloId, setSelectedCicloId] = useState<string>("");
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar lista de ciclos
  useEffect(() => {
    const loadCiclos = async () => {
      try {
        const list = await api.getCiclos();
        setCiclos(list);
        const activo = list.find((c) => c.activo) || list[0];
        if (activo) setSelectedCicloId(activo.id);
      } catch {}
    };
    loadCiclos();
  }, []);

  // 2. Cargar inscripciones del alumno según el ciclo seleccionado
  useEffect(() => {
    const loadInscripciones = async () => {
      setLoading(true);
      try {
        const alumnoId = user?.alumno?.id;
        if (alumnoId) {
          const data = await api.getInscripciones({
            alumnoId,
            cicloId: selectedCicloId || undefined,
          });
          setInscripciones(data);
        }
      } catch {
        toast.error("Error al cargar el horario");
      }
      setLoading(false);
    };
    if (selectedCicloId || user?.alumno?.id) {
      loadInscripciones();
    } else {
      setLoading(false);
    }
  }, [user, selectedCicloId]);

  // Aplanar todos los horarios de las inscripciones
  const eventos: EventoHorario[] = [];
  inscripciones.forEach((insc, idx) => {
    const colorIndex = idx % COLOR_CLASSES.length;
    (insc.grupo?.horarios || []).forEach((h: Horario) => {
      eventos.push({
        horarioId: h.id,
        materiaNombre: insc.grupo?.materia?.nombre || "Materia",
        materiaClave: insc.grupo?.materia?.clave || "",
        grupoClave: insc.grupo?.clave || "",
        docenteNombre: insc.grupo?.docente?.nombre || "",
        aula: h.aula || insc.grupo?.aula || "S/A",
        dia: h.dia,
        horaInicio: h.horaInicio,
        horaFin: h.horaFin,
        colorIndex,
      });
    });
  });

  // Helper para verificar si un evento ocurre en un día y hora específicos
  const getEventosEnSlot = (diaKey: string, horaStr: string) => {
    return eventos.filter((e) => {
      if (e.dia !== diaKey) return false;
      const horaNum = parseInt(horaStr.split(":")[0], 10);
      const inicioNum = parseInt(e.horaInicio.split(":")[0], 10);
      const finNum = parseInt(e.horaFin.split(":")[0], 10);
      return horaNum >= inicioNum && horaNum < finNum;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header y Selector de Periodo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Mi Horario de Clases</h1>
            <p className="text-xs text-muted-foreground">Consulta tu calendario semanal por ciclo escolar</p>
          </div>
        </div>

        {/* Dropdown de Periodo estilo la imagen de referencia */}
        <div className="flex items-center gap-2">
          <select
            className="border-2 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/40 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedCicloId}
            onChange={(e) => setSelectedCicloId(e.target.value)}
          >
            {ciclos.map((c) => (
              <option key={c.id} value={c.id} className="bg-background text-foreground font-normal">
                {c.nombre} {c.activo ? "(Periodo Actual)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground p-8 text-center">Cargando horario semanal...</p>
      ) : eventos.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground rounded-xl">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30 text-blue-500" />
          <p className="text-base font-medium">No tienes clases ni grupos registrados en este periodo.</p>
          <p className="text-xs mt-1">Selecciona otro ciclo escolar en el menú superior.</p>
        </Card>
      ) : (
        /* Vista de Calendario / Cuadrícula Semanal */
        <Card className="p-4 rounded-xl shadow-sm border overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Columnas de Días */}
            <div className="grid grid-cols-7 border-b pb-3 mb-2 text-center text-sm font-semibold text-muted-foreground">
              <div className="w-16">Hora</div>
              {DIAS_SEMANA.map((d) => (
                <div key={d.key} className="py-1">
                  {d.label}
                </div>
              ))}
            </div>

            {/* Filas de Horas */}
            <div className="space-y-1">
              {HORAS.map((hora) => (
                <div key={hora} className="grid grid-cols-7 h-[64px] min-h-[64px] border-b border-muted/30 items-stretch">
                  {/* Hora */}
                  <div className="w-16 text-xs text-muted-foreground font-mono pt-1">
                    {hora}
                  </div>

                  {/* Días */}
                  {DIAS_SEMANA.map((d) => {
                    const evs = getEventosEnSlot(d.key, hora);
                    return (
                      <div key={d.key} className="p-0.5 border-l border-muted/30 relative flex flex-col gap-1">
                        {evs.map((ev) => {
                          const esInicio = ev.horaInicio.startsWith(hora);
                          if (!esInicio) return null; // Solo renderizar al inicio del bloque
                          const duracionHoras = parseInt(ev.horaFin.split(":")[0], 10) - parseInt(ev.horaInicio.split(":")[0], 10);
                          const color = COLOR_CLASSES[ev.colorIndex];

                          return (
                            <div
                              key={ev.horarioId}
                              className={`absolute inset-x-1 top-0.5 z-10 p-2.5 rounded-lg border-l-4 shadow-sm flex flex-col justify-between transition-transform hover:scale-[1.02] ${color.bg}`}
                              style={{ height: `calc(${duracionHoras * 100}% + ${(duracionHoras - 1) * 4}px)` }}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-bold text-xs leading-snug line-clamp-2">{ev.materiaNombre}</span>
                                <span className={`h-2 w-2 rounded-full shrink-0 ${color.dot}`} />
                              </div>

                              <div className="mt-1 space-y-0.5 text-[11px] opacity-90">
                                <div className="flex items-center gap-1 font-mono">
                                  <Clock className="h-3 w-3 shrink-0" />
                                  <span>{ev.horaInicio} - {ev.horaFin}</span>
                                </div>
                                {ev.aula && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    <span className="font-semibold">{ev.aula}</span>
                                  </div>
                                )}
                                {ev.docenteNombre && (
                                  <div className="flex items-center gap-1 truncate">
                                    <UserIcon className="h-3 w-3 shrink-0" />
                                    <span className="truncate">{ev.docenteNombre}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
