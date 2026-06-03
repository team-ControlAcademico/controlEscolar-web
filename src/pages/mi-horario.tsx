import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { Inscripcion } from "@/types";
import * as api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DIAS: Record<string, string> = {
  LUNES: "Lunes", MARTES: "Martes", MIERCOLES: "Miércoles",
  JUEVES: "Jueves", VIERNES: "Viernes", SABADO: "Sábado",
};

export default function MiHorarioPage() {
  const { user } = useAuthStore();
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const alumnoId = user?.alumno?.id;
        if (!alumnoId) return;
        const data = await api.getInscripciones({ alumnoId });
        setInscripciones(data);
      } catch { toast.error("Error al cargar horario"); }
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  if (inscripciones.length === 0) return (
    <div className="text-center py-8 text-muted-foreground">
      No tienes grupos inscritos en este ciclo.
    </div>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mi Horario</h1>
      {inscripciones.map((insc) => (
        <Card key={insc.id}>
          <CardHeader>
            <CardTitle className="text-lg">{insc.grupo?.materia?.nombre} <span className="text-muted-foreground text-sm">({insc.grupo?.clave})</span></CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Docente: {insc.grupo?.docente?.nombre}</p>
            <div className="space-y-1">
              {(insc.grupo?.horarios || []).map((h) => (
                <div key={h.id} className="text-sm flex gap-4">
                  <span className="font-medium w-24">{DIAS[h.dia] || h.dia}</span>
                  <span>{h.horaInicio} - {h.horaFin}</span>
                  {h.aula && <span className="text-muted-foreground">Aula: {h.aula}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
