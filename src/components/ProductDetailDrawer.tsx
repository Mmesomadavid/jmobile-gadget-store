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
    if (value > 0) {
      setQuantity(value);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-2xl mx-auto">
        <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <DrawerHeader className="flex items-center justify-between pb-0">
            <DrawerTitle className="text-2xl font-bold text-gray-900">
              Product Details
            </DrawerTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </DrawerHeader>

          {/* Product Content */}
          <div className="flex-1 px-6 py-6 grid grid-cols-2 gap-8">
            {/* Left: Product Image */}
            <div className="flex flex-col">
              <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 transition font-medium ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-red-500'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              {/* Product Name and Rating */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Price Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge className="bg-red-600 text-white">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Color
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                          selectedColor === color
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4 bg-gray-100 rounded-lg w-fit px-4 py-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 rounded-lg font-semibold text-lg mb-4 transition"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              {/* Product Details List */}
              {product.details && product.details.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <span className="w-2 h-2 bg-emerald-700 rounded-full mr-3" />
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
