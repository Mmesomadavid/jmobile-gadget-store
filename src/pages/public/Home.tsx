'use client';
import Hero from './sections/Hero';
import Categories from './sections/Categories';
import ProductListing from '../../components/ProductListing';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductListing/>
    </>
  );
}
