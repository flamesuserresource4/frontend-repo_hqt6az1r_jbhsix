import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Booking from './components/Booking.jsx';
import CommunityContact from './components/CommunityContact.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070a0f]">
      <Hero />
      <About />
      <Booking />
      <CommunityContact />
    </div>
  );
}
