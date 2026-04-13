import { useState } from 'react';
import { HeartCrack, ShoppingBag, Calendar, Settings, TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Mock data for admin
const mockOrders = [
  { id: '001234', customer: 'María García', total: 156000, status: 'En camino', date: '2026-04-01 14:30' },
  { id: '001235', customer: 'Juan Pérez', total: 89000, status: 'Preparando', date: '2026-04-01 14:45' },
  { id: '001236', customer: 'Ana López', total: 234000, status: 'Entregado', date: '2026-04-01 13:20' },
  { id: '001237', customer: 'Carlos Ruiz', total: 178000, status: 'Pendiente', date: '2026-04-01 15:00' },
];

const mockReservations = [
  { id: 'R001', name: 'Laura Martínez', guests: 4, date: '2026-04-02', time: '20:00', phone: '+57 300 111 2222' },
  { id: 'R002', name: 'Pedro Sánchez', guests: 2, date: '2026-04-02', time: '21:00', phone: '+57 310 333 4444' },
  { id: 'R003', name: 'Sofia Torres', guests: 6, date: '2026-04-03', time: '19:30', phone: '+57 320 555 6666' },
];

export function AdminProfile() {
  const [activeTab, setActiveTab] = useState('overview');

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
        return 'bg-green-900/30 text-green-400 border-green-600/30';
      case 'En camino':
        return 'bg-blue-900/30 text-blue-400 border-blue-600/30';
      case 'Preparando':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-600/30';
      default:
        return 'bg-red-900/30 text-red-400 border-red-600/30';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-400">
            Gestiona tu restaurante del desamor
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/40 border border-red-900/30 p-1 w-full md:w-auto grid grid-cols-2 md:flex gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Reservas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-10 h-10 text-red-600" />
                  <span className="text-xs text-gray-400 bg-green-900/30 px-2 py-1 rounded">+12%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Ventas de Hoy</p>
                <p className="text-2xl font-bold text-red-500">{formatPrice(657000)}</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="w-10 h-10 text-red-600" />
                  <span className="text-xs text-gray-400 bg-blue-900/30 px-2 py-1 rounded">4 activos</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Pedidos Totales</p>
                <p className="text-2xl font-bold text-red-500">24</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-10 h-10 text-red-600" />
                  <span className="text-xs text-gray-400 bg-yellow-900/30 px-2 py-1 rounded">3 hoy</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Reservas</p>
                <p className="text-2xl font-bold text-red-500">12</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 text-red-600" />
                  <span className="text-xs text-gray-400 bg-purple-900/30 px-2 py-1 rounded">+5 nuevos</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Clientes</p>
                <p className="text-2xl font-bold text-red-500">156</p>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-900/50 p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Pedidos Recientes
                </h3>
                <div className="space-y-3">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">#{order.id}</p>
                          <p className="text-gray-400 text-sm">{order.customer}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{order.date}</span>
                        <span className="text-red-500 font-bold">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-black/60 border-red-900/50 p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Platos Más Vendidos
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium">Corazón Roto al Carbón</p>
                      <div className="w-full bg-red-950/30 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <span className="text-red-500 font-bold ml-4">34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium">Pasta Adiós</p>
                      <div className="w-full bg-red-950/30 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <span className="text-red-500 font-bold ml-4">26</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium">Tarta del Adiós</p>
                      <div className="w-full bg-red-950/30 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <span className="text-red-500 font-bold ml-4">20</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Todos los Pedidos
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-950/30 border-b border-red-900/30">
                    <tr>
                      <th className="text-left text-gray-300 p-3">ID</th>
                      <th className="text-left text-gray-300 p-3">Cliente</th>
                      <th className="text-left text-gray-300 p-3">Fecha</th>
                      <th className="text-right text-gray-300 p-3">Total</th>
                      <th className="text-center text-gray-300 p-3">Estado</th>
                      <th className="text-center text-gray-300 p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-red-900/20 hover:bg-red-950/20">
                        <td className="text-white p-3">#{order.id}</td>
                        <td className="text-gray-300 p-3">{order.customer}</td>
                        <td className="text-gray-400 p-3 text-sm">{order.date}</td>
                        <td className="text-right text-red-500 font-bold p-3">{formatPrice(order.total)}</td>
                        <td className="text-center p-3">
                          <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30">
                            Ver Detalles
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Reservas Programadas
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-red-400 font-bold text-sm mb-1">#{reservation.id}</p>
                        <p className="text-white font-medium text-lg">{reservation.name}</p>
                      </div>
                      <Users className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{reservation.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-red-500">⏰</span>
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{reservation.guests} personas</span>
                      </div>
                      <div className="text-gray-400">
                        📞 {reservation.phone}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-900/30">
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Confirmar Mesa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Configuración
              </h3>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4">Información del Restaurante</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><span className="text-gray-400">Nombre:</span> Corazón Roto</p>
                    <p><span className="text-gray-400">Dirección:</span> Calle del Olvido #404, Ciudad del Desamor</p>
                    <p><span className="text-gray-400">Teléfono:</span> +57 666 ROTO 123</p>
                    <p><span className="text-gray-400">Email:</span> info@corazonroto.com</p>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4">Horarios</h4>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>Lunes a Viernes: 12:00 - 23:00</p>
                    <p>Sábado y Domingo: 11:00 - 00:00</p>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4">Estadísticas Generales</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <p>Total de clientes registrados: <span className="text-red-500 font-bold">156</span></p>
                    <p>Total de pedidos: <span className="text-red-500 font-bold">1,234</span></p>
                    <p>Reservas completadas: <span className="text-red-500 font-bold">345</span></p>
                    <p>Ventas totales: <span className="text-red-500 font-bold">{formatPrice(45670000)}</span></p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
