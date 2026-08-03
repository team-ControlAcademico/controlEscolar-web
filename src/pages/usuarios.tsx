import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { User, Role, RegisterInput } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, UserCheck, UserX, Trash2, Edit } from "lucide-react";

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrador",
  ESCOLAR: "Control Escolar",
  ADMINISTRATIVO: "Administrativo",
  DOCENTE: "Docente",
  ALUMNO: "Alumno",
  PADRE: "Padre",
};

const ROLE_COLORS: Record<Role, string> = {
  ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  ESCOLAR: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  ADMINISTRATIVO: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  DOCENTE: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  ALUMNO: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  PADRE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
};

function getNombreUsuario(u: User): string {
  return (
    u.admin?.nombre ||
    u.escolar?.nombre ||
    u.administrativo?.nombre ||
    u.docente?.nombre ||
    u.alumno?.nombre ||
    u.padre?.nombre ||
    "Sin Nombre"
  );
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRole, setFiltroRole] = useState<string>("TODOS");

  // Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form, setForm] = useState<RegisterInput>({
    email: "",
    password: "",
    role: "ALUMNO",
    nombre: "",
    curp: "",
    especialidad: "",
    gradoAcademico: "",
    departamento: "",
    matricula: "",
    semestre: 1,
  });

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await api.getUsuarios({
        role: filtroRole !== "TODOS" ? filtroRole : undefined,
        busqueda: busqueda.trim() || undefined,
      });
      setUsuarios(data);
    } catch {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, [filtroRole]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadUsuarios();
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setForm({
      email: "",
      password: "",
      role: "ALUMNO",
      nombre: "",
      curp: "",
      especialidad: "",
      gradoAcademico: "",
      departamento: "",
      matricula: "",
      semestre: 1,
    });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({
      email: user.email,
      password: "", // no requerida en edición a menos que quiera cambiarla
      role: user.role,
      nombre: getNombreUsuario(user),
      curp: user.admin?.curp || user.escolar?.curp || user.administrativo?.curp || user.docente?.curp || user.alumno?.curp || user.padre?.curp || "",
      especialidad: user.docente?.especialidad || "",
      gradoAcademico: user.docente?.gradoAcademico || "",
      departamento: user.administrativo?.departamento || "",
      matricula: user.alumno?.matricula || "",
      semestre: user.alumno?.semestre || 1,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Actualizar usuario existente
        await api.actualizarUsuario(editingUser.id, {
          email: form.email,
          nombre: form.nombre,
          curp: form.curp,
          especialidad: form.especialidad,
          gradoAcademico: form.gradoAcademico,
          departamento: form.departamento,
          matricula: form.matricula,
          semestre: form.semestre,
        });
        toast.success("Usuario actualizado correctamente");
      } else {
        // Crear usuario nuevo
        if (!form.password) {
          toast.error("La contraseña es requerida");
          return;
        }
        await api.crearUsuarioAdmin(form);
        toast.success("Usuario creado correctamente");
      }
      setShowModal(false);
      loadUsuarios();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al guardar el usuario");
    }
  };

  const handleToggleActivo = async (user: User) => {
    try {
      await api.toggleActivarUsuario(user.id);
      toast.success(user.isActive ? "Usuario desactivado" : "Usuario activado");
      loadUsuarios();
    } catch {
      toast.error("Error al cambiar estatus del usuario");
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`¿Estás seguro de eliminar permanentemente al usuario ${getNombreUsuario(user)} (${user.email})?`)) {
      return;
    }
    try {
      await api.eliminarUsuario(user.id);
      toast.success("Usuario eliminado");
      loadUsuarios();
    } catch {
      toast.error("Error al eliminar usuario");
    }
  };

  const columns: Column<User>[] = [
    {
      key: "nombre",
      header: "Nombre",
      render: (u) => <span className="font-medium text-foreground">{getNombreUsuario(u)}</span>,
    },
    {
      key: "email",
      header: "Correo electrónico",
      render: (u) => <span className="text-sm text-muted-foreground">{u.email}</span>,
    },
    {
      key: "role",
      header: "Rol",
      render: (u) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role] || ""}`}>
          {ROLE_LABELS[u.role] || u.role}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Estado",
      render: (u) => (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded ${u.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${u.isActive ? "bg-green-600" : "bg-red-600"}`} />
          {u.isActive ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (u) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            title="Editar usuario"
            onClick={() => openEditModal(u)}
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            title={u.isActive ? "Desactivar cuenta" : "Activar cuenta"}
            onClick={() => handleToggleActivo(u)}
          >
            {u.isActive ? <UserX className="h-4 w-4 text-amber-600" /> : <UserCheck className="h-4 w-4 text-green-600" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            title="Eliminar usuario"
            onClick={() => handleDelete(u)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra los usuarios, asignación de roles y estados de cuenta en el sistema.
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o correo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={filtroRole} onValueChange={(val) => setFiltroRole(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos los roles</SelectItem>
                  {Object.entries(ROLE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tabla de Usuarios */}
      <DataTable
        columns={columns}
        data={usuarios}
        emptyMessage={loading ? "Cargando usuarios..." : "No se encontraron usuarios."}
      />

      {/* Modal Formulario Crear / Editar */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <Card className="w-full max-w-lg bg-card shadow-xl border">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">
                      {editingUser ? "Contraseña (dejar en blanco si no cambia)" : "Contraseña *"}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required={!editingUser}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Rol del Sistema *</Label>
                    <Select
                      disabled={!!editingUser}
                      value={form.role}
                      onValueChange={(val) => setForm({ ...form, role: val as Role })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ROLE_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="curp">CURP (Opcional)</Label>
                    <Input
                      id="curp"
                      value={form.curp}
                      onChange={(e) => setForm({ ...form, curp: e.target.value })}
                    />
                  </div>
                </div>

                {/* Campos Condicionales por Rol */}
                {form.role === "ALUMNO" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-3 rounded-lg border">
                    <div>
                      <Label htmlFor="matricula">Matrícula *</Label>
                      <Input
                        id="matricula"
                        value={form.matricula}
                        onChange={(e) => setForm({ ...form, matricula: e.target.value })}
                        placeholder="Ej. AL240099"
                        required={form.role === "ALUMNO"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="semestre">Semestre</Label>
                      <Input
                        id="semestre"
                        type="number"
                        min={1}
                        max={12}
                        value={form.semestre}
                        onChange={(e) => setForm({ ...form, semestre: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                )}

                {form.role === "DOCENTE" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-3 rounded-lg border">
                    <div>
                      <Label htmlFor="especialidad">Especialidad</Label>
                      <Input
                        id="especialidad"
                        value={form.especialidad}
                        onChange={(e) => setForm({ ...form, especialidad: e.target.value })}
                        placeholder="Ej. Matemáticas"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gradoAcademico">Grado Académico</Label>
                      <Input
                        id="gradoAcademico"
                        value={form.gradoAcademico}
                        onChange={(e) => setForm({ ...form, gradoAcademico: e.target.value })}
                        placeholder="Ej. Licenciatura / Maestría"
                      />
                    </div>
                  </div>
                )}

                {form.role === "ADMINISTRATIVO" && (
                  <div className="bg-muted/40 p-3 rounded-lg border">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input
                      id="departamento"
                      value={form.departamento}
                      onChange={(e) => setForm({ ...form, departamento: e.target.value })}
                      placeholder="Ej. Tesorería / Recaudación"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingUser ? "Guardar Cambios" : "Crear Usuario"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
