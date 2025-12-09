import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Instagram, Youtube, Phone, Mail } from 'lucide-react';
import Galaxy from './components/Galaxy';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load heavy sections to improve initial page load speed
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Custom Discord Icon Component
const DiscordIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping"></div>
  </div>
);

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      {/* Background Layer */}
      {/* Updated background to a gray-black gradient for mobile/fallback */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900 via-black to-black">
        {/* Only render Galaxy on desktop (non-mobile) devices */}
        {!isMobile && (
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
        )}
        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main>
          <Hero />
          
          <Suspense fallback={<SectionLoader />}>
            <Portfolio />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        
        <footer className="py-8 text-center text-gray-600 text-sm relative z-10 border-t border-white/5 bg-black/80 backdrop-blur-xl px-4">
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 font-medium">
              <a href="tel:+94715308357" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <Phone size={16} />
                <span>+94 715308357</span>
              </a>
              <span className="hidden md:inline text-gray-700">|</span>
              <a href="mailto:akaveen403@gmail.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <Mail size={16} />
                <span>akaveen403@gmail.com</span>
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors hover:scale-110 transform duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://discord.com/users/707679977495068752" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200"
                aria-label="Discord"
              >
                <DiscordIcon size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@KAvEeN_aD" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-red-500 transition-colors hover:scale-110 transform duration-200"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <p>© {new Date().getFullYear()} Kaveen Adithya. Built with React & OGL.</p>
        </footer>
      </div>
    </div>
  );
}