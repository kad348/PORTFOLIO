import React from 'react';
import { ArrowDown } from 'lucide-react';
import LogoLoop from './LogoLoop.tsx';

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
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.95] sm:leading-[0.9]">
              Visual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">
                Alchemist
              </span>
            </h1>
            
            <p className="max-w-xl text-lg sm:text-xl text-gray-400 mb-10 font-light leading-relaxed">
              Transforming concepts into cinematic realities. Specialized in high-impact motion graphics and expert video editing for global brands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, '#portfolio')}
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden flex items-center justify-center gap-3 hover:bg-purple-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-xl shadow-purple-500/10"
              >
                <span className="relative z-10">Explore Works</span>
                <ArrowDown size={18} className="relative z-10 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Software Arsenal (Logo Loop) */}
          <div className="w-full relative mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-2xl shadow-black/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="text-center mb-10 relative z-10">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-3">Software Arsenal</h3>
                <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <LogoLoop 
                  logos={softwareLogos} 
                  speed={35} 
                  direction="left" 
                  gap={50} 
                  logoHeight={52} 
                  pauseOnHover={true}
                  scaleOnHover={true}
                  fadeOut={true}
                />
              </div>

              <div className="mt-10 flex justify-center space-x-2 relative z-10">
                <div className="w-10 h-1.5 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-1.5 bg-white/10 rounded-full"></div>
                <div className="w-2 h-1.5 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}