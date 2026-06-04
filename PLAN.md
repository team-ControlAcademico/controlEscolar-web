# Plan de Desarrollo — Frontend Control Escolar

> Plan de fases para el desarrollo del frontend del sistema de control escolar universitario.
> Formato: Markdown, compatible con GitHub, gestores de proyecto y documentación.

---

## Fase 1 — Autenticación y Layout Base ✅ COMPLETADA

**Objetivo:** Interfaz de usuario con login, registro y estructura base protegida por roles.

### Tareas realizadas

- [x] Configuración de React + Vite + TypeScript + TailwindCSS
- [x] Configuración de shadcn/ui (Button, Input, Label, Card, Select)
- [x] Página de Login (email + password)
- [x] Página de Register (formulario dinámico según rol seleccionado)
- [x] Store de autenticación con Zustand (login, logout, register, fetchProfile)
- [x] Servicio API con Axios (interceptores para JWT y refresh automático)
- [x] Router con rutas protegidas (ProtectedRoute) y públicas (PublicRoute)
- [x] AuthLayout para páginas de login/register
- [x] DashboardLayout con header (email, rol, botón de logout)
- [x] Dashboard page con cards informativas (rol, estado, fase actual)
- [x] Notificaciones con Sonner (toasts)
- [x] Docker (Dockerfile multi-stage + docker-compose.yml)

### Tecnologías usadas

React 19, Vite 6, TypeScript 5, Zustand 5, shadcn/ui, TailwindCSS 3, React Router 7, React Hook Form 7, Zod, Axios, Sonner, Docker

---

## Fase 2 — Gestión Académica ✅ COMPLETADA

**Objetivo:** Páginas CRUD para carreras, planes de estudio, materias, grupos y horarios.

### Páginas nuevas

| Página | Ruta | Roles |
|--------|------|-------|
| Lista de carreras | `/carreras` | ADMIN, ESCOLAR |
| Crear/editar carrera | `/carreras/nueva`, `/carreras/:id/editar` | ADMIN, ESCOLAR |
| Lista de planes de estudio | `/planes` | ADMIN, ESCOLAR |
| Detalle de plan (materias por semestre) | `/planes/:id` | ADMIN, ESCOLAR |
| Lista de materias | `/materias` | ADMIN, ESCOLAR |
| Lista de ciclos escolares | `/ciclos` | ADMIN, ESCOLAR |
| Lista de grupos | `/grupos` | ADMIN, ESCOLAR, DOCENTE |
| Inscripción de alumnos | `/inscripciones` | ADMIN, ESCOLAR, ADMINISTRATIVO |
| Mi horario (alumno) | `/mi-horario` | ALUMNO |
| Mis grupos (docente) | `/mis-grupos` | DOCENTE |

### Componentes necesarios

- Sidebar/nav dinámico por rol (reemplazar header simple actual)
- DataTable genérico para listados (columnas, paginación, búsqueda)
- FormDialog para crear/editar en modal
- Breadcrumbs para navegación jerárquica
- SelectCarrera, SelectMateria, SelectDocente (componentes reutilizables)

---

## Fase 3 — Asistencia y Evaluación 📅

**Objetivo:** Interfaces para control de asistencia y captura de calificaciones.

### Páginas nuevas

| Página | Ruta | Roles |
|--------|------|-------|
| Pasar lista | `/grupos/:id/asistencia` | DOCENTE |
| Historial de asistencia | `/alumnos/:id/asistencia` | DOCENTE, ESCOLAR |
| Capturar calificaciones | `/grupos/:id/calificaciones` | DOCENTE |
| Boletas | `/alumnos/:id/boleta` | ESCOLAR, ALUMNO, PADRE |
| Mis calificaciones | `/mis-calificaciones` | ALUMNO |

### Componentes necesarios

- Selector de fecha para asistencia
- Tabla de asistencia con toggle presente/ausente
- Tabla de calificaciones con inputs numéricos (0-10)
- Vista de boleta con promedios calculados
- Gráficas de desempeño (recharts o similar)

---

## Fase 4 — Finanzas 💰

**Objetivo:** Interfaces de cobranza, pagos y facturación.

### Páginas nuevas

| Página | Ruta | Roles |
|--------|------|-------|
| Colegiaturas | `/finanzas/colegiaturas` | ADMINISTRATIVO |
| Registro de pagos | `/finanzas/pagos` | ADMINISTRATIVO |
| Estados de cuenta | `/finanzas/estado-cuenta` | ADMINISTRATIVO, ALUMNO, PADRE |
| Becas y descuentos | `/finanzas/becas` | ADMINISTRATIVO |
| Facturación (CFDI) | `/finanzas/facturas` | ADMINISTRATIVO |
| Reportes financieros | `/finanzas/reportes` | ADMINISTRATIVO, ADMIN |
| Mi estado de cuenta | `/mi-estado-cuenta` | ALUMNO |

### Componentes necesarios

- Formulario de pago (monto, método, comprobante)
- Tabla de movimientos con filtros por período
- PDF viewer para comprobantes fiscales
- Dashboard financiero con KPIs (ingresos, cartera vencida)
- Gráficas de barras y líneas para reportes

---

## Fase 5 — Comunicación y Portales 📬

**Objetivo:** Portales diferenciados y sistema de mensajería.

### Páginas nuevas

| Página | Ruta | Roles |
|--------|------|-------|
| Portal de alumno (home) | `/portal` | ALUMNO |
| Portal de padre | `/portal-padre` | PADRE |
| Portal de docente | `/portal-docente` | DOCENTE |
| Mensajería | `/mensajes` | TODOS |
| Avisos y notificaciones | `/avisos` | TODOS |

### Componentes necesarios

- Cards de resumen por portal (próximos pagos, eventos, calificaciones recientes)
- Lista de mensajes (inbox style)
- Composer de mensajes (seleccionar destinatario por rol)
- Centro de notificaciones (campanita con badge)

---

## Fase 6 — Certificación y Reportes 📜

**Objetivo:** Generación de documentos oficiales y reportes avanzados.

### Páginas nuevas

| Página | Ruta | Roles |
|--------|------|-------|
| Historial académico (kardex) | `/alumnos/:id/kardex` | ESCOLAR, ALUMNO |
| Certificados | `/certificados` | ESCOLAR |
| Trámites de titulación | `/titulacion` | ESCOLAR, ALUMNO |
| Dashboard de estadísticas | `/estadisticas` | ADMIN, ESCOLAR |
| Reportes personalizados | `/reportes` | ADMIN, ESCOLAR |

### Componentes necesarios

- Vista de kardex (tabla de materias por semestre con calificaciones y créditos)
- Generador de PDF con diseño institucional
- Firma/sello digital visual
- Dashboard con KPIs y gráficas avanzadas
- Exportación a Excel/CSV de reportes

---

## Stack del proyecto

| Categoría | Tecnología |
|-----------|------------|
| Framework | React 19 |
| Build | Vite 6 |
| Router | React Router 7 |
| State | Zustand 5 |
| UI | shadcn/ui + Radix UI |
| Estilos | TailwindCSS 3 |
| Forms | React Hook Form 7 + Zod |
| HTTP | Axios |
| Notificaciones | Sonner |
| Lenguaje | TypeScript 5 |
| Contenedor | Docker + Compose |
| Package manager | pnpm 11 |

---

## Dependencia con el backend

- La API URL se configura en `.env` (`VITE_API_URL`)
- Los endpoints y modelos siguen el mismo plan de fases del backend
- Ambos repos deben avanzar sincronizados por fase
- El backend es la fuente de verdad para validación de datos
