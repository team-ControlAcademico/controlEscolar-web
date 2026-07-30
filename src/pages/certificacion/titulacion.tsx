import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { ArrowRight, FileCheck, CheckCircle, GraduationCap, DollarSign, Clock } from "lucide-react";

type TitulacionEstado = "INICIADO" | "REVISION_DOCS" | "PAGO_REALIZADO" | "APROBADO" | "TITULADO";

interface Tramite {
  id: string;
  estado: TitulacionEstado;
  observaciones: string | null;
  alumno: {
    nombre: string;
    matricula: string;
    carrera: { nombre: string } | null;
  };
}

const ESTADOS_KANBAN: { id: TitulacionEstado; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "INICIADO", label: "Iniciado", icon: <Clock className="h-4 w-4" />, color: "bg-slate-100 dark:bg-slate-800" },
  { id: "REVISION_DOCS", label: "Revisión Docs", icon: <FileCheck className="h-4 w-4" />, color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "PAGO_REALIZADO", label: "Pago Realizado", icon: <DollarSign className="h-4 w-4" />, color: "bg-amber-50 dark:bg-amber-900/20" },
  { id: "APROBADO", label: "Aprobado", icon: <CheckCircle className="h-4 w-4" />, color: "bg-emerald-50 dark:bg-emerald-900/20" },
  { id: "TITULADO", label: "Titulado", icon: <GraduationCap className="h-4 w-4" />, color: "bg-purple-50 dark:bg-purple-900/20" }
];

export default function TitulacionKanban() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTramites = () => {
    api.get("/certificacion/titulacion")
      .then((res: any) => setTramites(res.data))
      .catch((err: any) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTramites();
  }, []);

  const avanzarEstado = async (id: string, estadoActual: TitulacionEstado) => {
    const index = ESTADOS_KANBAN.findIndex(e => e.id === estadoActual);
    if (index === -1 || index === ESTADOS_KANBAN.length - 1) return;
    
    const nuevoEstado = ESTADOS_KANBAN[index + 1].id;
    
    try {
      await api.put(`/certificacion/titulacion/${id}/estado`, { estado: nuevoEstado });
      fetchTramites(); // Refrescar lista
    } catch (error) {
      console.error("Error al avanzar el trámite", error);
      alert("Hubo un error al procesar el trámite.");
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando tablero...</div>;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tablero de Titulación</h1>
        <p className="text-slate-500 dark:text-slate-400">Gestiona el progreso de graduación de los estudiantes.</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {ESTADOS_KANBAN.map(columna => {
          const tramitesColumna = tramites.filter(t => t.estado === columna.id);
          
          return (
            <div key={columna.id} className={`flex-shrink-0 w-80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col ${columna.color}`}>
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                  {columna.icon}
                  {columna.label}
                </div>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs py-0.5 px-2 rounded-full">
                  {tramitesColumna.length}
                </span>
              </div>
              
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {tramitesColumna.length === 0 ? (
                  <div className="text-center py-8 text-sm text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                    Sin trámites
                  </div>
                ) : (
                  tramitesColumna.map(tramite => (
                    <div key={tramite.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200">{tramite.alumno.nombre}</h4>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-mono">{tramite.alumno.matricula}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
                        {tramite.alumno.carrera?.nombre || "Sin carrera"}
                      </div>
                      
                      {columna.id !== "TITULADO" && (
                        <button 
                          onClick={() => avanzarEstado(tramite.id, tramite.estado)}
                          className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded text-xs font-medium transition-colors"
                        >
                          Avanzar Trámite
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
