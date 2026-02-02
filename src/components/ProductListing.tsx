'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import ProductDetailDrawer from './ProductDetailDrawer';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  description?: string;
  details?: string[];
  colors?: string[];
}

interface ProductListingProps {
  category?: string;
  searchQuery?: string;
}

export default function ProductListing({
  category,
  searchQuery,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const params = new URLSearchParams();

        if (category) params.append('category', category);
        if (searchQuery) params.append('search', searchQuery);

        const response = await fetch(
          `${apiUrl}/api/products?${params.toString()}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback mock data for demonstration
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700" />
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {category
              ? `${category} For You!`
              : searchQuery
                ? `Search Results for "${searchQuery}"`
                : 'Headphones For You!'}
          </h2>
          <p className="text-gray-600">
            {products.length} products available
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                {/* Image Container */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-orange-50 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5 text-gray-400 hover:text-orange-700" />
                  </button>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Sale
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 p-4">
                  <div onClick={() => handleProductClick(product)} className="cursor-pointer">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-orange-700 transition">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-3 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleProductClick(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium mt-auto"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </section>

      {/* Product Detail Drawer */}
      {selectedProduct && (
        <ProductDetailDrawer
          product={selectedProduct}
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />
      )}
    </>
  );
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds, IPX8',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 128,
    category: 'earbuds',
    inStock: true,
    description: 'Premium wireless earbuds with advanced noise cancellation and 24-hour battery life.',
    details: ['Noise Cancellation', 'Water Resistant', '24-hour Battery', 'Touch Controls'],
    colors: ['Black', 'White', 'Blue'],
  },
  {
    id: '2',
    name: 'AirPods Max',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 256,
    category: 'headphones',
    inStock: true,
    description: 'Premium over-ear headphones with spatial audio and exceptional sound quality.',
    details: ['Spatial Audio', 'Active Noise Cancellation', '60-hour Battery', 'Premium Build'],
    colors: ['Silver', 'Space Black', 'Gold'],
  },
  {
    id: '3',
    name: 'Boss BT Earphones',
    price: 289.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'headphones',
    inStock: true,
    description: 'Professional Bluetooth earphones with crystal-clear audio and wireless connectivity.',
    details: ['Bluetooth 5.0', 'ANC Technology', 'Comfortable Design', 'Long Battery Life'],
    colors: ['Black', 'Red', 'Silver'],
  },
  {
    id: '4',
    name: 'ViveFox Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.3,
    reviews: 94,
    category: 'headphones',
    inStock: false,
    description: 'Stylish over-ear headphones with bass boost and comfortable padding.',
    details: ['Bass Boost', 'Comfortable Padding', 'Folding Design', 'Wired & Wireless'],
    colors: ['Red', 'Black', 'White'],
  },
  {
    id: '5',
    name: 'JBL TUNE 600STHC',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.2,
    reviews: 72,
    category: 'headphones',
    inStock: true,
    description: 'Affordable premium sound headphones with pure bass and durable design.',
    details: ['Pure Bass', 'Durable Design', 'Comfortable Fit', 'Swivel Design'],
    colors: ['Black', 'White', 'Blue'],
  },
  {
    id: '6',
    name: 'Sony WH-CH720N',
    price: 279.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'headphones',
    inStock: true,
    description: 'Wireless noise-canceling headphones with exceptional sound clarity.',
    details: ['Noise Cancellation', '35-hour Battery', 'Multi-Point Connection', 'Premium Audio'],
    colors: ['Black', 'White', 'Beige'],
  },
  {
    id: '7',
    name: 'TAOTRY Bluetooth',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.4,
    reviews: 145,
    category: 'earbuds',
    inStock: true,
    description: 'True wireless earbuds with active noise cancellation and 8GB storage.',
    details: ['ANC', '8GB Storage', 'Waterproof', 'Fast Charging'],
    colors: ['Black', 'White', 'Silver'],
  },
  {
    id: '8',
    name: 'Monster MHLEX',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 117,
    category: 'headphones',
    inStock: true,
    description: 'High-performance wireless headphones with monster clarity and powerful bass.',
    details: ['Powerful Bass', 'Wireless', '40-hour Battery', 'Comfortable Design'],
    colors: ['Black', 'Red', 'White'],
  },
];
