import React from 'react';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Create Together</h2>
          <p className="text-xl text-gray-400">Have a project in mind? Reach out and let's make it happen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
             <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
               <Mail className="w-8 h-8 text-purple-400 mb-4" />
               <h3 className="text-lg font-bold mb-1">Email Me</h3>
               <a href="mailto:hello@kaveenadithya.com" className="text-gray-400 hover:text-white transition-colors">hello@kaveenadithya.com</a>
             </div>
             
             <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
               <div className="flex space-x-4">
                 <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-purple-400 transition-colors">
                   <Instagram size={24} />
                 </a>
                 <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-cyan-400 transition-colors">
                   <Twitter size={24} />
                 </a>
                 <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-blue-400 transition-colors">
                   <Linkedin size={24} />
                 </a>
               </div>
               <p className="mt-4 text-sm text-gray-400">Follow my latest work on social media.</p>
             </div>
          </div>

          <form className="col-span-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
            />
            <textarea 
              rows={5} 
              placeholder="Tell me about your project..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}