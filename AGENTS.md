# AGENTS.md — Frontend Control Escolar

> **Este archivo lo leen automáticamente:** Claude Code, Antigravity CLI, OpenCode, Cursor, y cualquier agente de IA compatible con el estándar `AGENTS.md`.
>
> Mantenlo actualizado. La IA se basa en él para entender el proyecto.

---

## Estado del proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1 | ✅ COMPLETADA | Autenticación y layout base |
| 2 | ✅ COMPLETADA | Gestión académica (páginas CRUD) |
| 3 | 🔜 PRÓXIMA | Asistencia y evaluación |
| 4 | ⏳ PENDIENTE | Finanzas |
| 5 | ⏳ PENDIENTE | Comunicación y portales |
| 6 | ⏳ PENDIENTE | Certificación y reportes |

> El roadmap detallado con páginas, rutas, roles y componentes por fase está en **`PLAN.md`**. Consúltalo antes de empezar cualquier feature.

### Lo que YA funciona (Fase 1 + 2)

- [x] Docker: `docker compose up -d` levanta Vite dev server con hot-reload
- [x] Login page: email + contraseña + validación Zod
- [x] Register page: formulario dinámico que cambia según rol seleccionado
- [x] Auth store con Zustand: login, logout, register, fetchProfile, initialize
- [x] API service con Axios: interceptores para JWT y refresh automático
- [x] Router con `<ProtectedRoute>` y `<PublicRoute>`
- [x] AuthLayout (login/register) y DashboardLayout (header con rol y logout)
- [x] Dashboard con cards informativas (rol, estado, fase)
- [x] Notificaciones con Sonner (toasts)
- [x] Componentes shadcn/ui: Button, Input, Label, Card, Select, DataTable
- [x] Sidebar lateral dinámico por rol
- [x] Página de Carreras: listar, crear, editar, eliminar
- [x] Página de Planes de Estudio: listar, crear, detalle con materias por semestre
- [x] Página de Materias: listar, crear, eliminar
- [x] Página de Ciclos Escolares: listar, crear, toggle activo/inactivo
- [x] Página de Grupos: listar, crear, eliminar
- [x] Página de Inscripciones: listar, inscribir, dar de baja
- [x] Página Mi Horario (alumno): ver grupos inscritos con horarios

### Lo que NO funciona todavía

- [ ] Captura de asistencia en el frontend
- [ ] Captura de calificaciones en el frontend
- [ ] Boletas y reportes de desempeño
- [ ] Nada de finanzas (colegiaturas, pagos, facturación)
- [ ] Nada de portales de alumno/docente/padre
- [ ] Nada de certificación ni reportes

### Lo que NUNCA debes hacer

- ❌ NO hardcodear la URL de la API — usar `import.meta.env.VITE_API_URL`
- ❌ NO almacenar contraseñas en localStorage (solo tokens y user info)
- ❌ NO exponer credenciales en texto visible de la UI
- ❌ NO usar `npm` — solo `pnpm`
- ❌ NO modificar archivos en `components/ui/` directamente — crear wrappers
- ❌ NO escribir CSS plano — usar TailwindCSS
- ❌ NO usar `window.location` para navegación — usar React Router
- ❌ NO crear archivos en la raíz de `control-escolar/` (es solo un contenedor)

---

## Contexto del proyecto

Interfaz de usuario del sistema de control escolar universitario. Aplicación React que consume la API REST del backend (`control-escolar-backend`). Implementa autenticación multirol, dashboards diferenciados por rol, y formularios CRUD para cada módulo del sistema.

## Stack

- **Framework:** React 19 con TypeScript 5
- **Build:** Vite 6
- **Router:** React Router 7
- **State:** Zustand 5
- **UI:** shadcn/ui (Radix UI + TailwindCSS 3)
- **Forms:** React Hook Form 7 + Zod
- **HTTP:** Axios con interceptores para JWT
- **Notificaciones:** Sonner (toasts)

## Cómo levantar el proyecto

```bash
docker compose up -d          # Levantar frontend
docker compose down           # Detener frontend
docker compose logs -f        # Ver logs en tiempo real
docker compose build --no-cache  # Reconstruir imagen
```

> Requiere que el backend esté corriendo en `http://localhost:4000`

## Estructura de código

```
src/
├── components/ui/    → Componentes shadcn/ui (Button, Input, Label, Card, Select)
├── contexts/         → Contextos React (si se necesitan en el futuro)
├── hooks/            → Custom hooks reutilizables
├── layouts/          → Layouts por rol (AuthLayout, DashboardLayout)
├── lib/              → Utilidades (cn() de shadcn/ui, etc.)
├── pages/            → Vistas/páginas (login, register, dashboard, y las de cada módulo)
├── router/           → Definición de rutas protegidas por autenticación
├── services/         → Llamadas HTTP a la API del backend
├── stores/           → Zustand stores (auth, y los que se necesiten por módulo)
├── types/            → Tipos TypeScript compartidos
├── App.tsx           → Componente raíz con RouterProvider + Toaster
├── main.tsx          → Entry point, monta React en el DOM
└── index.css         → TailwindCSS + variables CSS de shadcn/ui
```

## Convenciones de código

- **Idioma:** español para textos visibles al usuario, inglés para nombres de variables, funciones y archivos
- **Nombrado de archivos:** `kebab-case.tsx` para archivos, `PascalCase` para componentes, `camelCase` para funciones y hooks
- **Componentes shadcn/ui:** NO modificar los archivos en `components/ui/` directamente. Si se necesita personalización, crear un wrapper
- **CSS:** usar TailwindCSS con las variables de diseño de shadcn/ui. NO escribir CSS plano
- **Imports:** usar alias `@/` para imports relativos (`@/components/...`, `@/lib/...`)
- **Formularios:** usar React Hook Form con `zodResolver` para validación. Schemas Zod locales en el mismo archivo de la página
- **Estado:** usar Zustand para estado global (auth, datos compartidos). Estado local con `useState` para lo específico de un componente
- **Navegación:** usar `react-router-dom` (useNavigate, Link, Navigate). NO usar `window.location`

## Autenticación

- El store de auth (`stores/auth.store.ts`) maneja login, logout, register, fetchProfile
- Al iniciar la app, `initialize()` carga el token y usuario de `localStorage`
- El interceptor de Axios renueva automáticamente el access token si expira
- Las rutas protegidas se definen en el router con `<ProtectedRoute>`
- Las rutas públicas como `/login` redirigen al dashboard si ya hay sesión

## Roles en el frontend

Cada rol tiene su propio layout y rutas. El sidebar del `DashboardLayout` debe mostrar solo las opciones que corresponden al rol del usuario:

```typescript
const ROLE_NAV: Record<Role, { label: string; path: string; icon: LucideIcon }[]> = {
  ADMIN: [...],
  ESCOLAR: [...],
  // etc.
}
```

## Reglas de seguridad

- NUNCA hardcodear la URL de la API. Usar `import.meta.env.VITE_API_URL`
- NUNCA almacenar contraseñas en localStorage o estado global
- El refresh token se almacena en localStorage (mismo origen, solo frontend)
- Validar formularios antes de enviar al backend (Zod + React Hook Form)
- Redirigir a `/login` si el token expira y el refresh falla

## Al crear nuevas páginas/módulos

1. Crear los tipos necesarios en `src/types/` (si son nuevos)
2. Agregar funciones al service en `src/services/api.ts` (o crear un archivo nuevo por módulo)
3. Crear la página en `src/pages/`
4. Agregar la ruta en `src/router/index.tsx` con su respectiva protección de rol
5. Agregar la entrada de navegación en `src/layouts/dashboard-layout.tsx` según el rol

## Relación con el backend

- La URL de la API se configura en `.env` como `VITE_API_URL`
- Todas las llamadas usan el interceptor de Axios que adjunta el Bearer token
- El backend valida los datos (Zod), el frontend muestra los errores del backend
- Los DTOs del backend no se duplican en el frontend — se tipan manualmente en `src/types/`

## URLs de acceso y primeros pasos

Cuando levantas el proyecto con Docker, los servicios quedan en:

| Servicio | URL | Nota |
|----------|-----|------|
| **Frontend (Web)** | `http://localhost:5173` | Abre esta URL en el navegador |
| **API (Backend)** | `http://localhost:4000/api` | La ruta raíz `/api` no tiene handler, usa `/api/health` para verificar |
| **Base de datos** | `localhost:5433` | PostgreSQL 16, usuario `postgres`, password `postgres`, DB `control_escolar` |

1. Levantar backend primero: `cd controlEscolar-api && docker compose up -d`
2. Inicializar BD: `docker compose exec backend pnpm db:push && docker compose exec backend pnpm db:seed`
3. Levantar frontend: `cd controlEscolar-web && docker compose up -d`
4. Abrir el navegador en `http://localhost:5173` e iniciar sesión con las credenciales en `CREDENTIALS.md`

> Para ver todas las rutas disponibles de la API y del frontend, consulta **`ROUTES.md`**.
> Para ver las credenciales de prueba (emails y contraseñas por rol), consulta **`CREDENTIALS.md`**.

## Archivos de documentación

| Archivo | Propósito | En git? |
|---------|-----------|---------|
| `AGENTS.md` | Instrucciones para IA (este archivo) | ✅ Sí |
| `README.md` | Documentación para humanos | ✅ Sí |
| `PLAN.md` | Roadmap completo por fases | ✅ Sí |
| `ROUTES.md` | Todas las URLs y rutas de la API y frontend | ✅ Sí |
| `CREDENTIALS.md` | Credenciales de prueba por rol | ❌ No (gitignored) |
| `.env` | Variables de entorno locales | ❌ No (gitignored) |
| `.env.example` | Template de variables de entorno | ✅ Sí |
