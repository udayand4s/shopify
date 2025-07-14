'use client';

import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Menu, Search, User } from 'lucide-react';

export function LivePreview() {
  const { state } = useStore();

  const customStyles = {
    '--primary-color': state.settings.primaryColor,
    '--secondary-color': state.settings.secondaryColor,
    '--accent-color': state.settings.accentColor,
    '--font-family': state.settings.fontFamily,
    '--font-size': state.settings.fontSize + 'px',
  } as React.CSSProperties;

  const featuredProducts = state.products.filter(p => p.featured).slice(0, 3);
  const allProducts = state.products.slice(0, 6);

  return (
    <div className="h-full bg-white overflow-auto" style={customStyles}>
      {/* Header */}
      <header 
        className="border-b border-gray-200 sticky top-0 bg-white z-10"
        style={{ 
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size)'
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {state.settings.logo && (
                <img
                  src={state.settings.logo}
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
              )}
              <h1 
                className="text-xl font-bold"
                style={{ color: 'var(--secondary-color)' }}
              >
                {state.settings.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button 
                size="sm"
                style={{ 
                  backgroundColor: 'var(--primary-color)',
                  color: 'white'
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <nav className="mt-3">
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              {state.categories.slice(0, 3).map(category => (
                <a key={category} href="#" className="text-gray-600 hover:text-gray-900">
                  {category}
                </a>
              ))}
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="py-8 px-4"
        style={{ 
          backgroundColor: 'var(--primary-color)' + '10',
          fontFamily: 'var(--font-family)'
        }}
      >
        <div className="text-center">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ color: 'var(--secondary-color)' }}
          >
            Welcome to {state.settings.name}
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Discover our amazing collection of products designed just for you.
          </p>
          <Button
            style={{
              backgroundColor: 'var(--accent-color)',
              color: 'white'
            }}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-8 px-4">
          <h3 
            className="text-2xl font-bold mb-6 text-center"
            style={{ 
              color: 'var(--secondary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            Featured Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-8 px-4 bg-gray-50">
        <h3 
          className="text-2xl font-bold mb-6 text-center"
          style={{ 
            color: 'var(--secondary-color)',
            fontFamily: 'var(--font-family)'
          }}
        >
          Our Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 px-4 border-t border-gray-200"
        style={{ 
          backgroundColor: 'var(--secondary-color)',
          color: 'white',
          fontFamily: 'var(--font-family)'
        }}
      >
        <div className="text-center">
          <h4 className="font-bold text-lg mb-2">{state.settings.name}</h4>
          <p className="text-sm opacity-75">
            Your trusted e-commerce destination
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <a href="#" className="hover:opacity-75">About</a>
            <a href="#" className="hover:opacity-75">Contact</a>
            <a href="#" className="hover:opacity-75">Privacy</a>
            <a href="#" className="hover:opacity-75">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm">{product.name}</h4>
          {product.featured && <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
        </div>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">${product.price}</span>
          <Badge variant="outline" className="text-xs">{product.category}</Badge>
        </div>
        <Button 
          size="sm" 
          className="w-full"
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'white'
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}