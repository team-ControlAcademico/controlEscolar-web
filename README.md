<div align="center">

# 🎓 Control Escolar — Web

**Interfaz moderna para el Sistema Integral de Control Escolar**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-764ABC?logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

---

*Aplicación web SPA con experiencia premium que conecta a alumnos, docentes, padres y administrativos en un solo lugar.*

[Ver Demo en Vivo →](https://control-escolar-web.vercel.app)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Stack Tecnológico](#-stack-tecnológico)
- [Características por Rol](#-características-por-rol)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Comandos Disponibles](#-comandos-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura Frontend](#-arquitectura-frontend)
- [Despliegue](#-despliegue)

---

## 📝 Descripción

Este repositorio contiene la **interfaz web** del Sistema de Control Escolar, una Single Page Application (SPA) construida con React y Vite que ofrece una experiencia rápida, moderna y responsiva.

La plataforma se adapta dinámicamente al rol del usuario autenticado, mostrando únicamente los módulos y acciones relevantes:

- **Administradores:** Panel de control total con gestión de usuarios, catálogos, finanzas y reportes.
- **Docentes:** Portal con grupos asignados, captura de asistencia y calificaciones.
- **Alumnos:** Portal personal con horario semanal, boleta, estado de cuenta y pagos en línea.
- **Padres:** Seguimiento del rendimiento académico y financiero de sus hijos.

---

## 🖼 Capturas de Pantalla

| Portal del Alumno | Gestión de Usuarios |
|---|---|
| Dashboard con KPIs, materias y horarios | CRUD completo con filtros y badges de rol |

| Estado de Cuenta | Horario Semanal |
|---|---|
| Movimientos financieros con pagos en línea | Vista calendario de lunes a viernes |

---

## ⚡ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **React 19** | Biblioteca de UI con componentes funcionales y hooks |
| **Vite** | Empaquetador ultrarrápido para desarrollo y producción |
| **TypeScript** | Tipado estático en toda la aplicación |
| **Tailwind CSS** | Framework de utilidades CSS para diseño responsivo |
| **Shadcn UI** | Componentes accesibles y personalizables (Radix primitives) |
| **Zustand** | Estado global liviano para autenticación y sesiones |
| **React Router v7** | Enrutamiento declarativo con rutas protegidas por rol |
| **Axios** | Cliente HTTP con interceptores para JWT |
| **Socket.IO Client** | Notificaciones y mensajería en tiempo real |
| **Sonner** | Sistema de notificaciones toast elegante |
| **Lucide React** | Iconografía moderna SVG |
| **React Hook Form + Zod** | Formularios validados con esquemas tipados |
| **pnpm** | Gestor de paquetes rápido y eficiente |

---

## 👥 Características por Rol

### 🔴 Administrador (`ADMIN`) y Control Escolar (`ESCOLAR`)
- Dashboard con resumen general del sistema
- **Gestión de Usuarios** — Crear, editar, activar/desactivar y eliminar cuentas con asignación de roles
- **Catálogos Académicos** — Carreras, planes de estudio, materias, ciclos escolares, grados y turnos
- **Grupos** — Creación, asignación de docentes y armado de horarios
- **Inscripciones** — Matriculación de alumnos en grupos
- **Finanzas** — Colegiaturas, pagos, becas, facturas CFDI, estado de cuenta y reportes financieros
- **Comunicación** — Publicación de avisos y mensajería privada

### 🟢 Docente (`DOCENTE`)
- Portal con grupos asignados y horarios
- Captura de asistencia por grupo y fecha
- Captura y edición de calificaciones
- Mensajería privada con alumnos y padres

### 🔵 Alumno (`ALUMNO`)
- Portal personal con promedio general, saldo pendiente y materias del ciclo
- **Mi Horario** — Vista de calendario semanal interactivo (lunes a viernes)
- **Mis Calificaciones** — Historial académico con filtro por ciclo escolar
- **Mi Estado de Cuenta** — Desglose de adeudos con botón de **Pago en Línea**
- Avisos institucionales y mensajería privada

### 🟣 Padre (`PADRE`)
- Portal con visibilidad del rendimiento de su hijo(a)
- Consulta de calificaciones y boleta
- Estado de cuenta compartido con el alumno
- Comunicación directa con docentes y administración

---

## 📌 Requisitos

- **Node.js** v18 o superior
- **pnpm** v9 o superior (`npm install -g pnpm`)
- El **backend** debe estar corriendo (ver [controlEscolar-api](https://github.com/team-ControlAcademico/controlEscolar-api))

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/team-ControlAcademico/controlEscolar-web.git
cd controlEscolar-web

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con la URL de tu API

# 4. Iniciar en modo desarrollo
pnpm dev
```

La aplicación se abrirá en `http://localhost:5173` 🎉

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del backend API
VITE_API_URL="http://localhost:4000/api"
```

Para producción (Vercel):
```env
VITE_API_URL="https://tu-api.onrender.com/api"
```

---

## 🛠 Comandos Disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Genera el bundle optimizado para producción |
| `pnpm preview` | Previsualiza el build de producción localmente |
| `pnpm lint` | Ejecuta ESLint para verificar estilo de código |

---

## 📁 Estructura del Proyecto

```
controlEscolar-web/
├── public/                    # Assets estáticos
├── src/
│   ├── components/
│   │   ├── layout/            # Layout legacy (Sidebar, Header)
│   │   └── ui/                # Componentes reutilizables (Shadcn UI)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── data-table.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── StatCard.tsx
│   │       └── ...
│   ├── context/
│   │   └── theme-context.tsx  # Proveedor de tema claro/oscuro
│   ├── layouts/
│   │   ├── auth-layout.tsx    # Layout para login/registro
│   │   └── dashboard-layout.tsx # Layout principal con navbar
│   ├── pages/
│   │   ├── portal/            # Portales por rol
│   │   │   ├── portal-alumno.tsx
│   │   │   ├── portal-docente.tsx
│   │   │   └── portal-padre.tsx
│   │   ├── finanzas/          # Módulo financiero
│   │   │   ├── colegiaturas.tsx
│   │   │   ├── pagos.tsx
│   │   │   ├── becas.tsx
│   │   │   ├── facturas.tsx
│   │   │   ├── estado-cuenta.tsx
│   │   │   └── reportes.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── dashboard.tsx
│   │   ├── usuarios.tsx       # Gestión de usuarios y roles
│   │   ├── carreras.tsx
│   │   ├── materias.tsx
│   │   ├── ciclos.tsx
│   │   ├── grupos.tsx
│   │   ├── inscripciones.tsx
│   │   ├── mi-horario.tsx
│   │   ├── mis-calificaciones.tsx
│   │   ├── avisos.tsx
│   │   ├── mensajes.tsx
│   │   └── ...
│   ├── router/
│   │   └── index.tsx          # Rutas protegidas por rol
│   ├── services/
│   │   ├── api.ts             # Cliente HTTP (Axios) con todos los endpoints
│   │   └── socket.ts          # Conexión Socket.IO
│   ├── stores/
│   │   └── auth.store.ts      # Estado global de autenticación (Zustand)
│   ├── types/
│   │   └── index.ts           # Interfaces y tipos TypeScript
│   ├── lib/
│   │   └── format.ts          # Utilidades de formato (moneda, fechas)
│   ├── App.tsx                # Componente raíz
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globales y Tailwind
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🏗 Arquitectura Frontend

### Flujo de Autenticación

```
Login Page → api.login() → Zustand Store → localStorage (tokens)
    ↓                           ↓
  Error?               ProtectedRoute
    ↓                       ↓         ↓
  Toast              Autorizado?    Redirige a /login
                         ↓
                   DashboardLayout
                   (navbar + outlet)
```

### Sistema de Rutas Protegidas

El enrutamiento utiliza `createBrowserRouter` de React Router v7 con un sistema de guardias anidado:

```tsx
// Cada grupo de rutas está protegido por roles específicos
<ProtectedRoute roles={["ADMIN", "ESCOLAR"]}>
  /carreras, /materias, /ciclos, /usuarios, ...
</ProtectedRoute>

<ProtectedRoute roles={["ALUMNO"]}>
  /mi-horario, /mis-calificaciones, /portal/alumno, ...
</ProtectedRoute>
```

Si un usuario intenta acceder a una ruta sin el rol requerido, es redirigido automáticamente al inicio.

### Estado Global (Zustand)

```tsx
useAuthStore()
├── user          // Datos del usuario autenticado
├── accessToken   // JWT de acceso
├── refreshToken  // JWT de refresco
├── isAuthenticated
├── login()       // Inicia sesión y guarda tokens
├── logout()      // Limpia sesión y tokens
├── fetchProfile()// Refresca datos del perfil
└── initialize()  // Recupera sesión desde localStorage
```

---

## 🚢 Despliegue

El frontend está desplegado en **[Vercel](https://vercel.com/)** con despliegue automático desde la rama `main`.

### Configuración en Vercel:

| Campo | Valor |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `pnpm run build` |
| **Output Directory** | `dist` |
| **Node.js Version** | 18.x |

### Variable de entorno en Vercel:
```
VITE_API_URL = https://controlescolar-api.onrender.com/api
```

---

## 🔗 Repositorios Relacionados

| Repositorio | Descripción |
|---|---|
| [controlEscolar-api](https://github.com/team-ControlAcademico/controlEscolar-api) | Backend RESTful (Node.js + Express + Prisma) |
| **controlEscolar-web** (este repo) | Frontend SPA (React + Vite + Tailwind) |

---

<div align="center">

**Desarrollado con ❤️ por el equipo de Control Académico**

</div>
