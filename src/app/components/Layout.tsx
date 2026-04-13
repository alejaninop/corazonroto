import { Outlet, Link, useLocation } from 'react-router';
import { HeartCrack, Home, UtensilsCrossed, Truck, Calendar, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function Layout() {
  const location = useLocation();
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-red-900/30 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3 group">
              <HeartCrack className="w-10 h-10 text-red-600 group-hover:text-red-500 transition-colors animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold text-red-600">Corazón Roto</h1>
                <p className="text-xs text-gray-400">Restaurante del Desamor</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/')
                    ? 'bg-red-900/50 text-red-400'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-900/20'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/menu"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/menu')
                    ? 'bg-red-900/50 text-red-400'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-900/20'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Menú</span>
              </Link>
              <Link
                to="/delivery"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/delivery')
                    ? 'bg-red-900/50 text-red-400'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-900/20'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span>Pedidos</span>
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/reservations"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/reservations')
                    ? 'bg-red-900/50 text-red-400'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-900/20'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Reservas</span>
              </Link>

              {/* Auth buttons */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive('/profile')
                        ? 'bg-red-900/50 text-red-400'
                        : 'text-gray-300 hover:text-red-400 hover:bg-red-900/20'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900/30"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <User className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile menu */}
            <nav className="md:hidden flex gap-2 items-center">
              <Link
                to="/"
                className={`p-2 rounded-lg ${
                  isActive('/') ? 'bg-red-900/50 text-red-400' : 'text-gray-300'
                }`}
              >
                <Home className="w-6 h-6" />
              </Link>
              <Link
                to="/menu"
                className={`p-2 rounded-lg ${
                  isActive('/menu') ? 'bg-red-900/50 text-red-400' : 'text-gray-300'
                }`}
              >
                <UtensilsCrossed className="w-6 h-6" />
              </Link>
              <Link
                to="/delivery"
                className={`p-2 rounded-lg relative ${
                  isActive('/delivery') ? 'bg-red-900/50 text-red-400' : 'text-gray-300'
                }`}
              >
                <Truck className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/reservations"
                className={`p-2 rounded-lg ${
                  isActive('/reservations') ? 'bg-red-900/50 text-red-400' : 'text-gray-300'
                }`}
              >
                <Calendar className="w-6 h-6" />
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className={`p-2 rounded-lg ${
                    isActive('/profile') ? 'bg-red-900/50 text-red-400' : 'text-gray-300'
                  }`}
                >
                  <User className="w-6 h-6" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-lg text-gray-300"
                >
                  <User className="w-6 h-6" />
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-red-900/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <HeartCrack className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-2">
            "El amor se va, pero el buen sabor queda..."
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 Corazón Roto. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}