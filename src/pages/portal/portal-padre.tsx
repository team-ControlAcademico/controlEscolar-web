import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { PortalPadreData } from "@/types";
import * as api from "@/services/api";
import { StatCard } from "@/components/ui/StatCard";
import { GraduationCap, Wallet, Bell, MessageSquare, User } from "lucide-react";

export default function PortalPadrePage() {
  const [data, setData] = useState<PortalPadreData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getPortalPadre()
      .then(setData)
      .catch(() => toast.error("Error al cargar portal"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground p-4">Cargando portal...</p>;
  if (!data) return <p className="text-red-500 p-4">Error: no se pudieron cargar los datos</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Portal del Padre de Familia</p>
        <h1 className="text-2xl font-bold mt-1">{data.padre.nombre}</h1>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        {data.hijo && (
          <>
            <StatCard
              icon={<GraduationCap className="h-6 w-6" />}
              label="Promedio del hijo"
              value={data.hijo.promedio !== null ? data.hijo.promedio.toFixed(1) : "—"}
              hint={data.hijo.nombre}
              tone="primary"
            />
            <StatCard
              icon={<Wallet className="h-6 w-6" />}
              label="Saldo pendiente"
              value={`$${data.hijo.saldoPendiente}`}
              hint={`${data.hijo.colegiaturasPendientes} colegiatura(s)`}
              tone={Number(data.hijo.saldoPendiente) > 0 ? "secondary" : "primary"}
              trend={Number(data.hijo.saldoPendiente) > 0 ? "down" : "up"}
            />
          </>
        )}
      </div>

      {/* Datos del hijo */}
      {data.hijo ? (
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Información del alumno
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nombre</span>
                <span className="font-medium">{data.hijo.nombre}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matrícula</span>
                <span className="font-medium">{data.hijo.matricula}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Semestre</span>
                <span className="font-medium">{data.hijo.semestre}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estatus</span>
                <span className={`font-medium ${data.hijo.estatus === "ACTIVO" ? "text-green-600" : "text-red-600"}`}>
                  {data.hijo.estatus}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {data.hijo.carrera && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Carrera</span>
                  <span className="font-medium">{data.hijo.carrera.nombre}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Promedio</span>
                <span className="font-medium">{data.hijo.promedio !== null ? data.hijo.promedio.toFixed(1) : "Sin calificaciones"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Saldo pendiente</span>
                <span className={`font-medium ${Number(data.hijo.saldoPendiente) > 0 ? "text-red-600" : "text-green-600"}`}>
                  ${data.hijo.saldoPendiente}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => navigate(`/alumnos/${data.hijo!.id}/boleta`)}
            >
              Ver boleta →
            </button>
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => navigate("/finanzas/mi-estado-cuenta")}
            >
              Ver estado de cuenta →
            </button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-card text-center text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No hay un alumno vinculado a su cuenta.</p>
          <p className="text-sm">Contacte a control escolar para vincular a su hijo.</p>
        </div>
      )}
    </div>
  );
}
