'use client';

import { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart, Star, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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

interface ProductDetailDrawerProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetailDrawer({
  product,
  isOpen,
  onOpenChange,
}: ProductDetailDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    onOpenChange(false);
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-xl sm:max-w-2xl mx-auto">
        <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <DrawerHeader className="flex items-center justify-between pb-2 sm:pb-4">
            <DrawerTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Product Details
            </DrawerTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </DrawerHeader>

          {/* Product Content */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Left: Product Image */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden aspect-square mb-4">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-xs sm:text-sm">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-lg border-2 transition font-medium ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 flex flex-col">
              {/* Name & Rating */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-4 sm:mb-6 pb-3 border-b">
                <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
                  <span className="text-xl sm:text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm sm:text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge className="bg-red-600 text-white text-xs sm:text-sm">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-green-600 font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Color
                  </label>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg border-2 font-medium transition text-xs sm:text-sm ${
                          selectedColor === color
                            ? 'border-orange-700 bg-orange-50 text-orange-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-orange-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg w-fit px-3 sm:px-4 py-1 sm:py-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 w-6 sm:w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-orange-700 hover:bg-orange-800 text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base mb-4 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
              </Button>

              {/* Product Details */}
              {product.details && product.details.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 text-xs sm:text-sm">
                        <span className="w-2 h-2 bg-orange-700 rounded-full mr-2 sm:mr-3" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
