<div align="center">
  <h1>🖥 Control Escolar — Frontend</h1>
  <p>Interfaz de usuario del sistema de control escolar universitario</p>
</div>

---

## 📋 Requisitos

- [Docker](https://docs.docker.com/get-docker/) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0+
- Backend corriendo en `http://localhost:4000`

---

## 🚀 Inicio rápido

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd control-escolar-frontend

# 2. Copiar variables de entorno (ajustar si es necesario)
cp .env.example .env

# 3. Levantar el frontend
docker compose up -d
```

> Asegúrate de tener el backend corriendo antes de usar el frontend:
> ```bash
> cd ../control-escolar-backend && docker compose up -d
> ```

---

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| **Frontend (Web)** | `http://localhost:5173` |
| **API REST** | `http://localhost:4000/api` |
| **Base de datos** | `localhost:5433` |

> **Nota:** La ruta raíz `GET /api` no tiene handler y devuelve 404. Usa `GET /api/health` para verificar que la API está corriendo. Para ver todas las rutas, consulta `ROUTES.md`.

---

## 🔐 Credenciales de prueba

> **No incluidas en el repositorio por seguridad.**
> Las credenciales se encuentran en `CREDENTIALS.md` (archivo excluido de git).
> Solicítalas al líder de proyecto.
>
> Las mismas credenciales del backend. Para desarrollo local, el backend debe tener ejecutado `pnpm db:seed`.

---

## 🛠 Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `docker compose up -d` | Levantar frontend |
| `docker compose down` | Detener frontend |
| `docker compose logs frontend -f` | Ver logs |
| `docker compose build --no-cache` | Reconstruir imagen desde cero |

---

## 🧱 Tecnologías

| Categoría | Herramienta |
|-----------|-------------|
| Framework | React 19 |
| Build | Vite 6 |
| Router | React Router 7 |
| State | Zustand 5 |
| UI | shadcn/ui + Radix UI |
| Estilos | TailwindCSS 3 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Notificaciones | Sonner |
| Lenguaje | TypeScript 5 |

---

## 📁 Estructura

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables (shadcn/ui)
│   ├── contexts/         # Contextos React
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Layouts por rol (auth, dashboard)
│   ├── lib/              # Utilidades (cn, etc.)
│   ├── pages/            # Vistas (login, register, dashboard)
│   ├── router/           # Rutas protegidas por rol
│   ├── services/         # Llamadas a la API
│   ├── stores/           # Zustand stores
│   └── types/            # Tipos TypeScript
├── public/               # Assets estáticos
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## 🔒 Roles en la UI

Cada rol ve un dashboard diferente al iniciar sesión:

| Rol | Dashboard |
|-----|-----------|
| `ADMIN` | Control total del sistema |
| `ESCOLAR` | Gestión académica |
| `ADMINISTRATIVO` | Gestión financiera |
| `DOCENTE` | Mis grupos y calificaciones |
| `ALUMNO` | Mis calificaciones y horario |
| `PADRE` | Desempeño de mi hijo |
