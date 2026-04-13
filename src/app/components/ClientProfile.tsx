import { useState } from 'react';
import { HeartCrack, User, ShoppingBag, Calendar, Heart, Settings, Mail, Phone, MapPin, Award, Star, Gift, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

// Mock data for client
const mockClientOrders = [
  { 
    id: '001156', 
    date: '2026-03-28 19:30', 
    items: ['Corazón Roto al Carbón', 'Sangría del Olvido'],
    total: 144000, 
    status: 'Entregado' 
  },
  { 
    id: '001098', 
    date: '2026-03-22 20:15', 
    items: ['Pasta Adiós', 'Tarta del Adiós', 'Café del Insomnio'],
    total: 132000, 
    status: 'Entregado' 
  },
  { 
    id: '001034', 
    date: '2026-03-15 18:45', 
    items: ['Salmón del Olvido', 'Mojito de la Libertad'],
    total: 140000, 
    status: 'Entregado' 
  },
];

const mockClientReservations = [
  { 
    id: 'R045', 
    date: '2026-04-05', 
    time: '20:30', 
    guests: 2,
    status: 'Confirmada' 
  },
  { 
    id: 'R032', 
    date: '2026-03-25', 
    time: '21:00', 
    guests: 4,
    status: 'Completada' 
  },
];

const mockFavorites = [
  { id: '4', name: 'Corazón Roto al Carbón', category: 'Principales' },
  { id: '5', name: 'Pasta Adiós', category: 'Principales' },
  { id: '9', name: 'Tarta del Adiós', category: 'Postres' },
];

const REWARDS = [
  {
    id: 'discount_10',
    name: '10% de Descuento',
    description: 'Aplica un 10% de descuento en tu próximo pedido',
    pointsCost: 100,
    type: 'discount' as const,
    value: 10,
    icon: '🎫'
  },
  {
    id: 'free_dessert',
    name: 'Postre Gratis',
    description: 'Elige cualquier postre del menú completamente gratis',
    pointsCost: 250,
    type: 'free_dessert' as const,
    value: 0,
    icon: '🍰'
  },
  {
    id: 'free_main',
    name: 'Plato Principal Gratis',
    description: 'Elige cualquier plato principal del menú gratis',
    pointsCost: 500,
    type: 'free_main' as const,
    value: 0,
    icon: '🍽️'
  }
];

export function ClientProfile() {
  const { user, getUserPoints, redeemPoints } = useAuth();
  const { applyReward } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const userPoints = getUserPoints();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado':
      case 'Completada':
      case 'Confirmada':
        return 'bg-green-900/30 text-green-400 border-green-600/30';
      case 'En camino':
        return 'bg-blue-900/30 text-blue-400 border-blue-600/30';
      case 'Preparando':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-600/30';
      default:
        return 'bg-red-900/30 text-red-400 border-red-600/30';
    }
  };

  const totalSpent = mockClientOrders.reduce((sum, order) => sum + order.total, 0);

  const handleRedeemReward = (reward: typeof REWARDS[0]) => {
    if (userPoints < reward.pointsCost) {
      toast.error('Puntos insuficientes', {
        description: `Necesitas ${reward.pointsCost} puntos para canjear esta recompensa.`
      });
      return;
    }

    const success = redeemPoints(reward.pointsCost);
    if (success) {
      applyReward({
        type: reward.type,
        value: reward.value,
        description: reward.description
      });
      toast.success('¡Recompensa canjeada!', {
        description: `${reward.name} aplicada. Úsala en tu próximo pedido.`
      });
      setShowRedeemDialog(false);
    } else {
      toast.error('Error al canjear', {
        description: 'Hubo un problema al canjear tus puntos. Intenta de nuevo.'
      });
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-red-500 mb-2">
                  {user?.name}
                </h1>
                <p className="text-gray-400 mb-4">Miembro desde Marzo 2026</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-red-600" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-red-600" />
                    {user?.phone}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-2 animate-pulse" />
                <p className="text-gray-400 text-sm">Cliente del Desamor</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/40 border border-red-900/30 p-1 w-full md:w-auto grid grid-cols-2 md:flex gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Mis Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Mis Reservas</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Favoritos</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <ShoppingBag className="w-10 h-10 text-red-600 mb-4" />
                <p className="text-gray-400 text-sm mb-1">Total de Pedidos</p>
                <p className="text-3xl font-bold text-red-500">{mockClientOrders.length}</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <Calendar className="w-10 h-10 text-red-600 mb-4" />
                <p className="text-gray-400 text-sm mb-1">Reservas</p>
                <p className="text-3xl font-bold text-red-500">{mockClientReservations.length}</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <HeartCrack className="w-10 h-10 text-red-600 mb-4" />
                <p className="text-gray-400 text-sm mb-1">Total Gastado</p>
                <p className="text-2xl font-bold text-red-500">{formatPrice(totalSpent)}</p>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-950/50 to-red-950/50 border-yellow-600/50 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-600/10 rounded-full -mr-10 -mt-10" />
                <Award className="w-10 h-10 text-yellow-500 mb-4 relative z-10" />
                <p className="text-gray-400 text-sm mb-1 relative z-10">Puntos de Lealtad</p>
                <p className="text-3xl font-bold text-yellow-500 relative z-10">{userPoints}</p>
                <div className="flex items-center gap-1 mt-2 relative z-10">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <p className="text-xs text-yellow-400">1 punto = $10,000 COP</p>
                </div>
              </Card>
            </div>

            {/* Loyalty Program Info */}
            <Card className="bg-gradient-to-r from-yellow-950/30 to-red-950/30 border-yellow-600/30 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center border-2 border-yellow-600/50">
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">Programa de Puntos del Desamor</h3>
                  <p className="text-gray-300 mb-3">
                    Acumula 1 punto por cada $10,000 COP que gastes. Canjea tus puntos por descuentos especiales y platos exclusivos.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-300">100 puntos = 10% descuento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-300">250 puntos = Postre gratis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-300">500 puntos = Plato principal gratis</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setShowRedeemDialog(true)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Canjear Puntos
                </Button>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="bg-black/60 border-red-900/50 p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Pedidos Recientes
                </h3>
                <div className="space-y-4">
                  {mockClientOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-white font-medium">Pedido #{order.id}</p>
                          <p className="text-gray-400 text-sm">{order.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mb-2">
                        <p className="text-gray-400 text-sm mb-1">Artículos:</p>
                        <ul className="text-sm text-gray-300">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-red-600">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-red-900/30">
                        <span className="text-gray-400 text-sm">Total:</span>
                        <span className="text-red-500 font-bold">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Favorites */}
              <Card className="bg-black/60 border-red-900/50 p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Mis Favoritos
                </h3>
                <div className="space-y-3">
                  {mockFavorites.map((item) => (
                    <div key={item.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <HeartCrack className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-gray-400 text-sm">{item.category}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Pedir
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Historial de Pedidos
              </h3>
              <div className="space-y-4">
                {mockClientOrders.map((order) => (
                  <div key={order.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <p className="text-xl font-bold text-white mb-1">Pedido #{order.id}</p>
                        <p className="text-gray-400 text-sm">{order.date}</p>
                      </div>
                      <span className={`text-sm px-4 py-2 rounded border mt-2 md:mt-0 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Artículos pedidos:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <HeartCrack className="w-4 h-4 text-red-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-red-900/30">
                      <span className="text-gray-400">Total pagado:</span>
                      <span className="text-2xl font-bold text-red-500">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Mis Reservas
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockClientReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-red-400 font-bold text-sm mb-1">#{reservation.id}</p>
                        <p className="text-xl font-bold text-white">{reservation.date}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-red-600">⏰</span>
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <User className="w-4 h-4 text-red-600" />
                        <span>{reservation.guests} personas</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>Calle del Olvido #404</span>
                      </div>
                    </div>
                    {reservation.status === 'Confirmada' && (
                      <div className="mt-4 pt-4 border-t border-red-900/30">
                        <Button size="sm" variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-900/30">
                          Cancelar Reserva
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Platos Favoritos
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFavorites.map((item) => (
                  <div key={item.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <HeartCrack className="w-10 h-10 text-red-600" />
                      <span className="text-xs text-red-400 bg-red-900/30 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-4">{item.name}</h4>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Agregar al Carrito
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-400 italic mb-4">
                  "Tus platos favoritos del desamor, siempre a tu disposición..."
                </p>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30">
                  Explorar Más Platos
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Redeem Points Dialog */}
        <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
          <DialogContent className="bg-black/95 border-yellow-600/50 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Canjear Puntos de Lealtad
              </DialogTitle>
            </DialogHeader>

            <div className="mb-4 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Tus puntos disponibles:</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-500">{userPoints}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {REWARDS.map((reward) => {
                const canAfford = userPoints >= reward.pointsCost;
                return (
                  <div
                    key={reward.id}
                    className={`bg-gradient-to-br from-red-950/30 to-black/50 border rounded-lg p-6 transition-all ${
                      canAfford
                        ? 'border-yellow-600/50 hover:border-yellow-500'
                        : 'border-red-900/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{reward.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-yellow-500 mb-2">
                            {reward.name}
                          </h3>
                          <p className="text-gray-300 text-sm mb-3">
                            {reward.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="text-yellow-400 font-medium">
                              {reward.pointsCost} puntos
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRedeemReward(reward)}
                        disabled={!canAfford}
                        className={`${
                          canAfford
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-black'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Canjear' : 'Insuficiente'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-red-950/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm text-center italic">
                <HeartCrack className="w-4 h-4 inline mr-2" />
                Las recompensas se aplicarán automáticamente en tu próximo pedido
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
