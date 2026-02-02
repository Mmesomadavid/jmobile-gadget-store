'use client';
import Hero from './sections/Hero';
import Categories from './sections/Categories';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      
      {/* Products Section Placeholder */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add your product listing component here */}
        </div>
      </section>
    </>
  );
}
