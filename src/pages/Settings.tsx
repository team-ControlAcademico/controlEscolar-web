import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem]">
          Ajustes
        </h1>
        <p className="mt-2 text-base text-neutral-500">
          Configura tu perfil docente y las preferencias del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <Card>
          <CardHeader title="Perfil" subtitle="Información visible para tus alumnos y colegas" />
          <CardBody className="space-y-4">
            <Input name="nombre" label="Nombre completo" defaultValue="Jhonatan Kebab" />
            <Input
              name="correo"
              label="Correo institucional"
              type="email"
              defaultValue="jhonatan.kebab@escuela.mx"
            />
            <Input name="materia" label="Materia principal" defaultValue="Matemáticas" />
            <div className="pt-2">
              <Button variant="primary">Guardar cambios</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Preferencias" subtitle="Personaliza la experiencia del sistema" />
          <CardBody className="space-y-4">
            <PreferenceRow
              title="Notificaciones por correo"
              description="Recibe avisos de calificaciones pendientes y mensajes de tutores."
              defaultChecked
            />
            <PreferenceRow
              title="Modo compacto"
              description="Reduce el espaciado en las tablas para ver más información."
            />
            <PreferenceRow
              title="Mostrar promedio en boletas"
              description="Incluye el promedio general en boletas exportadas."
              defaultChecked
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

interface PreferenceRowProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

function PreferenceRow({ title, description, defaultChecked }: PreferenceRowProps) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 transition-colors hover:bg-neutral-50">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-neutral-300 text-primary-600 focus:ring-primary-300"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
      </div>
    </label>
  );
}
