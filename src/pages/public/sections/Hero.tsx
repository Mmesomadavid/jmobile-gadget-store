"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import iphoneimg1 from "../../../assets/iphone17.jpg"
import { Button } from "../../../components/ui/button";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">
      {/* OUTER CONTAINER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black p-10 md:p-16">
        
        {/* TEXT CONTENT — FULL WIDTH */}
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block mb-6 rounded-full bg-white/10 text-white px-4 py-1 text-sm">
            New Iphone
          </span>

          <h1 className="text-4xl md:text-7xl font-light text-white leading-tight">
            iPhone 17
            <br />
            <span className="text-zinc-400">Power, perfected.</span>
          </h1>

          <p className="mt-6 text-zinc-100 text-lg max-w-2xl">
            A bold leap in performance, battery life, and camera clarity.
            Designed to match your style — inside and out.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button className="rounded-full bg-white text-black hover:bg-zinc-200 px-8 py-6 text-base">
              Buy Now
              <ShoppingBag/>
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-white/20 text-black hover:bg-white/90 px-8 py-6 text-base"
            >
              Explore Specs
              <ArrowRight/>
            </Button>
          </div>
        </div>

        {/* IPHONE IMAGE */}
        <div className="pointer-events-none absolute right-6 bottom-0 md:right-16 md:bottom-[-40px] opacity-90">
          <img
            src={iphoneimg1} // 👈 replace with your local image path
            alt="iPhone 17"
            width={420}
            height={840}
            className="drop-shadow-2xl"
          />
        </div>

        {/* SOFT GLOW */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
