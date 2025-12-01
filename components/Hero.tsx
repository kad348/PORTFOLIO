import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import LogoLoop from './LogoLoop';

// Using SimpleIcons for consistent, high-quality white logos
const softwareLogos = [
  { title: 'Adobe Premiere Pro', src: 'https://cdn.simpleicons.org/adobepremierepro/white' },
  { title: 'Adobe After Effects', src: 'https://cdn.simpleicons.org/adobeaftereffects/white' },
  { title: 'Adobe Photoshop', src: 'https://cdn.simpleicons.org/adobephotoshop/white' },
  { title: 'Adobe Illustrator', src: 'https://cdn.simpleicons.org/adobeillustrator/white' },
  { title: 'DaVinci Resolve', src: 'https://cdn.simpleicons.org/blackmagicdesign/white' }, // DaVinci is by Blackmagic
  { title: 'Affinity Designer', src: 'https://cdn.simpleicons.org/affinitydesigner/white' },
  { title: 'Affinity Photo', src: 'https://cdn.simpleicons.org/affinityphoto/white' },
];

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <span className="text-xs font-semibold tracking-wider text-purple-200 uppercase">
                Available for freelance
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-none">
              Visual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Alchemist
              </span>
            </h1>
            
            <p className="max-w-xl text-lg text-gray-400 mb-12 font-light leading-relaxed">
              Specializing in high-impact motion graphics and cinematic video editing. 
              Turning concepts into compelling visual narratives using the best tools in the industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, '#portfolio')}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span>View Recent Work</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
              
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 backdrop-blur-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={16} className="fill-current" />
                <span>Showreel</span>
              </a>
            </div>
          </div>

          {/* Right Column: Software Arsenal (Logo Loop) */}
          <div className="w-full relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-purple-500/5">
              <div className="text-center mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Software Arsenal</h3>
                <div className="h-1 w-12 bg-purple-500/50 mx-auto rounded-full"></div>
              </div>
              
              <div className="relative">
                {/* Gradient Masks for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-black/20 to-transparent"></div>
                
                <LogoLoop 
                  logos={softwareLogos} 
                  speed={40} 
                  direction="left" 
                  gap={40} 
                  logoHeight={40}
                  pauseOnHover={true}
                  scaleOnHover={true}
                  fadeOut={true}
                  fadeOutColor="transparent"
                />
              </div>

              <div className="mt-8 flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-8 bg-purple-500' : 'w-2 bg-white/10'}`}></div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}