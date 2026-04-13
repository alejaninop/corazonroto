import { Link } from 'react-router';
import { HeartCrack, UtensilsCrossed, Truck, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514436598301-27a65f40469f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBoZWFydCUyMGNhbmRsZSUyMGRhcmslMjByb21hbnRpY3xlbnwxfHx8fDE3NzUwNzA0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-950/60 to-black/90" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <HeartCrack className="w-20 h-20 text-red-600 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Corazón Roto
          </h1>
          <p className="text-xl md:text-2xl text-red-400 mb-8 italic">
            "Donde cada plato cuenta una historia de amor perdido"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                Ver Menú del Despecho
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/reservations">
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30 px-8 py-6 text-lg">
                Hacer una Reserva
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-12">
            Sana tu corazón con cada bocado
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/menu" className="group">
              <div className="bg-black/40 border border-red-900/30 rounded-lg p-8 hover:bg-red-950/30 transition-all hover:border-red-700/50">
                <UtensilsCrossed className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Menú del Despecho
                </h3>
                <p className="text-gray-400">
                  Platos con nombres de desamor que te harán olvidar tus penas. Cada receta preparada con lágrimas de cocodrilo y amor perdido.
                </p>
              </div>
            </Link>

            <Link to="/delivery" className="group">
              <div className="bg-black/40 border border-red-900/30 rounded-lg p-8 hover:bg-red-950/30 transition-all hover:border-red-700/50">
                <Truck className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Pedidos a Domicilio
                </h3>
                <p className="text-gray-400">
                  Recibe tu comida de despecho en la comodidad de tu cama. Perfecta para esos días donde no quieres salir.
                </p>
              </div>
            </Link>

            <Link to="/reservations" className="group">
              <div className="bg-black/40 border border-red-900/30 rounded-lg p-8 hover:bg-red-950/30 transition-all hover:border-red-700/50">
                <Calendar className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Reservas Especiales
                </h3>
                <p className="text-gray-400">
                  Reserva tu mesa en nuestro ambiente íntimo. Ideal para llorar en público sin ser juzgado.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto max-w-4xl text-center">
          <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-6 opacity-50" />
          <blockquote className="text-2xl md:text-3xl text-gray-300 italic mb-4">
            "El amor duele, pero nuestra comida sana"
          </blockquote>
          <p className="text-red-400">- Chef del Desamor</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6">
            ¿Listo para sanar tu corazón?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Explora nuestro menú y descubre los platos más emotivos de la ciudad
          </p>
          <Link to="/menu">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-lg">
              Explorar Menú Completo
              <HeartCrack className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
