import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Marketing Director, TechFlow",
    content: "Kaveen transformed our raw footage into a masterpiece. The pacing, color grading, and attention to detail were exactly what we envisioned for our product launch.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Founder, StartUp Studio",
    content: "Incredible work on our brand identity. The logo design and social assets have completely elevated our online presence. Highly recommended for any visual design needs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Content Creator",
    content: "Fast turnaround and great communication. Kaveen really understands the YouTube style and helped increase my retention rate significantly with his edits.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Feedback</h2>
          <p className="text-gray-400">Hear from the people I've collaborated with.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-colors relative group"
            >
              <div className="absolute -top-4 left-8 bg-black border border-white/10 p-2 rounded-full text-purple-400 group-hover:text-purple-300 transition-colors">
                <Quote size={20} fill="currentColor" />
              </div>
              
              <div className="mb-6 pt-2">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.content}"</p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-purple-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}