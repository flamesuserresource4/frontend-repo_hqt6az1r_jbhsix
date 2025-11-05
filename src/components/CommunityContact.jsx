import React from 'react';
import { Star, Phone, Mail, MapPin } from 'lucide-react';

const Testimonial = ({ name, text }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
    <div className="mb-3 flex items-center gap-1 text-yellow-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" className="text-yellow-300" />
      ))}
    </div>
    <p className="text-sm text-white/80">“{text}”</p>
    <p className="mt-3 text-xs text-white/60">— {name}</p>
  </div>
);

export default function CommunityContact() {
  const testimonials = [
    { name: 'Nipun', text: 'Clean car and polite driver. Reached Bandaranaike Airport on time!' },
    { name: 'Anika', text: 'Booked late night from Colombo 07 to Mount — quick and safe.' },
    { name: 'Kasun', text: 'Transparent fare and no hassle. Highly recommended.' },
    { name: 'Maya', text: 'Great experience! Will book again for my Kandy trip.' },
  ];

  return (
    <section id="contact" className="bg-[#0b0f15] py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">What Riders Say</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {testimonials.map((t, i) => (
                <Testimonial key={i} {...t} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <form className="mt-4 space-y-3">
              <input placeholder="Your name" className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
              <input placeholder="Email" type="email" className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
              <textarea placeholder="Message" rows={4} className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
              <button type="button" className="inline-flex items-center rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black transition hover:brightness-95">Send</button>
            </form>

            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2 text-white/80"><Phone size={16} className="text-yellow-300" /> +94 77 123 4567</p>
              <p className="flex items-center gap-2 text-white/80"><Mail size={16} className="text-yellow-300" /> hello@islandcabs.lk</p>
              <p className="flex items-center gap-2 text-white/80"><MapPin size={16} className="text-yellow-300" /> Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
          <iframe
            title="Colombo Map"
            className="h-64 w-full rounded-lg"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126742.18361338593!2d79.7738204708236!3d6.921838962462076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593f9d5c5e83%3A0x8b2f9d06f2bca6e9!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-lg font-semibold">Privacy Policy</h4>
            <p className="mt-2 text-sm text-white/75">
              We only collect details necessary to fulfill your booking and never share your data with third parties without consent.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-lg font-semibold">Terms & Conditions</h4>
            <p className="mt-2 text-sm text-white/75">
              By booking, you agree to our fair usage, safety standards, and payment terms. Cancellations may incur a small fee.
            </p>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Island Cabs. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#booking" className="hover:text-white">Book</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
