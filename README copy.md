1. Layout base (src/components/layout/, src/routes/)

- Layout.tsx wraps protected routes via React Router <Outlet/>.
- Sidebar.tsx rewritten to consume NAV_SECTIONS from src/config/nav.ts, filtered by user.role (admin / coordinador / docente / invitado).
  Supports nested sections (Catálogos) and an in‑menu search.
- Topbar.tsx reads user + logout from auth context.
- AuthProvider (src/context/AuthContext.tsx) + useAuth hook (src/hooks/useAuth.ts) + ProtectedRoute (src/routes/ProtectedRoute.tsx) —
  protects routes and filters by role array.
- AppRouter.tsx declares the route tree; default demo user is admin (override via login).

2. Generic DataTable (src/components/ui/DataTable.tsx)

- Columns via DataTableColumn<T>[] props (header, accessor, cell renderer, align, search opt‑out, etc.).
- Built‑in search (uses normalized accent‑insensitive match), built‑in pagination + page‑size selector, loading/empty states, optional
  row click.
- Local mode by default; opt‑in server mode (serverSide, total, page, query, onPageChange, onPageSizeChange, onQueryChange) for backend
  pagination.
- Reused by all three catálogos.

3. Catálogos CRUD

- src/pages/catalogos/CiclosEscolares.tsx, Turnos.tsx, Grados.tsx — list (DataTable), create/edit (Modal + form + validation), delete
  (ConfirmDialog), error banner.
- Forms validate required fields and date/time ordering.
- Services in src/services/catalogs.ts use a generic API factory (createCatalogService) talking to /ciclos-escolares, /turnos, /grados. A
  mock store in src/services/mockStore.ts activates when VITE_API_URL is empty or VITE_USE_MOCK=true, so the views are functional
  immediately and switch to real API by setting env vars.
- useCatalog hook centralizes loading/error/CRUD state.

4. Global frontend config

- src/config/env.ts — env vars
- src/config/api.ts — axios instance with auth + 401 + error normalization interceptors, token helpers
- src/utils/errors.ts — AppError, normalizeError, getErrorMessage, getFieldErrors
- src/utils/response.ts — unwrap, unwrapList, buildMeta
- src/utils/pagination.ts — paginate, clampPage, page‑size constants
- src/utils/search.ts — normalizeText, filterByQuery (accent‑insensitive)
- src/hooks/useDebounce.ts, useTableState.ts — reusable hooks
- src/types/api.ts / auth.ts / catalogs.ts — shared types
- Reusable UI: Modal, ConfirmDialog, DataTable (alongside existing Button/Input/Card/Badge/Avatar)

Verified: npx tsc --noEmit, npm run lint, npm run format, and npm run build all pass clean.

Routes available: /, /alumnos, /calificaciones, /catalogos/{ciclos|turnos|grados}, /reportes, /ajustes. To talk to the real backend, set
VITE_API_URL=https://your-api.example.com/api in .env.local (mock store will turn off automatically).
