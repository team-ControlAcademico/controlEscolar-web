import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { DataTable, type DataTableColumn } from '../../components/ui/DataTable';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useCatalog } from '../../hooks/useCatalog';
import { gradosService } from '../../services/catalogs';
import type { Grado } from '../../types/catalogs';

type Nivel = Grado['nivel'];

const NIVELES: Nivel[] = ['preescolar', 'primaria', 'secundaria', 'preparatoria'];

interface FormState {
  nombre: string;
  nivel: Nivel;
  orden: number;
  activo: boolean;
}

const EMPTY_FORM: FormState = {
  nombre: '',
  nivel: 'primaria',
  orden: 1,
  activo: true,
};

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
  if (!NIVELES.includes(form.nivel)) errors.nivel = 'Nivel inválido.';
  if (!Number.isFinite(form.orden) || form.orden < 1) errors.orden = 'El orden debe ser mayor a 0.';
  return errors;
}

export function Grados() {
  const { items, loading, error, create, update, remove, submitting } = useCatalog(gradosService);
  const [editing, setEditing] = useState<Grado | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<Grado | null>(null);

  const isOpen = creating || editing !== null;

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setCreating(true);
  }

  function openEdit(row: Grado) {
    setCreating(false);
    setForm({
      nombre: row.nombre,
      nivel: row.nivel,
      orden: row.orden,
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

  const columns: DataTableColumn<Grado>[] = [
    {
      key: 'nombre',
      header: 'Grado',
      accessor: 'nombre',
      className: 'font-semibold text-neutral-900',
    },
    {
      key: 'nivel',
      header: 'Nivel',
      cell: (row) => <span className="capitalize">{row.nivel}</span>,
      accessor: 'nivel',
    },
    { key: 'orden', header: 'Orden', accessor: 'orden', align: 'right' },
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
            Grados
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Gestiona los grados académicos por nivel.</p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
          Nuevo grado
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
        searchPlaceholder="Buscar grado o nivel…"
        emptyMessage="No hay grados registrados."
        title="Listado de grados"
        subtitle={`${items.length} registro${items.length === 1 ? '' : 's'}`}
      />

      <Modal
        open={isOpen}
        onClose={submitting ? () => undefined : closeModal}
        title={editing ? 'Editar grado' : 'Nuevo grado'}
        description="Define el nombre, nivel y orden del grado."
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
            placeholder="1°"
            value={form.nombre}
            onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
            error={formErrors.nombre}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="grado-nivel"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
              >
                Nivel
              </label>
              <select
                id="grado-nivel"
                value={form.nivel}
                onChange={(e) => setForm((prev) => ({ ...prev, nivel: e.target.value as Nivel }))}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm capitalize text-neutral-900 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                {NIVELES.map((n) => (
                  <option key={n} value={n} className="capitalize">
                    {n}
                  </option>
                ))}
              </select>
              {formErrors.nivel ? (
                <p className="mt-1 text-xs font-medium text-red-600">{formErrors.nivel}</p>
              ) : null}
            </div>
            <Input
              label="Orden"
              name="orden"
              type="number"
              min={1}
              value={form.orden}
              onChange={(e) => setForm((prev) => ({ ...prev, orden: Number(e.target.value) || 0 }))}
              error={formErrors.orden}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => setForm((prev) => ({ ...prev, activo: e.target.checked }))}
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-400"
            />
            Grado activo
          </label>
        </form>
      </Modal>

      <ConfirmDialog
        open={toDelete !== null}
        title="Eliminar grado"
        message={`¿Eliminar el grado "${toDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={submitting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
