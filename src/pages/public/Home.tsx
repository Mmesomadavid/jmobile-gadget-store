'use client';
import Hero from './sections/Hero';
import Process from './sections/Process';
import TopSellers from '../../components/TopSellers';
import LimitedDeals from '../../components/LimitedDeals';
import PhoneDeals from '../../components/PhoneDeals';

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <TopSellers />
      <LimitedDeals />
      <PhoneDeals />
    </>
  );
}
