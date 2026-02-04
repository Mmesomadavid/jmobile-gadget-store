'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating?: number; // 0 to 5
}

const topProducts: Product[] = [
  {
    id: 1,
    name: 'Apple AirPods Pro',
    price: '₦120,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/53/6994793/1.jpg?3421',
    rating: 4,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: '₦450,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/22/3149893/1.jpg?0818',
    rating: 5,
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: '₦950,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/6465814/1.jpg?0965',
    rating: 4,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: '₦250,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/3416104/1.jpg?8164',
    rating: 5,
  },
];

const TopSellers: FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Top Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-lg shadow-md overflow-hidden relative group flex flex-col justify-between"
          >
            {/* Wishlist Heart */}
            <Button
              variant="ghost"
              className="absolute top-2 right-2 p-2 rounded-full z-10"
            >
              <Heart className="w-8 h-8 text-red-500" />
            </Button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < (product.rating || 0) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 font-medium">{product.price}</p>

              {/* Add to Cart */}
              <Button
                variant="default"
                className="mt-2 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
