import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { HeartCrack, Mail, Lock, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-gray-400">
            Accede a tu cuenta del desamor
          </p>
        </div>

        <Card className="bg-black/60 border-red-900/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/40 border-red-900/30 text-white"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/40 border-red-900/30 text-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-950/50 border border-red-600/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-8 border-t border-red-900/30 pt-6">
            <p className="text-gray-400 text-sm mb-4 text-center">
              Cuentas de prueba:
            </p>
            <div className="space-y-3 text-sm">
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                <p className="text-red-400 font-bold mb-1">Administrador</p>
                <p className="text-gray-400">Email: admin@corazonroto.com</p>
                <p className="text-gray-400">Contraseña: admin123</p>
              </div>
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                <p className="text-red-400 font-bold mb-1">Cliente</p>
                <p className="text-gray-400">Email: cliente@demo.com</p>
                <p className="text-gray-400">Contraseña: cliente123</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-400 italic text-sm">
            "Para llorar con nosotros, primero debes identificarte..."
          </p>
        </div>
      </div>
    </div>
  );
}
