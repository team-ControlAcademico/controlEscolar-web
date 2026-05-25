import { ArrowRight, BarChart3, FileBarChart, FileText, PieChart } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

interface ReportCardData {
  title: string;
  description: string;
  icon: typeof FileText;
  tone: 'primary' | 'secondary' | 'amber';
}

const REPORTS: ReportCardData[] = [
  {
    title: 'Boletas de calificaciones',
    description: 'Genera boletas individuales o por grupo para entrega a tutores.',
    icon: FileText,
    tone: 'primary',
  },
  {
    title: 'Reporte de asistencia',
    description: 'Asistencia diaria, semanal y mensual con porcentajes y observaciones.',
    icon: BarChart3,
    tone: 'secondary',
  },
  {
    title: 'Promedio histórico',
    description: 'Evolución del promedio por alumno y por grupo a lo largo del ciclo escolar.',
    icon: PieChart,
    tone: 'amber',
  },
  {
    title: 'Resumen institucional',
    description: 'Vista ejecutiva con indicadores académicos clave de toda la institución.',
    icon: FileBarChart,
    tone: 'primary',
  },
];

const toneStyles: Record<ReportCardData['tone'], { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-100', text: 'text-primary-700' },
  secondary: { bg: 'bg-secondary-100', text: 'text-secondary-700' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

export function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem]">
          Reportes
        </h1>
        <p className="mt-2 text-base text-neutral-500">
          Genera informes académicos listos para imprimir o compartir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {REPORTS.map((r) => {
          const Icon = r.icon;
          const palette = toneStyles[r.tone];
          return (
            <Card key={r.title} hoverable className="rounded-2xl">
              <CardBody className="!p-7 lg:!p-8">
                <div className="flex items-start gap-5">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${palette.bg} ${palette.text}`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-semibold text-neutral-900">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">{r.description}</p>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-800"
                    >
                      Generar
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
