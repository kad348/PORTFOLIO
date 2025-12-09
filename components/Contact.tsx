import React, { useState } from 'react';
import { Mail, Instagram, MessageCircle, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSubmit = () => {
    const { name, email, subject, message } = formData;
    if (!name || !message) {
      alert('Please fill in your name and message.');
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:akaveen403@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppSubmit = () => {
    const { name, email, subject, message } = formData;
    if (!name || !message) {
      alert('Please fill in your name and message.');
      return;
    }
    const text = `*New Portfolio Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    window.open(`https://wa.me/94715308357?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">Let's Create Together</h2>
          <p className="text-lg md:text-xl text-gray-400">Have a project in mind? Reach out and let's make it happen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-4 md:space-y-6">
             <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
               <Mail className="w-8 h-8 text-purple-400 mb-4" />
               <h3 className="text-lg font-bold mb-1">Email Me</h3>
               <a href="mailto:akaveen403@gmail.com" className="text-gray-400 hover:text-white transition-colors break-all">akaveen403@gmail.com</a>
             </div>
             
             <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
               <div className="flex space-x-4">
                 <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-purple-400 transition-colors">
                   <Instagram size={24} />
                 </a>
                 <a href="https://wa.me/94715308357" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-green-400 transition-colors" aria-label="WhatsApp">
                   <MessageCircle size={24} />
                 </a>
                 <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-blue-400 transition-colors">
                   <Linkedin size={24} />
                 </a>
               </div>
               <p className="mt-4 text-sm text-gray-400">Follow my latest work on social media.</p>
             </div>
          </div>

          <form className="col-span-1 md:col-span-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-base text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
                required
              />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-base text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
                required
              />
            </div>
            <input 
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange} 
              placeholder="Subject" 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-base text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5} 
              placeholder="Tell me about your project..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-base text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
              required
            ></textarea>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button 
                type="button"
                onClick={handleEmailSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                <Mail size={20} className="group-hover:-translate-y-1 transition-transform" />
                Send via Email
              </button>
              <button 
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                <MessageCircle size={20} className="group-hover:-translate-y-1 transition-transform" />
                Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}