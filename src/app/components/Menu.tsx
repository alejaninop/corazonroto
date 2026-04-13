import { useState } from 'react';
import { HeartCrack, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const { addToCart } = useCart();

  const categories = ['Todas', 'Entradas', 'Principales', 'Postres', 'Bebidas'];

  const filteredItems = selectedCategory === 'Todas'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart(item);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
            Menú del Despecho
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Platos preparados con amor perdido y sabores inolvidables
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                  : 'bg-black/40 text-gray-300 border border-red-900/30 hover:bg-red-950/30 hover:border-red-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-black/40 border border-red-900/30 rounded-lg overflow-hidden hover:border-red-700/50 transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-black">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-red-900/80 text-red-400 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <HeartCrack className="absolute bottom-3 left-3 w-8 h-8 text-red-600 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">
                    {formatPrice(item.price)}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No items message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <HeartCrack className="w-16 h-16 text-red-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">
              No hay platos en esta categoría... como tu corazón.
            </p>
          </div>
        )}

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="bg-black/40 border border-red-900/30 rounded-lg p-8 max-w-2xl mx-auto">
            <HeartCrack className="w-12 h-12 text-red-600 mx-auto mb-4 opacity-70" />
            <p className="text-gray-300 italic text-lg">
              "Cada plato está preparado con las mejores lágrimas de nuestra cocina. 
              Los ingredientes del desamor nunca fueron tan deliciosos."
            </p>
            <p className="text-red-400 mt-4">- Chef Corazón Roto</p>
          </div>
        </div>
      </div>
    </div>
  );
}