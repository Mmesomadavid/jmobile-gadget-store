'use client';

import { useState } from 'react';
import type {FC} from 'react'
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ThumbsUp, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating?: number; // 0 to 5
  likes?: number;  // number of thumbs up
}

const topProducts: Product[] = [
  {
    id: 1,
    name: 'Apple AirPods Pro',
    price: '₦120,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/53/6994793/1.jpg?3421',
    rating: 4,
    likes: 120,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: '₦450,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/22/3149893/1.jpg?0818',
    rating: 5,
    likes: 95,
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: '₦950,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/6465814/1.jpg?0965',
    rating: 4,
    likes: 80,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: '₦250,000',
    image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/3416104/1.jpg?8164',
    rating: 5,
    likes: 150,
  },
];

const LimitedDeals: FC = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [heartedProducts, setHeartedProducts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleHeart = (id: number) => {
    setHeartedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Limited Deals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topProducts.map((product) => {
          const isLiked = likedProducts.includes(product.id);
          const isHearted = heartedProducts.includes(product.id);

          return (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col justify-between"
            >
              {/* Heart and Thumb icons in white circles */}
              <div className="absolute top-3 right-3 flex flex-col items-center gap-3 z-10">
                <button
                  onClick={() => toggleHeart(product.id)}
                  className="bg-white rounded-full p-4 shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    fill={isHearted ? 'currentColor' : 'none'}
                    className={`w-5 h-5 ${isHearted ? 'text-orange-500' : 'text-red-500'}`}
                  />
                </button>
                <button
                  onClick={() => toggleLike(product.id)}
                  className="bg-white rounded-full p-4 shadow-md hover:scale-110 transition-transform"
                >
                  <ThumbsUp
                    fill={isLiked ? 'currentColor' : 'none'}
                    className={`w-5 h-5 ${isLiked ? 'text-orange-500' : 'text-gray-500'}`}
                  />
                </button>
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-md font-semibold">{product.name}</h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < (product.rating || 0)
                          ? 'fill-yellow-400 stroke-yellow-400'
                          : 'stroke-gray-300'
                      }`}
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
          );
        })}
      </div>
    </div>
  );
};

export default LimitedDeals;
