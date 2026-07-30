import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Aviso } from "@/types";
import * as api from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Bell, BellRing, Plus, Trash2, Check, RefreshCw } from "lucide-react";

const TIPO_COLORS: Record<string, string> = {
  GENERAL: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  ACADEMICO: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  FINANCIERO: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  URGENTE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const ROLES_DISPONIBLES = ["ADMIN", "ESCOLAR", "ADMINISTRATIVO", "DOCENTE", "ALUMNO", "PADRE"];

export default function AvisosPage() {
  const { user } = useAuthStore();
  const role = user?.role ?? "";
  const canCreate = ["ADMIN", "ESCOLAR", "DOCENTE"].includes(role);
  const canDelete = ["ADMIN", "ESCOLAR"].includes(role);

  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("GENERAL");
  const [rolesDestino, setRolesDestino] = useState<string[]>(["ALUMNO"]);

  const load = async () => {
    try {
      setAvisos(await api.getMisAvisos());
    } catch {
      toast.error("Error al cargar avisos");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      toast.error("Titulo y contenido son requeridos");
      return;
    }
    try {
      await api.crearAviso({ titulo, contenido, tipo, rolesDestino });
      toast.success("Aviso publicado");
      setShowForm(false);
      setTitulo("");
      setContenido("");
      setTipo("GENERAL");
      setRolesDestino(["ALUMNO"]);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al crear aviso");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este aviso?")) return;
    try {
      await api.eliminarAviso(id);
      toast.success("Aviso eliminado");
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleMarcarLeido = async (id: string) => {
    try {
      await api.marcarAvisoLeido(id);
      setAvisos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, leido: true, leidoAt: new Date().toISOString() } : a))
      );
    } catch {
      toast.error("Error al marcar como leído");
    }
  };

  const toggleRole = (r: string) => {
    setRolesDestino((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  if (loading) return <p className="text-muted-foreground p-4">Cargando avisos...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold">Avisos</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          {canCreate && (
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" /> Nuevo aviso
            </Button>
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border rounded-lg p-4 space-y-3 bg-card">
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
            placeholder="Título del aviso"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm bg-background min-h-[80px]"
            placeholder="Contenido del aviso..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="border rounded-lg px-3 py-2 text-sm bg-background"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="GENERAL">General</option>
              <option value="ACADEMICO">Académico</option>
              <option value="FINANCIERO">Financiero</option>
              <option value="URGENTE">Urgente</option>
            </select>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">Dirigido a:</span>
              {ROLES_DISPONIBLES.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleRole(r)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    rolesDestino.includes(r)
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleCreate}>Publicar</Button>
          </div>
        </div>
      )}

      {/* Lista de avisos */}
      {avisos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No hay avisos para mostrar</p>
        </div>
      ) : (
        <div className="space-y-2">
          {avisos.map((aviso) => (
            <div
              key={aviso.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                aviso.leido
                  ? "bg-card opacity-80"
                  : "bg-card border-l-4 border-l-blue-500 shadow-sm"
              }`}
              onClick={() => {
                setExpandedId(expandedId === aviso.id ? null : aviso.id);
                if (!aviso.leido) handleMarcarLeido(aviso.id);
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {aviso.leido ? (
                    <Bell className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <BellRing className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm">{aviso.titulo}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TIPO_COLORS[aviso.tipo] ?? "bg-gray-100 text-gray-700"}`}>
                        {aviso.tipo}
                      </span>
                      {!aviso.leido && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">Nuevo</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {aviso.autor?.email} · {new Date(aviso.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {expandedId === aviso.id && (
                      <p className="text-sm mt-2 whitespace-pre-wrap">{aviso.contenido}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {aviso.leido && <Check className="h-4 w-4 text-green-600" />}
                  {canDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={(e) => { e.stopPropagation(); handleDelete(aviso.id); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
