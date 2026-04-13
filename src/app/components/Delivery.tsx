import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { HeartCrack, Trash2, Plus, Minus, ShoppingCart, ArrowRight, Award, Gift, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

export function Delivery() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart, appliedReward, clearReward, getDiscountedTotal } = useCart();
  const { user, addPoints } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const deliveryFee = 24000;
  const subtotal = getTotal();
  const discountedSubtotal = getDiscountedTotal();
  const total = discountedSubtotal + deliveryFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate and add points for client users (1 point per 10,000 COP)
    if (user && user.role === 'client') {
      const pointsToAdd = Math.floor(total / 10000);
      addPoints(pointsToAdd);
      setEarnedPoints(pointsToAdd);
    }

    setShowInvoice(true);
  };

  const handleNewOrder = () => {
    setShowInvoice(false);
    setShowCheckout(false);
    setEarnedPoints(0);
    clearCart(); // This also clears the reward
    setOrderDetails({ name: '', phone: '', address: '', notes: '' });
  };

  if (showInvoice) {
    const invoiceNumber = `CRZR${String(Math.floor(Math.random() * 1000000)).padStart(8, '0')}`;
    const orderDate = new Date().toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Generar CUFE simulado (en producción esto lo genera la DIAN)
    const cufe = `${invoiceNumber}${new Date().getTime()}`.split('').map(c =>
      Math.random().toString(36).substring(2, 3)
    ).join('').substring(0, 96).toUpperCase().padEnd(96, 'X');

    // Calcular impuestos
    const ivaRate = 0.19; // IVA del 19% en Colombia
    const subtotalBeforeTax = subtotal / (1 + ivaRate);
    const ivaAmount = subtotal - subtotalBeforeTax;

    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-black/60 border border-red-900/50 rounded-lg p-8 md:p-12">
            {/* Invoice Header */}
            <div className="text-center mb-8 border-b border-red-900/30 pb-8">
              <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-2">
                FACTURA ELECTRÓNICA DE VENTA
              </h1>
              <div className="mt-4 space-y-1">
                <h2 className="text-xl font-bold text-white">CORAZÓN ROTO S.A.S.</h2>
                <p className="text-gray-400 text-sm">NIT: 900.123.456-7</p>
                <p className="text-gray-500 text-sm">Régimen Común - IVA Responsable</p>
                <p className="text-gray-500 text-sm">
                  Calle del Olvido #404, Bogotá D.C., Colombia
                </p>
                <p className="text-gray-500 text-sm">
                  Tel: +57 (601) 123-4567 | contacto@corazonroto.com.co
                </p>
              </div>
              <div className="mt-4 bg-red-950/30 border border-red-900/50 rounded px-4 py-2 inline-block">
                <p className="text-gray-400 text-xs">Resolución DIAN de Facturación Electrónica</p>
                <p className="text-gray-300 text-sm font-mono">Nº 18764039876543 del 15/01/2024</p>
                <p className="text-gray-400 text-xs">Prefijo: CRZR | Rango: 00000001 al 99999999</p>
                <p className="text-gray-400 text-xs">Vigencia: 15/01/2024 al 15/01/2026</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                <h3 className="text-red-400 font-bold mb-3 uppercase">Datos de la Factura</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    Número de Factura: <span className="text-white font-mono">{invoiceNumber}</span>
                  </p>
                  <p className="text-gray-300">
                    Fecha de Emisión: <span className="text-white">{orderDate}</span>
                  </p>
                  <p className="text-gray-300">
                    Medio de Pago: <span className="text-white">Efectivo/Contraentrega</span>
                  </p>
                  <p className="text-gray-300">
                    Moneda: <span className="text-white">COP - Peso Colombiano</span>
                  </p>
                </div>
              </div>
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                <h3 className="text-red-400 font-bold mb-3 uppercase">Datos del Adquiriente</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    Nombre/Razón Social: <span className="text-white">{orderDetails.name}</span>
                  </p>
                  <p className="text-gray-300">
                    Tipo de Documento: <span className="text-white">CC - Cédula de Ciudadanía</span>
                  </p>
                  <p className="text-gray-300">
                    Teléfono: <span className="text-white">{orderDetails.phone}</span>
                  </p>
                  <p className="text-gray-300">
                    Dirección de Entrega: <span className="text-white">{orderDetails.address}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-red-400 font-bold mb-4 uppercase">Descripción de Bienes y/o Servicios</h3>
              <div className="bg-black/40 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-red-950/30 border-b border-red-900/30">
                    <tr>
                      <th className="text-left text-gray-300 p-3">Ítem</th>
                      <th className="text-left text-gray-300 p-3">Descripción</th>
                      <th className="text-center text-gray-300 p-3">Cant.</th>
                      <th className="text-right text-gray-300 p-3">Valor Unitario</th>
                      <th className="text-right text-gray-300 p-3">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id} className="border-b border-red-900/20">
                        <td className="text-gray-400 p-3">{index + 1}</td>
                        <td className="text-gray-300 p-3">{item.name}</td>
                        <td className="text-center text-gray-300 p-3">{item.quantity}</td>
                        <td className="text-right text-gray-300 p-3">{formatPrice(item.price)}</td>
                        <td className="text-right text-white p-3">{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-red-900/20">
                      <td className="text-gray-400 p-3">{cart.length + 1}</td>
                      <td className="text-gray-300 p-3">Servicio de Domicilio</td>
                      <td className="text-center text-gray-300 p-3">1</td>
                      <td className="text-right text-gray-300 p-3">{formatPrice(deliveryFee)}</td>
                      <td className="text-right text-white p-3">{formatPrice(deliveryFee)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                <h3 className="text-red-400 font-bold mb-4 uppercase">Resumen de Valores</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Base Imponible (antes de IVA):</span>
                    <span className="text-white">{formatPrice(subtotalBeforeTax + deliveryFee / 1.19)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm border-t border-red-900/20 pt-2">
                    <span>IVA (19%):</span>
                    <span className="text-white">{formatPrice(ivaAmount + (deliveryFee - deliveryFee / 1.19))}</span>
                  </div>
                  {appliedReward && appliedReward.type === 'discount' && (
                    <div className="flex justify-between text-yellow-500 text-sm border-t border-red-900/20 pt-2">
                      <span className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Descuento ({appliedReward.value}%):
                      </span>
                      <span>-{formatPrice(subtotal * (appliedReward.value / 100))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300 text-sm border-t border-red-900/20 pt-2">
                    <span>Subtotal Productos:</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Domicilio:</span>
                    <span className="text-white">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-red-500 border-t border-red-900/30 pt-4 mt-2">
                    <span>TOTAL A PAGAR:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-gray-400 text-xs italic mt-2">
                    Son: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total).replace(/\$/g, '')} PESOS COLOMBIANOS M/CTE
                  </p>
                </div>
              </div>

              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-red-400 font-bold mb-4 uppercase text-center">Código CUFE y QR</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="w-32 h-32 bg-black flex items-center justify-center">
                    <div className="text-white text-xs text-center font-mono break-all p-2">
                      QR
                      <br />
                      DIAN
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs text-center mb-2">CUFE (Código Único de Factura Electrónica):</p>
                <p className="text-gray-300 text-xs font-mono break-all text-center bg-black/40 p-3 rounded">
                  {cufe}
                </p>
              </div>
            </div>

            {/* Notes */}
            {orderDetails.notes && (
              <div className="mb-8 bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm font-bold mb-2">Notas del pedido:</p>
                <p className="text-gray-300">{orderDetails.notes}</p>
              </div>
            )}

            {/* Points Earned */}
            {user && user.role === 'client' && earnedPoints > 0 && (
              <div className="mb-8 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-6">
                <div className="flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div className="text-center">
                    <p className="text-yellow-500 font-bold text-lg">
                      ¡Has ganado {earnedPoints} {earnedPoints === 1 ? 'punto' : 'puntos'} de lealtad!
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Acumula puntos y canjéalos por descuentos y platos gratis
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Message */}
            <div className="border-t border-red-900/30 pt-6 space-y-4">
              <div className="bg-yellow-950/20 border border-yellow-600/30 rounded-lg p-4">
                <p className="text-gray-300 text-xs text-center">
                  <strong className="text-yellow-500">NOTA IMPORTANTE:</strong> Esta factura electrónica es un documento equivalente
                  a la factura tradicional y tiene plena validez para efectos tributarios según la normatividad vigente
                  (Art. 616-1 del E.T. y Resolución DIAN 000165 de 2023). Para consultar y validar esta factura ingrese a
                  www.corazonroto.com.co/validar-factura o escanee el código QR.
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-2">
                  ¡Gracias por tu pedido! Tu comida del despecho llegará en 30-45 minutos.
                </p>
                <p className="text-gray-500 text-sm italic">
                  "El amor se fue, pero la buena comida llegó a tiempo..."
                </p>
                <HeartCrack className="w-8 h-8 text-red-600 mx-auto mt-4 opacity-50" />
              </div>

              <div className="text-center text-gray-500 text-xs">
                <p>Factura generada electrónicamente por el sistema de facturación de Corazón Roto S.A.S.</p>
                <p>Software autorizado por la DIAN - Proveedor Tecnológico: Corazón Roto Tech S.A.S.</p>
                <p className="mt-2">Página {1} de {1}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                onClick={handleNewOrder}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Nuevo Pedido
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-900/30"
              >
                Imprimir Factura
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
              Finalizar Pedido
            </h1>
            <p className="text-gray-400">
              Completa tus datos para recibir tu pedido del despecho
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h2 className="text-xl font-bold text-red-400 mb-6">
                Datos de Entrega
              </h2>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="+34 666 123 456"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300">
                    Dirección de entrega *
                  </Label>
                  <Textarea
                    id="address"
                    required
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="Calle, número, piso, ciudad..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-300">
                    Notas adicionales
                  </Label>
                  <Textarea
                    id="notes"
                    value={orderDetails.notes}
                    onChange={(e) => setOrderDetails({ ...orderDetails, notes: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="Instrucciones especiales, alergias, etc."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 border-red-900/30 text-gray-300 hover:bg-red-950/30"
                  >
                    Volver al carrito
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Confirmar Pedido
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>

            {/* Order Summary */}
            <Card className="bg-black/60 border-red-900/50 p-6">
              <h2 className="text-xl font-bold text-red-400 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-300 border-b border-red-900/20 pb-3">
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-white">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-red-900/30 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedReward && appliedReward.type === 'discount' && (
                  <div className="flex justify-between text-yellow-500">
                    <span className="flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Descuento ({appliedReward.value}%):
                    </span>
                    <span>-{formatPrice(subtotal * (appliedReward.value / 100))}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Envío:</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-red-500 pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {appliedReward && (
                <div className="mt-4 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-yellow-500 font-medium text-sm">Recompensa aplicada</p>
                        <p className="text-gray-400 text-xs">{appliedReward.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={clearReward}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {user && user.role === 'client' && (
                <div className="mt-4 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-500 font-medium text-sm">Ganarás con este pedido:</span>
                    </div>
                    <span className="text-yellow-500 font-bold text-lg">
                      +{Math.floor(total / 10000)} {Math.floor(total / 10000) === 1 ? 'punto' : 'puntos'}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">
                  <HeartCrack className="w-4 h-4 inline mr-2" />
                  Tiempo estimado de entrega: 30-45 minutos
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
            Pedidos a Domicilio
          </h1>
          <p className="text-gray-400">
            Tu comida del despecho, directo a tu puerta
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-20 h-20 text-red-600 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              Tu carrito está vacío... como tu corazón
            </h2>
            <p className="text-gray-400 mb-8">
              Añade algunos platos del menú para empezar tu pedido
            </p>
            <Button
              onClick={() => window.location.href = '/menu'}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ver Menú
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-black/60 border-red-900/50 p-6">
                  <div className="flex items-start gap-4">
                    <HeartCrack className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-400 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-red-900/30">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-red-400 hover:bg-red-950/30 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-red-400 hover:bg-red-950/30 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xl font-bold text-red-500">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-black/60 border-red-900/50 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-red-400 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {appliedReward && appliedReward.type === 'discount' && (
                    <div className="flex justify-between text-yellow-500">
                      <span className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Descuento ({appliedReward.value}%):
                      </span>
                      <span>-{formatPrice(subtotal * (appliedReward.value / 100))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span>Envío:</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-red-900/30 pt-3 flex justify-between text-2xl font-bold text-red-500">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {appliedReward && (
                  <div className="mb-4 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-yellow-500" />
                        <div>
                          <p className="text-yellow-500 font-medium text-sm">Recompensa aplicada</p>
                          <p className="text-gray-400 text-xs">{appliedReward.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={clearReward}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                >
                  Proceder al Pago
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {user && user.role === 'client' && (
                  <div className="mt-4 bg-gradient-to-r from-yellow-950/30 to-red-950/30 border border-yellow-600/50 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-500 font-medium text-sm">
                        Este pedido te dará +{Math.floor(total / 10000)} {Math.floor(total / 10000) === 1 ? 'punto' : 'puntos'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                  <HeartCrack className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm text-center">
                    Envío gratis en pedidos superiores a $200.000 COP
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}