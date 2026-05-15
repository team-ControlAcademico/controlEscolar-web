import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Alumnos } from './pages/Alumnos';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alumnos" element={<Alumnos />} />
      </Route>
    </Routes>
  );
}

export default App;
