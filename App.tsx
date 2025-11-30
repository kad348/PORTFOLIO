import React from 'react';
import Galaxy from './components/Galaxy';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Galaxy 
          starSpeed={0.02} // Very slow, gentle drift
          density={1.5}
          twinkleIntensity={0.1} // Subtle twinkling
          rotationSpeed={0.005} // Almost imperceptible rotation
          hueShift={280} // Purple/Blue shift
          glowIntensity={0.5}
          mouseRepulsion={true}
          repulsionStrength={2} // Smooth, elegant response
        />
        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <About />
          <Contact />
        </main>
        
        <footer className="py-8 text-center text-gray-600 text-sm relative z-10 border-t border-white/5 bg-black/80 backdrop-blur-xl">
          <p>© {new Date().getFullYear()} Kaveen Adithya. Built with React & OGL.</p>
        </footer>
      </div>
    </div>
  );
}