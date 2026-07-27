import api from "./client";
import type { ApiResponse, Carrera, PlanEstudio, Materia, CicloEscolar, Grupo, Horario, Inscripcion, AlumnoFull, DocenteProfile, LoginInput, RegisterInput, Asistencia, AsistenciaEstadistica, CalificacionGrupoResult, BoletaResult, Colegiatura, Pago, Beca, Descuento, Factura, EstadoCuenta, ReporteFinanciero } from "@/types";

// ─── Auth ───
export async function login(data: LoginInput) {
  const response = await api.post<ApiResponse>("/auth/login", data);
  return response.data;
}
export async function register(data: RegisterInput) {
  const response = await api.post<ApiResponse>("/auth/register", data);
  return response.data;
}
export async function getProfile() {
  const response = await api.get<ApiResponse>("/auth/profile");
  return response.data;
}
export async function logout(refreshToken: string) {
  const response = await api.post<ApiResponse>("/auth/logout", { refreshToken });
  return response.data;
}

// ─── Carreras ───
export async function getCarreras() {
  const { data } = await api.get<ApiResponse<Carrera[]>>("/carreras");
  return data.data!;
}
export async function getCarrera(id: string) {
  const { data } = await api.get<ApiResponse<Carrera>>(`/carreras/${id}`);
  return data.data!;
}
export async function createCarrera(body: Partial<Carrera>) {
  const { data } = await api.post<ApiResponse<Carrera>>("/carreras", body);
  return data.data!;
}
export async function updateCarrera(id: string, body: Partial<Carrera>) {
  const { data } = await api.put<ApiResponse<Carrera>>(`/carreras/${id}`, body);
  return data.data!;
}
export async function deleteCarrera(id: string) {
  await api.delete(`/carreras/${id}`);
}

// ─── Planes de estudio ───
export async function getPlanes() {
  const { data } = await api.get<ApiResponse<PlanEstudio[]>>("/planes");
  return data.data!;
}
export async function getPlan(id: string) {
  const { data } = await api.get<ApiResponse<PlanEstudio>>(`/planes/${id}`);
  return data.data!;
}
export async function createPlan(body: { clave: string; nombre: string; carreraId: string }) {
  const { data } = await api.post<ApiResponse<PlanEstudio>>("/planes", body);
  return data.data!;
}
export async function updatePlan(id: string, body: any) {
  const { data } = await api.put<ApiResponse<PlanEstudio>>(`/planes/${id}`, body);
  return data.data!;
}
export async function deletePlan(id: string) {
  await api.delete(`/planes/${id}`);
}
export async function agregarMateriaPlan(planId: string, materiaId: string, semestre: number) {
  const { data } = await api.post<ApiResponse>(`/planes/${planId}/materias`, { materiaId, semestre });
  return data;
}
export async function quitarMateriaPlan(planId: string, materiaId: string) {
  await api.delete(`/planes/${planId}/materias/${materiaId}`);
}

// ─── Materias ───
export async function getMaterias() {
  const { data } = await api.get<ApiResponse<Materia[]>>("/materias");
  return data.data!;
}
export async function getMateria(id: string) {
  const { data } = await api.get<ApiResponse<Materia>>(`/materias/${id}`);
  return data.data!;
}
export async function createMateria(body: Partial<Materia>) {
  const { data } = await api.post<ApiResponse<Materia>>("/materias", body);
  return data.data!;
}
export async function updateMateria(id: string, body: Partial<Materia>) {
  const { data } = await api.put<ApiResponse<Materia>>(`/materias/${id}`, body);
  return data.data!;
}
export async function deleteMateria(id: string) {
  await api.delete(`/materias/${id}`);
}

// ─── Ciclos Escolares ───
export async function getCiclos() {
  const { data } = await api.get<ApiResponse<CicloEscolar[]>>("/ciclos");
  return data.data!;
}
export async function getCiclo(id: string) {
  const { data } = await api.get<ApiResponse<CicloEscolar>>(`/ciclos/${id}`);
  return data.data!;
}
export async function createCiclo(body: { nombre: string; fechaInicio: string; fechaFin: string; tipo?: string }) {
  const { data } = await api.post<ApiResponse<CicloEscolar>>("/ciclos", body);
  return data.data!;
}
export async function updateCiclo(id: string, body: any) {
  const { data } = await api.put<ApiResponse<CicloEscolar>>(`/ciclos/${id}`, body);
  return data.data!;
}
export async function deleteCiclo(id: string) {
  await api.delete(`/ciclos/${id}`);
}
export async function toggleCiclo(id: string) {
  const { data } = await api.patch<ApiResponse>(`/ciclos/${id}/toggle-activo`);
  return data;
}

// ─── Grupos ───
export async function getGrupos(params?: { cicloId?: string; docenteId?: string }) {
  const query = new URLSearchParams();
  if (params?.cicloId) query.append("cicloId", params.cicloId);
  if (params?.docenteId) query.append("docenteId", params.docenteId);
  const { data } = await api.get<ApiResponse<Grupo[]>>(`/grupos?${query}`);
  return data.data!;
}
export async function getGrupo(id: string) {
  const { data } = await api.get<ApiResponse<Grupo>>(`/grupos/${id}`);
  return data.data!;
}
export async function createGrupo(body: any) {
  const { data } = await api.post<ApiResponse<Grupo>>("/grupos", body);
  return data.data!;
}
export async function updateGrupo(id: string, body: any) {
  const { data } = await api.put<ApiResponse<Grupo>>(`/grupos/${id}`, body);
  return data.data!;
}
export async function deleteGrupo(id: string) {
  await api.delete(`/grupos/${id}`);
}
export async function addHorario(grupoId: string, body: Partial<Horario>) {
  const { data } = await api.post<ApiResponse<Horario>>(`/grupos/${grupoId}/horarios`, body);
  return data.data!;
}
export async function removeHorario(grupoId: string, horarioId: string) {
  await api.delete(`/grupos/${grupoId}/horarios/${horarioId}`);
}

// ─── Inscripciones ───
export async function getInscripciones(params?: { grupoId?: string; alumnoId?: string }) {
  const query = new URLSearchParams();
  if (params?.grupoId) query.append("grupoId", params.grupoId);
  if (params?.alumnoId) query.append("alumnoId", params.alumnoId);
  const { data } = await api.get<ApiResponse<Inscripcion[]>>(`/inscripciones?${query}`);
  return data.data!;
}
export async function getInscripcion(id: string) {
  const { data } = await api.get<ApiResponse<Inscripcion>>(`/inscripciones/${id}`);
  return data.data!;
}
export async function inscribirAlumno(alumnoId: string, grupoId: string) {
  const { data } = await api.post<ApiResponse<Inscripcion>>("/inscripciones", { alumnoId, grupoId });
  return data.data!;
}
export async function updateInscripcionEstatus(id: string, estatus: string) {
  const { data } = await api.patch<ApiResponse>(`/inscripciones/${id}/estatus`, { estatus });
  return data;
}
export async function deleteInscripcion(id: string) {
  await api.delete(`/inscripciones/${id}`);
}

// ─── Alumnos ───
export async function getAlumnos() {
  const { data } = await api.get<ApiResponse<AlumnoFull[]>>("/alumnos");
  return data.data!;
}
export async function getAlumno(id: string) {
  const { data } = await api.get<ApiResponse<AlumnoFull>>(`/alumnos/${id}`);
  return data.data!;
}

// ─── Docentes ───
export async function getDocentes() {
  const { data } = await api.get<ApiResponse<DocenteProfile[]>>("/docentes");
  return data.data!;
}

// ─── Asistencia (Fase 3) ───
export async function registrarAsistencia(grupoId: string, fecha: string, registros: { alumnoId: string; presente: boolean; justificacion?: string }[]) {
  const { data } = await api.post<ApiResponse>(`/asistencias/grupo/${grupoId}`, { fecha, registros });
  return data;
}
export async function getAsistenciaGrupo(grupoId: string, fecha?: string) {
  const query = fecha ? `?fecha=${fecha}` : "";
  const { data } = await api.get<ApiResponse<Asistencia[]>>(`/asistencias/grupo/${grupoId}${query}`);
  return data.data!;
}
export async function getAsistenciaAlumno(alumnoId: string, grupoId?: string) {
  const query = grupoId ? `?grupoId=${grupoId}` : "";
  const { data } = await api.get<ApiResponse<Asistencia[]>>(`/asistencias/alumno/${alumnoId}${query}`);
  return data.data!;
}
export async function getEstadisticasAsistencia(grupoId: string) {
  const { data } = await api.get<ApiResponse<AsistenciaEstadistica[]>>(`/asistencias/grupo/${grupoId}/estadisticas`);
  return data.data!;
}
export async function getFechasAsistencia(grupoId: string) {
  const { data } = await api.get<ApiResponse<string[]>>(`/asistencias/grupo/${grupoId}/fechas`);
  return data.data!;
}

// ─── Calificaciones (Fase 3) ───
export async function registrarCalificaciones(grupoId: string, unidad: number, tipo: string, registros: { alumnoId: string; calificacion: number }[]) {
  const { data } = await api.post<ApiResponse>(`/calificaciones/grupo/${grupoId}`, { unidad, tipo, registros });
  return data;
}
export async function getCalificacionesGrupo(grupoId: string) {
  const { data } = await api.get<ApiResponse<CalificacionGrupoResult>>(`/calificaciones/grupo/${grupoId}`);
  return data.data!;
}
export async function getBoletaAlumno(alumnoId: string, cicloEscolarId?: string) {
  const query = cicloEscolarId ? `?cicloEscolarId=${cicloEscolarId}` : "";
  const { data } = await api.get<ApiResponse<BoletaResult>>(`/calificaciones/alumno/${alumnoId}/boleta${query}`);
  return data.data!;
}
export async function getMisCalificaciones() {
  const { data } = await api.get<ApiResponse<BoletaResult>>("/calificaciones/mis-calificaciones");
  return data.data!;
}

// ─── FASE 4: Finanzas ───

// Colegiaturas
export async function getColegiaturas(params?: { alumnoId?: string; cicloEscolarId?: string; estatus?: string }) {
  const query = new URLSearchParams();
  if (params?.alumnoId) query.append("alumnoId", params.alumnoId);
  if (params?.cicloEscolarId) query.append("cicloEscolarId", params.cicloEscolarId);
  if (params?.estatus) query.append("estatus", params.estatus);
  const { data } = await api.get<ApiResponse<Colegiatura[]>>(`/finanzas/colegiaturas?${query}`);
  return data.data!;
}
export async function createColegiatura(body: Partial<Colegiatura> & { alumnoId: string; cicloEscolarId: string }) {
  const { data } = await api.post<ApiResponse<Colegiatura>>("/finanzas/colegiaturas", body);
  return data.data!;
}
export async function updateColegiatura(id: string, body: Partial<Colegiatura>) {
  const { data } = await api.put<ApiResponse<Colegiatura>>(`/finanzas/colegiaturas/${id}`, body);
  return data.data!;
}
export async function deleteColegiatura(id: string) {
  await api.delete(`/finanzas/colegiaturas/${id}`);
}
export async function generarCargos(body: { cicloEscolarId: string; concepto: string; monto: number; fechaVencimiento: string }) {
  const { data } = await api.post<ApiResponse<{ creados: number; omitidos: number; totalAlumnos: number }>>("/finanzas/colegiaturas/generar", body);
  return data.data!;
}

// Pagos
export async function getPagos(params?: { alumnoId?: string; colegiaturaId?: string }) {
  const query = new URLSearchParams();
  if (params?.alumnoId) query.append("alumnoId", params.alumnoId);
  if (params?.colegiaturaId) query.append("colegiaturaId", params.colegiaturaId);
  const { data } = await api.get<ApiResponse<Pago[]>>(`/finanzas/pagos?${query}`);
  return data.data!;
}
export async function registrarPago(body: { colegiaturaId: string; monto: number; metodo: string; referencia?: string }) {
  const { data } = await api.post<ApiResponse<Pago>>("/finanzas/pagos", body);
  return data.data!;
}
export async function cancelarPago(id: string) {
  const { data } = await api.patch<ApiResponse>(`/finanzas/pagos/${id}/cancelar`);
  return data;
}

// Becas
export async function getBecas(params?: { alumnoId?: string }) {
  const query = new URLSearchParams();
  if (params?.alumnoId) query.append("alumnoId", params.alumnoId);
  const { data } = await api.get<ApiResponse<Beca[]>>(`/finanzas/becas?${query}`);
  return data.data!;
}
export async function createBeca(body: Partial<Beca> & { alumnoId: string }) {
  const { data } = await api.post<ApiResponse<Beca>>("/finanzas/becas", body);
  return data.data!;
}
export async function updateBeca(id: string, body: Partial<Beca>) {
  const { data } = await api.put<ApiResponse<Beca>>(`/finanzas/becas/${id}`, body);
  return data.data!;
}
export async function deleteBeca(id: string) {
  await api.delete(`/finanzas/becas/${id}`);
}

// Descuentos
export async function getDescuentos() {
  const { data } = await api.get<ApiResponse<Descuento[]>>("/finanzas/descuentos");
  return data.data!;
}
export async function createDescuento(body: Partial<Descuento>) {
  const { data } = await api.post<ApiResponse<Descuento>>("/finanzas/descuentos", body);
  return data.data!;
}
export async function updateDescuento(id: string, body: Partial<Descuento>) {
  const { data } = await api.put<ApiResponse<Descuento>>(`/finanzas/descuentos/${id}`, body);
  return data.data!;
}
export async function deleteDescuento(id: string) {
  await api.delete(`/finanzas/descuentos/${id}`);
}

// Facturas (CFDI)
export async function getFacturas(params?: { estatus?: string }) {
  const query = new URLSearchParams();
  if (params?.estatus) query.append("estatus", params.estatus);
  const { data } = await api.get<ApiResponse<Factura[]>>(`/finanzas/facturas?${query}`);
  return data.data!;
}
export async function getFactura(id: string, incluirXml = false) {
  const query = incluirXml ? "?xml=true" : "";
  const { data } = await api.get<ApiResponse<Factura>>(`/finanzas/facturas/${id}${query}`);
  return data.data!;
}
export async function generarFactura(body: { pagoId: string; rfcReceptor: string; razonSocial: string; usoCfdi?: string }) {
  const { data } = await api.post<ApiResponse<Factura>>("/finanzas/facturas", body);
  return data.data!;
}
export async function cancelarFactura(id: string) {
  const { data } = await api.patch<ApiResponse<Factura>>(`/finanzas/facturas/${id}/cancelar`);
  return data.data!;
}

// Estado de cuenta y reportes
export async function getEstadoCuenta(alumnoId: string) {
  const { data } = await api.get<ApiResponse<EstadoCuenta>>(`/finanzas/estado-cuenta/${alumnoId}`);
  return data.data!;
}
export async function getMiEstadoCuenta() {
  const { data } = await api.get<ApiResponse<EstadoCuenta>>("/finanzas/mi-estado-cuenta");
  return data.data!;
}
export async function getReporteFinanciero(cicloEscolarId?: string) {
  const query = cicloEscolarId ? `?cicloEscolarId=${cicloEscolarId}` : "";
  const { data } = await api.get<ApiResponse<ReporteFinanciero>>(`/finanzas/reportes${query}`);
  return data.data!;
}

