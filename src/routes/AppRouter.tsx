import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { AuthProvider } from '../context/AuthContext';
import { Dashboard } from '../pages/Dashboard';
import { Grades } from '../pages/Grades';
import { NotFound } from '../pages/NotFound';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';
import { Students } from '../pages/Students';
import { CiclosEscolares } from '../pages/catalogos/CiclosEscolares';
import { Grados } from '../pages/catalogos/Grados';
import { Turnos } from '../pages/catalogos/Turnos';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="alumnos"
              element={
                <ProtectedRoute roles={['admin', 'coordinador', 'docente']}>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="calificaciones"
              element={
                <ProtectedRoute roles={['admin', 'coordinador', 'docente']}>
                  <Grades />
                </ProtectedRoute>
              }
            />
            <Route path="catalogos">
              <Route index element={<Navigate to="ciclos" replace />} />
              <Route
                path="ciclos"
                element={
                  <ProtectedRoute roles={['admin', 'coordinador']}>
                    <CiclosEscolares />
                  </ProtectedRoute>
                }
              />
              <Route
                path="turnos"
                element={
                  <ProtectedRoute roles={['admin', 'coordinador']}>
                    <Turnos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="grados"
                element={
                  <ProtectedRoute roles={['admin', 'coordinador']}>
                    <Grados />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="reportes"
              element={
                <ProtectedRoute roles={['admin', 'coordinador']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="ajustes"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
