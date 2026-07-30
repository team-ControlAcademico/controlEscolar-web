import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { Conversacion, Mensaje, UsuarioDisponible } from "@/types";
import * as api from "@/services/api";
import { onMensajeNuevo } from "@/services/socket";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Plus, Search, ArrowLeft } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  ESCOLAR: "Escolar",
  ADMINISTRATIVO: "Administrativo",
  DOCENTE: "Docente",
  ALUMNO: "Alumno",
  PADRE: "Padre",
};

export default function MensajesPage() {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioDisponible[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const loadConversaciones = async () => {
    try {
      setConversaciones(await api.getConversaciones());
    } catch { toast.error("Error al cargar conversaciones"); }
    setLoading(false);
  };

  const loadMensajes = async (convId: string) => {
    setLoadingMsgs(true);
    try {
      setMensajes(await api.getMensajes(convId));
      // Actualizar contador de no leídos en la lista
      setConversaciones((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, noLeidos: 0 } : c))
      );
    } catch { toast.error("Error al cargar mensajes"); }
    setLoadingMsgs(false);
  };

  useEffect(() => { loadConversaciones(); }, []);

  useEffect(() => {
    if (selectedConv) loadMensajes(selectedConv);
  }, [selectedConv]);

  // Scroll al final cuando cambian los mensajes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // Socket.io: escuchar mensajes nuevos en tiempo real
  useEffect(() => {
    const unsub = onMensajeNuevo((data) => {
      if (data.conversacionId === selectedConv) {
        setMensajes((prev) => [...prev, data.mensaje]);
      }
      // Actualizar lista de conversaciones
      setConversaciones((prev) => {
        const updated = prev.map((c) => {
          if (c.id === data.conversacionId) {
            return {
              ...c,
              ultimoMensaje: {
                id: data.mensaje.id,
                contenido: data.mensaje.contenido,
                createdAt: data.mensaje.createdAt,
                esMio: false,
              },
              noLeidos: data.conversacionId === selectedConv ? 0 : c.noLeidos + 1,
              updatedAt: data.mensaje.createdAt,
            };
          }
          return c;
        });
        return updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      });
    });
    return unsub;
  }, [selectedConv]);

  const handleSend = async () => {
    if (!input.trim() || !selectedConv) return;
    const contenido = input.trim();
    setInput("");
    try {
      const msg = await api.enviarMensaje(selectedConv, contenido);
      setMensajes((prev) => [...prev, msg]);
      setConversaciones((prev) =>
        prev.map((c) =>
          c.id === selectedConv
            ? { ...c, ultimoMensaje: { id: msg.id, contenido: msg.contenido, createdAt: msg.createdAt, esMio: true }, updatedAt: msg.createdAt }
            : c
        ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      );
    } catch { toast.error("Error al enviar mensaje"); }
  };

  const handleNewChat = async (userId: string) => {
    try {
      const conv = await api.crearConversacion(userId);
      setShowNewChat(false);
      setSearchTerm("");
      await loadConversaciones();
      setSelectedConv(conv.id);
      setMobileShowChat(true);
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const loadUsuarios = async () => {
    try {
      setUsuarios(await api.getUsuariosDisponibles());
    } catch { toast.error("Error al cargar usuarios"); }
  };

  useEffect(() => {
    if (showNewChat) loadUsuarios();
  }, [showNewChat]);

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConvData = conversaciones.find((c) => c.id === selectedConv);

  if (loading) return <p className="text-muted-foreground p-4">Cargando mensajes...</p>;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold">Mensajes</h1>
        </div>
        <Button size="sm" onClick={() => setShowNewChat(true)}>
          <Plus className="h-4 w-4 mr-1" /> Nuevo chat
        </Button>
      </div>

      <div className="flex flex-1 border rounded-lg overflow-hidden bg-card min-h-0">
        {/* Lista de conversaciones */}
        <div className={`w-full md:w-80 border-r flex flex-col shrink-0 ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
          {conversaciones.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
              No tienes conversaciones.<br />Inicia una con el botón "Nuevo chat".
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {conversaciones.map((conv) => (
                <button
                  key={conv.id}
                  className={`w-full text-left px-4 py-3 border-b transition-colors hover:bg-muted/50 ${
                    selectedConv === conv.id ? "bg-muted" : ""
                  }`}
                  onClick={() => { setSelectedConv(conv.id); setMobileShowChat(true); }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{conv.otro.nombre}</span>
                    {conv.noLeidos > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 ml-2 shrink-0">
                        {conv.noLeidos}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground truncate flex-1">
                      <span className="bg-muted text-muted-foreground rounded px-1 py-0.5 mr-1 text-[10px]">{ROLE_LABELS[conv.otro.role] ?? conv.otro.role}</span>
                      {conv.ultimoMensaje
                        ? `${conv.ultimoMensaje.esMio ? "Tú: " : ""}${conv.ultimoMensaje.contenido}`
                        : "Sin mensajes"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat */}
        <div className={`flex-1 flex flex-col min-w-0 ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
          {selectedConv && selectedConvData ? (
            <>
              {/* Header del chat */}
              <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0">
                <button className="md:hidden" onClick={() => setMobileShowChat(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <p className="font-semibold text-sm">{selectedConvData.otro.nombre}</p>
                  <p className="text-xs text-muted-foreground">{selectedConvData.otro.email} · {ROLE_LABELS[selectedConvData.otro.role]}</p>
                </div>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loadingMsgs ? (
                  <p className="text-muted-foreground text-sm text-center">Cargando...</p>
                ) : mensajes.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center">No hay mensajes aún. ¡Envía el primero!</p>
                ) : (
                  mensajes.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.esMio ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          msg.esMio
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.contenido}</p>
                        <p className={`text-[10px] mt-1 ${msg.esMio ? "text-blue-200" : "text-muted-foreground"}`}>
                          {new Date(msg.createdAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 border rounded-full px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe un mensaje..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  />
                  <Button
                    size="icon"
                    className="rounded-full shrink-0"
                    disabled={!input.trim()}
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Selecciona una conversación</p>
                <p className="text-sm">o inicia un nuevo chat</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal nuevo chat */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowNewChat(false)}>
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Nuevo chat</h2>
              <div className="mt-2 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm bg-background"
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {filteredUsuarios.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">No se encontraron usuarios</p>
              ) : (
                filteredUsuarios.map((u) => (
                  <button
                    key={u.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
                    onClick={() => handleNewChat(u.id)}
                  >
                    <div>
                      <p className="font-medium text-sm">{u.nombre}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs shrink-0">
                      {ROLE_LABELS[u.role] ?? u.role}
                    </span>
                  </button>
                ))
              )}
            </div>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full" onClick={() => setShowNewChat(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
