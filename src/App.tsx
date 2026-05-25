import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Alumnos } from './pages/Alumnos';
import { Students } from './pages/Students';
import { Grades } from './pages/Grades';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { CiclosEscolares } from './pages/catalogos/CiclosEscolares';
import { Grados } from './pages/catalogos/Grados';
import { Turnos } from './pages/catalogos/Turnos';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/estudiantes" element={<Students />} />
            <Route path="/calificaciones" element={<Grades />} />
            <Route path="/catalogos">
              <Route index element={<Navigate to="ciclos" replace />} />
              <Route path="ciclos" element={<CiclosEscolares />} />
              <Route path="turnos" element={<Turnos />} />
              <Route path="grados" element={<Grados />} />
            </Route>
            <Route path="/reportes" element={<Reports />} />
            <Route path="/ajustes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
