import React from 'react';
import { Clock, Shield, Wallet } from 'lucide-react';

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
    <div className="mb-3 inline-flex items-center gap-2 text-yellow-300">
      <Icon size={18} />
      <span className="font-semibold">{title}</span>
    </div>
    <p className="text-sm text-white/70">{desc}</p>
  </div>
);

export default function About() {
  return (
    <section id="about" className="relative bg-[#0b0f15] py-16 text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.08),_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Our Service</h2>
            <p className="mt-3 text-white/75">
              From Colombo to Kandy, Galle to Jaffna — we connect Sri Lanka with safe, on-time rides.
              Our professional drivers and transparent pricing make every trip smooth and stress-free.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Feature icon={Clock} title="24/7 Service" desc="Book anytime, day or night — we’re always on the road." />
              <Feature icon={Wallet} title="Affordable" desc="Fair, transparent pricing with no hidden fees." />
              <Feature icon={Shield} title="Trusted" desc="Background-checked drivers and well-maintained cars." />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <svg viewBox="0 0 360 260" className="h-auto w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#f5b301" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="360" height="260" fill="#0f141b" rx="16" />
              <g opacity="0.25">
                <circle cx="300" cy="40" r="80" fill="url(#g1)" />
                <circle cx="40" cy="220" r="60" fill="url(#g1)" />
              </g>
              {/* Lotus Tower silhouette */}
              <path d="M180 30 l8 18 -6 6 6 70 -8 8 -8-8 6-70 -6-6z" fill="#7c3aed" opacity="0.9" />
              <rect x="176" y="132" width="8" height="54" fill="#94a3b8" />
              {/* Taxi body */}
              <rect x="70" y="160" width="220" height="46" rx="10" fill="url(#g1)" />
              <rect x="90" y="146" width="120" height="24" rx="6" fill="#0f141b" />
              <rect x="220" y="146" width="50" height="24" rx="6" fill="#0f141b" />
              {/* Wheels */}
              <circle cx="120" cy="210" r="16" fill="#0b0f15" />
              <circle cx="240" cy="210" r="16" fill="#0b0f15" />
              <circle cx="120" cy="210" r="8" fill="#111827" />
              <circle cx="240" cy="210" r="8" fill="#111827" />
              {/* Headlight */}
              <rect x="284" y="172" width="10" height="8" rx="2" fill="#fde68a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
