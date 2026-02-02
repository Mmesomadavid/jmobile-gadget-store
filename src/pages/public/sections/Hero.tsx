'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

// ✅ Local image imports
import iphoneImg from '../../../assets/iphone17.jpg';
import iWatchImg from '../../../assets/iwatch1.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'iPhone 16 Pro Max',
      subtitle: 'From ₦ 2,700,000',
      description: 'All the Apple. Supersized. Display Beyond Perspective',
      cta: 'Shop Now',
      bgColor: 'from-black via-zinc-800/40 to-black',
      image: iphoneImg,
    },
    {
      id: 2,
      title: 'SALE 50%',
      subtitle: 'Limited Time Offer',
      description: 'Get amazing discounts on selected items',
      cta: 'Shop Now',
      bgColor: 'from-orange-700 via-orange-500 to-orange-600',
      image: iWatchImg,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-xl">
        {/* ================= Carousel ================= */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 h-96 bg-gradient-to-r ${slide.bgColor} rounded-xl flex items-center justify-between p-8 md:p-12`}
            >
              {/* LEFT CONTENT */}
              <div className="flex-1 z-10">
                <p className="text-white text-sm font-medium mb-2">
                  New Arrival
                </p>

                <h2 className="text-3xl md:text-6xl font-normal text-white mb-2">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-2xl text-white/90 mb-4">
                  {slide.subtitle}
                </p>

                <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">
                  {slide.description}
                </p>

                <button className="flex items-center bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  {slide.cta}
                  <ShoppingCart className="w-8 h-8 pl-3"/>
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="hidden md:flex flex-1 items-center justify-end">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-100 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ================= Controls ================= */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>

        {/* ================= Dots ================= */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
