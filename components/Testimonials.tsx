
import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Shal-Luka",
    role: "CEO & Real State Agent",
    content: "Kaveen transformed our raw footage into a masterpiece. The pacing, color grading, and attention to detail were exactly what we envisioned for our product launch.",
    rating: 5,
    image: "https://raw.githubusercontent.com/kad348/Work/main/image.png"
  },
  {
    id: 2,
    name: "Kusal Arunod",
    role: "Co Founder REASONS PODCAST",
    content: "Working with Kaveen was seamless. His ability to interpret a creative brief and turn it into high-impact motion graphics is rare. He's my go-to for complex visual effects.",
    rating: 5,
    image: "https://raw.githubusercontent.com/kad348/Work/main/kimage.png"
  },
  {
    id: 3,
    name: "JH Hass",
    role: "Creative Director",
    content: "The brand identity Kaveen created exceeded all expectations. He has a sharp eye for modern typography and layout that truly makes a brand stand out in a crowded market.",
    rating: 5,
    image: "https://raw.githubusercontent.com/kad348/Work/main/jhass.png"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Client Feedback</h2>
          <p className="text-gray-400 text-lg">Hear from the people I've collaborated with to bring visions to life.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:border-purple-500/30 transition-all duration-500 relative group hover:-translate-y-2"
            >
              <div className="absolute -top-4 left-8 bg-purple-600 p-3 rounded-2xl text-white shadow-xl shadow-purple-600/20 group-hover:scale-110 transition-transform">
                <Quote size={20} fill="currentColor" />
              </div>
              
              <div className="mb-8 pt-4">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 italic leading-relaxed text-lg">"{testimonial.content}"</p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full"></div>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
                  <p className="text-xs text-purple-400 font-medium uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
