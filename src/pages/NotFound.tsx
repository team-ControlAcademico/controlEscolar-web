import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-heading text-7xl font-bold text-primary-500">404</p>
      <h1 className="mt-3 font-heading text-2xl font-bold text-neutral-900">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-sm text-neutral-500">
        La ruta que buscas no existe o ha sido movida. Vuelve al panel principal para continuar.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
          Volver al inicio
        </Button>
      </Link>
    </div>
  );
}
