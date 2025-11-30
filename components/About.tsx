import React from 'react';

const skills = [
  'Adobe After Effects', 'Premiere Pro', 'DaVinci Resolve',
  'Photoshop', 'Illustrator',  'Sound Design'
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Behind the Scenes</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a multidisciplinary creative with a passion for storytelling through motion and design. 
                  With over 5 years of experience in the industry, I've had the privilege of working with 
                  brands ranging from tech startups to established fashion labels.
                </p>
                <p>
                  My approach is simple: understand the core message, then elevate it with cutting-edge visual techniques. 
                  Whether I'm keyframing a complex animation or refining a typography layout, I'm obsessed with the details.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Technical Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div>
                  <h4 className="text-3xl font-bold text-purple-400">50+</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">Projects Completed</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-cyan-400">2+</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}