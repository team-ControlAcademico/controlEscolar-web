import { io, Socket } from "socket.io-client";
import type { Aviso, Mensaje } from "@/types";

let socket: Socket | null = null;

/**
 * Conecta al servidor Socket.io usando el token JWT almacenado.
 * Si ya hay una conexión activa, la retorna.
 */
export function connectSocket(): Socket {
  if (socket?.connected) return socket;

  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token para conectar socket");

  socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") ?? "http://localhost:4000", {
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("[Socket.io] Conectado:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.warn("[Socket.io] Error de conexión:", err.message);
  });

  return socket;
}

/**
 * Desconecta el socket activo.
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Escucha mensajes nuevos en tiempo real.
 */
export function onMensajeNuevo(
  callback: (data: { conversacionId: string; mensaje: Mensaje }) => void
): () => void {
  const s = getSocket();
  if (!s) return () => {};
  s.on("mensaje:nuevo", callback);
  return () => { s.off("mensaje:nuevo", callback); };
}

/**
 * Escucha avisos nuevos broadcast.
 */
export function onAvisoNuevo(callback: (aviso: Aviso) => void): () => void {
  const s = getSocket();
  if (!s) return () => {};
  s.on("aviso:nuevo", callback);
  return () => { s.off("aviso:nuevo", callback); };
}

function getSocket(): Socket | null {
  if (!socket?.connected) {
    try {
      return connectSocket();
    } catch {
      return null;
    }
  }
  return socket;
}
