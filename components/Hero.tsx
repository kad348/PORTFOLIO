import React from 'react';
import { ArrowDown } from 'lucide-react';
import LogoLoop from './LogoLoop';

// Using official colored app icons to match the provided files
const softwareLogos = [
  { 
    title: 'Adobe Premiere Pro', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/2101px-Adobe_Premiere_Pro_CC_icon.svg.png' 
  },
  { 
    title: 'Adobe After Effects', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/2101px-Adobe_After_Effects_CC_icon.svg.png' 
  },
  { 
    title: 'Adobe Photoshop', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png' 
  },
  { 
    title: 'Adobe Illustrator', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png' 
  }
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
    <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left flex flex-col justify-center">
            <div className="inline-block mb-6 self-start px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <span className="text-xs font-semibold tracking-wider text-purple-200 uppercase">
                Available for freelance
              </span>
            </div>
            
            {/* Optimized Responsive Typography */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] sm:leading-tight">
              Visual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Alchemist
              </span>
            </h1>
            
            <p className="max-w-xl text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 font-light leading-relaxed">
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
            </div>
          </div>

          {/* Right Column: Software Arsenal (Logo Loop) */}
          <div className="w-full relative mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl shadow-purple-500/5">
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
                  logoHeight={48} 
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