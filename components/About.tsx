import React from 'react';

const skills = [
  'Adobe After Effects', 'Premiere Pro', 'DaVinci Resolve',
  'Photoshop', 'Illustrator',  'Sound Design', 'Color Grading', 'Motion Tracking'
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 tracking-tighter">Behind the <br/><span className="text-purple-400">Scenes</span></h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg lg:text-xl font-light">
                <p>
                  I'm a multidisciplinary creative with a passion for storytelling through motion and design. 
                  With years of experience in the industry, I've had the privilege of working with 
                  brands ranging from tech startups to established entertainment entities.
                </p>
                <p>
                  My approach is simple: understand the core message, then elevate it with cutting-edge visual techniques. 
                  Whether I'm keyframing a complex animation or refining a typography layout, I'm obsessed with the details that make a vision truly cinematic.
                </p>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-6 border-t border-white/5 pt-10">
                <div>
                  <h4 className="text-3xl sm:text-5xl font-bold text-white tracking-tighter">50+</h4>
                  <p className="text-xs sm:text-sm text-purple-400 uppercase tracking-[0.2em] font-bold mt-1">Works Delivered</p>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                <div>
                  <h4 className="text-3xl sm:text-5xl font-bold text-white tracking-tighter">2+</h4>
                  <p className="text-xs sm:text-sm text-cyan-400 uppercase tracking-[0.2em] font-bold mt-1">Years of Craft</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 w-full">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-8">Technical Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-10 p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                  <p className="text-sm text-gray-300 italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}