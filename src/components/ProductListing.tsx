'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

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
  const [sortBy, setSortBy] = useState('popular');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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

  useEffect(() => {
    let sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assume newer products come first (could use a timestamp)
        break;
      default:
        // popular - keep original order
        break;
    }

    setFilteredProducts(sorted);
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category
            ? `${category} For You!`
            : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'Featured Products'}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} products available
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b">
        <div className="flex gap-2 flex-wrap">
          {/* Filter buttons would go here */}
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            Filter
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              {/* Image Container */}
              <Link to={`/product/${product.id}`} className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-emerald-50 transition">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-emerald-700" />
                </button>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-emerald-700 text-white px-2 py-1 rounded text-xs font-bold">
                    Sale
                  </div>
                )}
              </Link>

              {/* Product Details */}
              <div className="flex flex-col flex-1 p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-emerald-700 transition">
                    {product.name}
                  </h3>
                </Link>

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
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium mt-auto"
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
  );
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro Max',
    price: 99.99,
    originalPrice: 149.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 128,
    category: 'earbuds',
    inStock: true,
  },
  {
    id: '2',
    name: 'AirPods Max',
    price: 399.99,
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 256,
    category: 'headphones',
    inStock: true,
  },
  {
    id: '3',
    name: 'Boss BT Earphones',
    price: 289.99,
    originalPrice: 399.99,
    image:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'headphones',
    inStock: true,
  },
  {
    id: '4',
    name: 'ViveFox Headphones',
    price: 199.99,
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.3,
    reviews: 94,
    category: 'headphones',
    inStock: false,
  },
  {
    id: '5',
    name: 'JBL TUNE 600STHC',
    price: 69.99,
    image:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.2,
    reviews: 72,
    category: 'headphones',
    inStock: true,
  },
  {
    id: '6',
    name: 'Sony WH-CH720N',
    price: 279.99,
    originalPrice: 349.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'headphones',
    inStock: true,
  },
  {
    id: '7',
    name: 'TAOTRY Bluetooth',
    price: 159.99,
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    rating: 4.4,
    reviews: 145,
    category: 'earbuds',
    inStock: true,
  },
  {
    id: '8',
    name: 'Monster MHLEX',
    price: 189.99,
    image:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 117,
    category: 'headphones',
    inStock: true,
  },
];
