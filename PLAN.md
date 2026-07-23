# Plan de Desarrollo — Sistema de Control Escolar

> Plan de fases y sprints para el desarrollo integral (Frontend, Backend, DevOps y QA) del sistema universitario.
> Formato: Markdown, compatible con GitHub, gestores de proyecto y documentación.

---

## Fase 1 — Autenticación y Layout Base ✅ COMPLETADA

**Objetivo:** Interfaz de usuario con login, registro y estructura base protegida por roles, además de la inicialización de la arquitectura backend y contenedores.

### Tareas y Entregables del Sprint

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 1 | Semana 1 | Frontend | Jhonatan | FRONT-01 | Setup y Arquitectura Base | Repositorio inicializado y corriendo localmente | Done |
| Sprint 1 | Semana 1 | Frontend | Jhonatan | FRONT-02 | AuthLayout y Páginas de Acceso | Vistas responsivas enlazadas al router | Done |
| Sprint 1 | Semana 1 | Backend | Edier | BACK-01 | Setup Node y Express | Servidor levantado con health-check | Done |
| Sprint 1 | Semana 1 | Backend | Edier | BACK-02 | Modelos Usuario y Roles | Modelos con relaciones en BD | Done |
| Sprint 1 | Semana 1 | Backend | Edier | BACK-03 | Auth Controller | API login validando credenciales | Done |
| Sprint 1 | Semana 1 | Backend | Edier | BACK-04 | Middleware JWT | Rutas protegidas operando | Done |
| Sprint 1 | Semana 1 | Backend | Edier | BACK-05 | Setup Logger | Archivos log generados | Done |
| Sprint 1 | Semana 1 | DevOps | Esteban | DB-01 | Setup Docker y BD | Contenedores levantando App y PostgreSQL | Done |
| Sprint 1 | Semana 1 | QA | Karlos | QA-01 | Pruebas APIs Auth | Colección Postman exitosa | Done |

### Tecnologías usadas

React 19, Vite 6, TypeScript 5, Zustand 5, shadcn/ui, TailwindCSS 3, Express.js, PostgreSQL, Node.js, Docker

---

## Fase 2 — Gestión Académica 📅

**Objetivo:** Páginas CRUD para carreras, planes de estudio, materias, grupos y horarios con su respectivo respaldo en el backend.

### Páginas y Componentes

* **Rutas:** `/carreras`, `/planes`, `/materias`, `/ciclos`, `/grupos`, `/inscripciones`, `/mi-horario`, `/mis-grupos`
* **Componentes:** Sidebar dinámico, DataTable genérico, FormDialog, Breadcrumbs, SelectCarrera, SelectMateria.

### Tareas y Entregables de Sprints

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 2 | Semana 2 | Frontend | Jhonatan | FRONT-03 | DashboardLayout y Rutas | Navegación segura según rol | Done |
| Sprint 2 | Semana 2 | Frontend | Jhonatan | FRONT-04 | CRUD Carreras | Página funcional con modales | Done |
| Sprint 2 | Semana 2 | Backend | Edier | BACK-06 | Seeders Académicos | BD poblada con carreras base | To Do |
| Sprint 2 | Semana 2 | Backend | Edier | BACK-07 | CRUD Controller Carreras | Endpoints REST funcionales | To Do |
| Sprint 2 | Semana 2 | Backend | Edier | BACK-08 | Middleware Roles | Endpoints con validación 403 | To Do |
| Sprint 2 | Semana 2 | Backend | Edier | BACK-09 | Recovery Password | Endpoint de tokens temporales | To Do |
| Sprint 2 | Semana 2 | DevOps | Esteban | DB-02 | Migraciones Académicas | Esquema BD actualizado | To Do |
| Sprint 2 | Semana 2 | QA | Karlos | QA-02 | Validaciones Seguridad | Pruebas de penetración sin fallos | To Do |
| Sprint 3 | Semana 3 | Frontend | Jhonatan | FRONT-05 | Gestión Planes de Estudio | Interfaz con retícula de materias | Done |
| Sprint 3 | Semana 3 | Frontend | Jhonatan | FRONT-06 | CRUD Materias y Ciclos | Vistas operativas con Zod | Done |
| Sprint 3 | Semana 3 | Backend | Edier | BACK-10 | Modelos Planes y Materias | Modelos ORM relacionales | To Do |
| Sprint 3 | Semana 3 | Backend | Edier | BACK-11 | Controllers Materias | Endpoints validando unicidad | To Do |
| Sprint 3 | Semana 3 | Backend | Edier | BACK-12 | API Ciclos Escolares | Rutas POST/GET para ciclos | To Do |
| Sprint 3 | Semana 3 | Backend | Edier | BACK-13 | Rate Limiter | API bloqueando ataques fuerza bruta | To Do |
| Sprint 3 | Semana 3 | DevOps | Esteban | DB-03 | Tablas Puente | Migraciones pivote plan_materia | To Do |
| Sprint 3 | Semana 3 | QA | Karlos | QA-03 | Pruebas Integridad | Bloqueo de borrado en cascada | To Do |
| Sprint 4 | Semana 4 | Frontend | Jhonatan | FRONT-07 | Módulo Grupos | Tabla reflejando profesor y cupo + gestión de horarios | Done |
| Sprint 4 | Semana 4 | Frontend | Jhonatan | FRONT-08 | Interfaz Inscripción | Formulario procesando matrículas | Done |
| Sprint 4 | Semana 4 | Backend | Edier | BACK-14 | Modelos Grupos | Relaciones alumno_grupo | To Do |
| Sprint 4 | Semana 4 | Backend | Edier | BACK-15 | Transacciones BD | Inscripciones con rollback seguro | To Do |
| Sprint 4 | Semana 4 | Backend | Edier | BACK-16 | API Horarios | JSON cruzando datos de grupos/días | To Do |
| Sprint 4 | Semana 4 | Backend | Edier | BACK-17 | Cola de Trabajos (Redis) | Worker procesando correos | To Do |
| Sprint 4 | Semana 4 | QA | Karlos | QA-04 | Pruebas de Cupo | API respondiendo error sobrecupo | To Do |

---

## Fase 3 — Asistencia y Evaluación ✅ COMPLETADA

**Objetivo:** Interfaces para control de asistencia, captura de calificaciones y lógica de promedios.

### Páginas y Componentes

* **Rutas:** `/grupos/:id/asistencia`, `/alumnos/:id/asistencia`, `/grupos/:id/calificaciones`, `/alumnos/:id/boleta`, `/mis-calificaciones`
* **Componentes:** Selector de fecha, Tabla toggle presente/ausente, Tabla inputs numéricos, Gráficas Recharts.

### Tareas y Entregables de Sprints

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 5 | Semana 5 | Frontend | Jhonatan | FRONT-09 | Interfaz Pasar Lista | Tabla enviando lote de asistencias | Done |
| Sprint 5 | Semana 5 | Frontend | Jhonatan | FRONT-10 | Historial Asistencia | Vista reflejando porcentajes | Done |
| Sprint 5 | Semana 5 | Backend | Edier | BACK-18 | Modelo Control Asistencia | Esquema para faltas por materia | Done |
| Sprint 5 | Semana 5 | Backend | Edier | BACK-19 | Inserción Masiva Batch | Endpoint procesando arrays rápidos | Done |
| Sprint 5 | Semana 5 | Backend | Edier | BACK-20 | API Estadísticas Faltas | Endpoint de alertas de riesgo | Done |
| Sprint 5 | Semana 5 | Backend | Edier | BACK-21 | Caché Redis Asistencia | Consultas respondiendo desde memoria | Done |
| Sprint 5 | Semana 5 | QA | Karlos | QA-05 | Pruebas Zonas Horarias | Registros consistentes con server | Done |
| Sprint 6 | Semana 6 | Frontend | Jhonatan | FRONT-11 | Captura Calificaciones | Matriz validando decimales/rango | Done |
| Sprint 6 | Semana 6 | Frontend | Jhonatan | FRONT-12 | Vista Boleta Estudiantil | Boleta con gráficas de desempeño | Done |
| Sprint 6 | Semana 6 | Backend | Edier | BACK-22 | Modelo Evaluaciones | Tabla de parciales y proyectos | Done |
| Sprint 6 | Semana 6 | Backend | Edier | BACK-23 | Controller Calificaciones | API rechazando datos inválidos | Done |
| Sprint 6 | Semana 6 | Backend | Edier | BACK-24 | Motor Promedios | Servicio aplicando redondeo | Done |
| Sprint 6 | Semana 6 | Backend | Edier | BACK-25 | Bloqueo Actas | API retornando error 423 Locked | Done |
| Sprint 6 | Semana 6 | Backend | Edier | BACK-26 | Generador Boletas asíncrono | Worker creando PDFs en background | Done |

---

## Fase 4 — Finanzas 💰 ✅ COMPLETADA

**Objetivo:** Interfaces de cobranza, pagos, facturación (CFDI) y estado de cuenta.

> Páginas entregadas en `src/pages/finanzas/`: `colegiaturas`, `pagos`, `becas`, `facturas`, `estado-cuenta` (rol-consciente), `reportes`. Rutas `/finanzas/*` protegidas (ADMIN/ADMINISTRATIVO gestionan; ALUMNO/PADRE consultan `/finanzas/mi-estado-cuenta`). Navegación agregada al sidebar.

### Páginas y Componentes

* **Rutas:** `/finanzas/colegiaturas`, `/finanzas/pagos`, `/finanzas/estado-cuenta`, `/finanzas/becas`, `/finanzas/facturas`, `/finanzas/reportes`
* **Componentes:** Formulario de pago, PDF viewer, Dashboard KPI financiero.

### Tareas y Entregables de Sprints

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 7 | Semana 7 | Frontend | Jhonatan | FRONT-13 | Colegiaturas y Pagos | Catálogo de cuotas e interfaz cobro | Done |
| Sprint 7 | Semana 7 | Frontend | Jhonatan | FRONT-14 | Estados de Cuenta | Historial de movimientos claro | Done |
| Sprint 7 | Semana 7 | Backend | Edier | BACK-27 | Modelos Financieros | Tablas decimales alta precisión | To Do |
| Sprint 7 | Semana 7 | Backend | Edier | BACK-28 | Cargos Automáticos | Cron Job ejecutándose mensual | To Do |
| Sprint 7 | Semana 7 | Backend | Edier | BACK-29 | API Transacciones | Saldo actualizándose en tiempo real | To Do |
| Sprint 7 | Semana 7 | Backend | Edier | BACK-30 | Webhooks Pagos | Endpoint procesando firmas Stripe | To Do |
| Sprint 7 | Semana 7 | QA | Karlos | QA-06 | Auditoría Decimales | Sumatorias cuadrando exactas | To Do |
| Sprint 8 | Semana 8 | Frontend | Jhonatan | FRONT-15 | Gestión Becas | Interfaz para asignar descuentos | Done |
| Sprint 8 | Semana 8 | Frontend | Jhonatan | FRONT-16 | Panel Facturación CFDI | Visor PDF y descargas operando | Done |
| Sprint 8 | Semana 8 | Backend | Edier | BACK-31 | Descuentos y Recargos | API calculando total dinámico | To Do |
| Sprint 8 | Semana 8 | Backend | Edier | BACK-32 | Integración SAT | UUID y cadena original obtenida | To Do |
| Sprint 8 | Semana 8 | Backend | Edier | BACK-33 | Generación XML/PDF | Archivos guardados en bucket | To Do |
| Sprint 8 | Semana 8 | Backend | Edier | BACK-34 | Cifrado Datos | Datos protegidos con AES-256 | To Do |
| Sprint 8 | Semana 8 | QA | Karlos | QA-07 | Validaciones XML | Comprobantes pasando validador | To Do |

---

## Fase 5 — Comunicación y Portales 📬

**Objetivo:** Portales diferenciados mediante BFF (Backend For Frontend) y sistema de mensajería en tiempo real.

### Páginas y Componentes

* **Rutas:** `/portal`, `/portal-padre`, `/portal-docente`, `/mensajes`, `/avisos`
* **Componentes:** Cards de resumen, Inbox style list, Notificaciones push.

### Tareas y Entregables de Sprints

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 9 | Semana 9 | Frontend | Jhonatan | FRONT-17 | Dashboards Portales | Vistas dinámicas por usuario | To Do |
| Sprint 9 | Semana 9 | Frontend | Jhonatan | FRONT-18 | Componentes Resumen | Gráficas ligeras renderizando | To Do |
| Sprint 9 | Semana 9 | Backend | Edier | BACK-35 | BFF Portal Alumno | Payload consolidado en 1 petición | To Do |
| Sprint 9 | Semana 9 | Backend | Edier | BACK-36 | BFF Portal Docente | Payload priorizando tareas | To Do |
| Sprint 9 | Semana 9 | Backend | Edier | BACK-37 | BFF Portal Padre | API con selector de hijos | To Do |
| Sprint 9 | Semana 9 | Backend | Edier | BACK-38 | GraphQL (Opcional) | Endpoint alternativo de consultas | To Do |
| Sprint 9 | Semana 9 | DevOps | Esteban | DB-04 | Optimización Índices | Tiempos de carga reducidos | To Do |
| Sprint 10 | Semana 10 | Frontend | Jhonatan | FRONT-19 | Interfaz Mensajería | Layout doble panel de chats | To Do |
| Sprint 10 | Semana 10 | Frontend | Jhonatan | FRONT-20 | Notificaciones Tiempo Real | Burbuja actualizándose sola | To Do |
| Sprint 10 | Semana 10 | Backend | Edier | BACK-39 | Modelos Mensajería | Tablas chat/participantes creadas | To Do |
| Sprint 10 | Semana 10 | Backend | Edier | BACK-40 | Setup Socket.io | Conexiones bidireccionales estables | To Do |
| Sprint 10 | Semana 10 | Backend | Edier | BACK-41 | Notificaciones Push | Usuarios recibiendo alertas de sistema | To Do |
| Sprint 10 | Semana 10 | Backend | Edier | BACK-42 | Carga Archivos (Multer) | Archivos subidos adjuntos a mensajes | To Do |
| Sprint 10 | Semana 10 | QA | Karlos | QA-08 | Pruebas Carga Sockets | Servidor soportando tráfico masivo | To Do |

---

## Fase 6 — Certificación y Reportes 📜

**Objetivo:** Generación de Kardex, trámites de titulación y reportes directivos consolidados.

### Páginas y Componentes

* **Rutas:** `/alumnos/:id/kardex`, `/certificados`, `/titulacion`, `/estadisticas`, `/reportes`
* **Componentes:** Vista kardex, Generador PDF institucional, Exportación CSV.

### Tareas y Entregables de Sprints

| Sprint | Semana | Área | Responsable | ID | Tarea | Entregable | Estado |
|---|---|---|---|---|---|---|---|
| Sprint 11 | Semana 11 | Frontend | Jhonatan | FRONT-21 | Historial Académico | Tabla mostrando progreso total | To Do |
| Sprint 11 | Semana 11 | Frontend | Jhonatan | FRONT-22 | Trámites Titulación | Kanban guiando el trámite | To Do |
| Sprint 11 | Semana 11 | Backend | Edier | BACK-43 | Motor Kardex | API devolviendo historial limpio | To Do |
| Sprint 11 | Semana 11 | Backend | Edier | BACK-44 | Evaluador Créditos | Sistema marcando candidatos | To Do |
| Sprint 11 | Semana 11 | Backend | Edier | BACK-45 | State Machine Titulación | Validación de proceso paso a paso | To Do |
| Sprint 11 | Semana 11 | Backend | Edier | BACK-46 | Integridad Expediente | Bloqueo si faltan actas físicas | To Do |
| Sprint 11 | Semana 11 | QA | Karlos | QA-09 | Auditoría Historiales | Promedios coincidiendo con manual | To Do |
| Sprint 12 | Semana 12 | Frontend | Jhonatan | FRONT-23 | Dashboard Estadísticas | Panel directivo de métricas | To Do |
| Sprint 12 | Semana 12 | Frontend | Jhonatan | FRONT-24 | Exportación Reportes | Botones descargando Excel/PDF | To Do |
| Sprint 12 | Semana 12 | Backend | Edier | BACK-47 | Vistas SQL Estadísticas | Consultas pesadas optimizadas | To Do |
| Sprint 12 | Semana 12 | Backend | Edier | BACK-48 | Generador PDFs | Certificados con metadatos | To Do |
| Sprint 12 | Semana 12 | Backend | Edier | BACK-49 | Exportador Excel | Endpoints retornando archivos xlsx | To Do |
| Sprint 12 | Semana 12 | Backend | Edier | BACK-50 | Respaldos Automatizados | Backups diarios seguros en S3 | To Do |
| Sprint 12 | Semana 12 | QA | Karlos | QA-10 | Pruebas E2E | Flujo completo garantizando pase a prod | To Do |

---

## Stack del proyecto completo

| Categoría | Tecnología |
|-----------|------------|
| Frontend Core | React 19, Vite 6, TypeScript 5 |
| UI & Estilos | TailwindCSS 3, shadcn/ui + Radix UI |
| Estado & Data | Zustand 5, Axios, React Hook Form 7 + Zod |
| Backend Core | Node.js, Express.js |
| Base de Datos | PostgreSQL (Migraciones y Seeds) |
| Herramientas Adicionales | Socket.io, Redis, BullMQ |
| Infraestructura | Docker + Compose, AWS S3 (Opcional para Storage) |

---

## Dependencia con el backend e Integración Continua

- La API URL del Frontend se configura en `.env` (`VITE_API_URL`)
- Los endpoints y modelos están perfectamente sincronizados mediante este esquema de sprints
- Ambos repositorios deben avanzar a la par semana a semana
- El backend actúa como la fuente central de verdad para toda validación de negocio y seguridad