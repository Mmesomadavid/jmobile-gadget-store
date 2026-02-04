'use client';
import Hero from './sections/Hero';
import Process from './sections/Process';
import ProductListing from '../../components/ProductListing';

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <ProductListing/>
    </>
  );
}
