'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

import iphoneImg from '../../../assets/iphone17.jpg';
import iWatchImg from '../../../assets/iwatch1.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'iPhone 16 Pro Max',
      subtitle: 'From ₦2,700,000',
      description: 'All the Apple. Supersized. Display beyond perspective.',
      cta: 'Shop Now',
      bgColor:
        'from-neutral-950 via-zinc-900 to-neutral-800', // premium dark
      image: iphoneImg,
    },
    {
      id: 2,
      title: 'Apple Watch Series',
      subtitle: 'Up to 50% Off',
      description: 'Limited-time deals on premium Apple accessories.',
      cta: 'Shop Now',
      bgColor:
        'from-indigo-900 via-purple-900 to-fuchsia-800', // techy & vibrant
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
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      <div className="relative overflow-hidden rounded-2xl">
        {/* ================= Carousel ================= */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 bg-gradient-to-br ${slide.bgColor}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 px-5 py-8 sm:px-8 md:p-12">
                {/* LEFT CONTENT */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-white/70 text-xs sm:text-sm mb-1">
                    New Arrival
                  </p>

                  <h2 className="text-xl sm:text-2xl md:text-5xl font-medium text-white mb-2">
                    {slide.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-xl text-white/90 mb-3">
                    {slide.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm md:text-base text-white/75 mb-5 max-w-md mx-auto md:mx-0">
                    {slide.description}
                  </p>

                  <button className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition">
                    {slide.cta}
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {/* RIGHT IMAGE (VISIBLE ON MOBILE) */}
                <div className="flex-1 flex justify-center md:justify-end">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-40 sm:w-48 md:w-[420px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Controls ================= */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </button>

        {/* ================= Dots ================= */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/40 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
