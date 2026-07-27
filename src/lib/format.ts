/** Formatea un monto (string o number) como moneda MXN. */
export function formatMoney(value: string | number | null | undefined): string {
  const n = Number(value ?? 0);
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

/** Formatea una fecha ISO como fecha corta local. */
export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "numeric" });
}
