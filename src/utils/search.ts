export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

export function matchesQuery(haystack: string, query: string): boolean {
  if (!query) return true;
  return normalizeText(haystack).includes(normalizeText(query));
}

export function filterByQuery<T>(
  items: T[],
  query: string,
  fields: Array<keyof T | ((item: T) => string)>,
): T[] {
  const q = normalizeText(query);
  if (!q) return items;
  return items.filter((item) =>
    fields.some((field) => {
      const raw = typeof field === 'function' ? field(item) : item[field];
      if (raw == null) return false;
      return normalizeText(String(raw)).includes(q);
    }),
  );
}
