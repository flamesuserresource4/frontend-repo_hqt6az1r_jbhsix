import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Phone, Car } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0a0d12] text-white">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Rv0J4qv9V0y8xq0n/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.12)_0%,_transparent_55%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 pb-20 sm:pt-36">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <span className="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          Sri Lanka’s reliable rides — islandwide 24/7
        </div>

        <h1 className="mt-6 text-center font-[800] leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl">
          Ride in Comfort. Arrive in Style.
        </h1>
        <p className="mt-4 max-w-2xl text-center text-white/80 sm:text-lg">
          Premium taxi service with transparent fares and trusted drivers across Sri Lanka.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-medium text-black shadow-lg shadow-yellow-400/20 transition hover:brightness-95"
          >
            Book a Ride <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-medium text-white/90 transition hover:bg-white/10"
          >
            <Phone size={18} /> Call Us
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: <Car size={18} />, label: 'Clean vehicles' },
            { icon: <ArrowRight size={18} />, label: 'On-time pickup' },
            { icon: <Phone size={18} />, label: '24/7 support' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3"
            >
              <div className="grid h-8 w-8 place-items-center rounded-md bg-yellow-400/10 text-yellow-300">
                {item.icon}
              </div>
              <p className="text-sm text-white/80">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
