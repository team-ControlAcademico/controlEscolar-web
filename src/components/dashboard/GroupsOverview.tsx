import { Card, CardBody, CardHeader } from '../ui/Card';

interface GroupRow {
  name: string;
  grade: string;
  count: number;
  avg: number;
}

const GROUPS: GroupRow[] = [
  { name: '5° A', grade: 'Primaria', count: 32, avg: 8.7 },
  { name: '5° B', grade: 'Primaria', count: 30, avg: 9.1 },
  { name: '4° C', grade: 'Primaria', count: 28, avg: 8.4 },
  { name: '6° B', grade: 'Primaria', count: 29, avg: 8.9 },
  { name: '3° A', grade: 'Primaria', count: 26, avg: 8.2 },
];

function avgColor(avg: number): string {
  if (avg >= 9) return 'text-emerald-600';
  if (avg >= 8) return 'text-primary-600';
  if (avg >= 7) return 'text-amber-600';
  return 'text-red-600';
}

export function GroupsOverview() {
  return (
    <Card>
      <CardHeader title="Grupos por desempeño" subtitle="Promedio académico del periodo actual" />
      <CardBody className="!p-0">
        <ul className="divide-y divide-neutral-100">
          {GROUPS.map((g) => {
            const pct = Math.round((g.avg / 10) * 100);
            return (
              <li key={g.name} className="px-6 py-4 transition-colors hover:bg-neutral-50">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-sm font-semibold text-neutral-900">{g.name}</p>
                    <p className="text-xs text-neutral-500">
                      {g.grade} · {g.count} alumnos
                    </p>
                  </div>
                  <p className={`font-heading text-lg font-bold ${avgColor(g.avg)}`}>
                    {g.avg.toFixed(1)}
                  </p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
