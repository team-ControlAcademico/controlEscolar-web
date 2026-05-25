import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { DataTable, type DataTableColumn } from '../../components/ui/DataTable';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useCatalog } from '../../hooks/useCatalog';
import { ciclosService } from '../../services/catalogs';
import type { CicloEscolar } from '../../types/catalogs';

interface FormState {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
}

const EMPTY_FORM: FormState = {
  nombre: '',
  fechaInicio: '',
  fechaFin: '',
  activo: true,
};

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
  if (!form.fechaInicio) errors.fechaInicio = 'Selecciona la fecha de inicio.';
  if (!form.fechaFin) errors.fechaFin = 'Selecciona la fecha de fin.';
  if (form.fechaInicio && form.fechaFin && form.fechaInicio > form.fechaFin) {
    errors.fechaFin = 'La fecha de fin debe ser posterior a la de inicio.';
  }
  return errors;
}

export function CiclosEscolares() {
  const { items, loading, error, create, update, remove, submitting } = useCatalog(ciclosService);
  const [editing, setEditing] = useState<CicloEscolar | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<CicloEscolar | null>(null);

  const isOpen = creating || editing !== null;

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setCreating(true);
  }

  function openEdit(row: CicloEscolar) {
    setCreating(false);
    setForm({
      nombre: row.nombre,
      fechaInicio: row.fechaInicio,
      fechaFin: row.fechaFin,
      activo: row.activo,
    });
    setFormErrors({});
    setEditing(row);
  }

  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const result = editing ? await update(editing.id, form) : await create(form);
    if (result) closeModal();
  }

  async function handleDelete() {
    if (!toDelete) return;
    const ok = await remove(toDelete.id);
    if (ok) setToDelete(null);
  }

  const columns: DataTableColumn<CicloEscolar>[] = [
    {
      key: 'nombre',
      header: 'Ciclo',
      accessor: 'nombre',
      className: 'font-semibold text-neutral-900',
    },
    { key: 'inicio', header: 'Inicia', accessor: 'fechaInicio' },
    { key: 'fin', header: 'Termina', accessor: 'fechaFin' },
    {
      key: 'activo',
      header: 'Estado',
      cell: (row) => (
        <Badge tone={row.activo ? 'success' : 'neutral'}>
          {row.activo ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
      searchable: false,
    },
    {
      key: 'acciones',
      header: 'Acciones',
      align: 'right',
      searchable: false,
      cell: (row) => (
        <div className="flex justify-end gap-1.5">
          <button
            type="button"
            onClick={() => openEdit(row)}
            className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-600"
            aria-label={`Editar ${row.nombre}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setToDelete(row)}
            className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label={`Eliminar ${row.nombre}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">
            Ciclos escolares
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Administra los periodos lectivos del plantel.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
          Nuevo ciclo
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={items}
        rowKey={(row) => row.id}
        loading={loading}
        searchPlaceholder="Buscar por nombre o fecha…"
        emptyMessage="No hay ciclos escolares registrados."
        title="Listado de ciclos"
        subtitle={`${items.length} registro${items.length === 1 ? '' : 's'}`}
      />

      <Modal
        open={isOpen}
        onClose={submitting ? () => undefined : closeModal}
        title={editing ? 'Editar ciclo escolar' : 'Nuevo ciclo escolar'}
        description="Define el rango de fechas y el estado del ciclo."
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={submitting}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Guardando…' : 'Guardar'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            name="nombre"
            placeholder="2025-2026"
            value={form.nombre}
            onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
            error={formErrors.nombre}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Fecha de inicio"
              name="fechaInicio"
              type="date"
              value={form.fechaInicio}
              onChange={(e) => setForm((prev) => ({ ...prev, fechaInicio: e.target.value }))}
              error={formErrors.fechaInicio}
            />
            <Input
              label="Fecha de fin"
              name="fechaFin"
              type="date"
              value={form.fechaFin}
              onChange={(e) => setForm((prev) => ({ ...prev, fechaFin: e.target.value }))}
              error={formErrors.fechaFin}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => setForm((prev) => ({ ...prev, activo: e.target.checked }))}
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-400"
            />
            Ciclo activo
          </label>
        </form>
      </Modal>

      <ConfirmDialog
        open={toDelete !== null}
        title="Eliminar ciclo"
        message={`¿Eliminar el ciclo "${toDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={submitting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
