import { useState } from 'react';
import { HeartCrack, Calendar as CalendarIcon, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

export function Reservations() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleNewReservation = () => {
    setShowConfirmation(false);
    setReservation({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      notes: ''
    });
  };

  if (showConfirmation) {
    const reservationNumber = Math.floor(Math.random() * 100000);
    const formattedDate = new Date(reservation.date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-black/60 border-red-900/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-4">
                ¡Reserva Confirmada!
              </h1>
              <p className="text-gray-400 text-lg">
                Tu mesa del despecho está lista
              </p>
            </div>

            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6 mb-8">
              <div className="text-center mb-6">
                <p className="text-gray-400 mb-2">Número de Reserva</p>
                <p className="text-3xl font-bold text-red-500">#{reservationNumber}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Nombre</p>
                  <p className="text-white font-medium">{reservation.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Teléfono</p>
                  <p className="text-white font-medium">{reservation.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white font-medium">{reservation.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Número de personas</p>
                  <p className="text-white font-medium">{reservation.guests} personas</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm mb-1">Fecha y hora</p>
                  <p className="text-white font-medium capitalize">{formattedDate} a las {reservation.time}</p>
                </div>
                {reservation.notes && (
                  <div className="md:col-span-2">
                    <p className="text-gray-400 text-sm mb-1">Notas especiales</p>
                    <p className="text-white">{reservation.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/40 border border-red-900/30 rounded-lg p-6 mb-8">
              <h3 className="text-red-400 font-bold mb-4">Información importante</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <HeartCrack className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Por favor, llega 10 minutos antes de tu reserva.</span>
                </li>
                <li className="flex items-start gap-2">
                  <HeartCrack className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Si necesitas cancelar, hazlo con al menos 24 horas de anticipación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <HeartCrack className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Hemos enviado un correo de confirmación a {reservation.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <HeartCrack className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Para cualquier cambio, llámanos al +34 666 ROTO 123</span>
                </li>
              </ul>
            </div>

            <div className="text-center border-t border-red-900/30 pt-8 mb-8">
              <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4 opacity-70" />
              <p className="text-gray-300 italic text-lg mb-2">
                "Prepárate para una experiencia gastronómica inolvidable..."
              </p>
              <p className="text-gray-400">
                ¡Gracias por elegir Corazón Roto!
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleNewReservation}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Nueva Reserva
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-900/30"
              >
                Imprimir Confirmación
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
            Reserva tu Mesa
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Reserva un lugar en nuestro íntimo espacio del desamor. 
            Perfecto para llorar mientras comes delicioso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-black/60 border-red-900/50 p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6">
              Datos de la Reserva
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  required
                  value={reservation.name}
                  onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                  className="bg-black/40 border-red-900/30 text-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={reservation.phone}
                    onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="+34 666 123 456"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={reservation.email}
                    onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-300 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Fecha *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={reservation.date}
                    onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Hora *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={reservation.time}
                    onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                    className="bg-black/40 border-red-900/30 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="guests" className="text-gray-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Número de personas *
                </Label>
                <select
                  id="guests"
                  required
                  value={reservation.guests}
                  onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                  className="w-full bg-black/40 border border-red-900/30 text-white rounded-md px-3 py-2"
                >
                  <option value="1">1 persona (Soledad total)</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                  <option value="6">6 personas</option>
                  <option value="7">7+ personas (Grupo de apoyo)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="notes" className="text-gray-300">
                  Notas especiales
                </Label>
                <Textarea
                  id="notes"
                  value={reservation.notes}
                  onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
                  className="bg-black/40 border-red-900/30 text-white"
                  placeholder="Alergias, preferencias de mesa, ocasión especial..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                Confirmar Reserva
                <HeartCrack className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Card>

          {/* Info */}
          <div className="space-y-6">
            <Card className="bg-black/60 border-red-900/50 p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6">
                Información del Restaurante
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CalendarIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Horario</p>
                    <p className="text-gray-400 text-sm">Lunes a Viernes: 12:00 - 23:00</p>
                    <p className="text-gray-400 text-sm">Sábado y Domingo: 11:00 - 00:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <HeartCrack className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Ubicación</p>
                    <p className="text-gray-400 text-sm">Calle del Olvido #404</p>
                    <p className="text-gray-400 text-sm">Ciudad del Desamor, España</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Contacto</p>
                    <p className="text-gray-400 text-sm">Teléfono: +34 666 ROTO 123</p>
                    <p className="text-gray-400 text-sm">Email: info@corazonroto.com</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-red-950/50 to-black/50 border-red-900/50 p-8">
              <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
                Experiencia única
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Ambiente íntimo y melancólico perfecto para la reflexión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Música de despecho en vivo los fines de semana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Menú especial con platos que cuentan historias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Pañuelos de cortesía en cada mesa (se aceptan lágrimas)</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-black/60 border-red-900/50 p-6">
              <p className="text-gray-400 italic text-center">
                "No importa si vienes solo o acompañado, 
                aquí todos compartimos el mismo dolor... 
                y la misma pasión por la buena comida"
              </p>
              <p className="text-red-400 text-center mt-3">- Chef Corazón Roto</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
