import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <HeartCrack className="w-24 h-24 text-red-600 mx-auto mb-6 animate-pulse" />
        <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
          Página No Encontrada
        </h2>
        <p className="text-xl text-gray-400 mb-8 italic">
          "Como tu ex... esta página ya no existe"
        </p>
        <Link to="/">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
