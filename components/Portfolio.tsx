import React, { useState, useEffect, memo, useCallback } from 'react';
import { ProjectCategory, Project } from '../types.ts';
import { Play, X, Maximize2 } from 'lucide-react';
import { videoProjects } from '../data/videos.ts';
import { designProjects } from '../data/designs.ts';
import WorkLoop from './WorkLoop.tsx';

const getYouTubeInfo = (url: string) => {
  let id = '';
  const isShort = url.includes('/shorts/');
  try {
    if (isShort) {
      const parts = url.split('/shorts/');
      if (parts.length > 1) id = parts[1].split('?')[0].split('&')[0];
    } else if (url.includes('v=')) {
      id = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split('?')[0];
    }
  } catch (e) { console.error(e); }
  return { id, isShort };
};

const ProjectCard = memo(({ project, onClick }: { project: Project; onClick: (p: Project) => void }) => {
  const isVideo = project.category === 'video';
  const thumbUrl = isVideo && project.link && (project.link.includes('youtube') || project.link.includes('youtu.be'))
    ? `https://img.youtube.com/vi/${getYouTubeInfo(project.link).id}/maxresdefault.jpg` 
    : project.image;

  return (
    <div 
      onClick={() => onClick(project)}
      className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-2 shadow-2xl
        ${isVideo ? 'w-[260px] md:w-[320px] aspect-[9/16]' : 'w-[280px] md:w-[350px] aspect-square'}`}
    >
      <img 
        src={thumbUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).src = project.image;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 block">{project.category}</span>
          <h3 className="text-xl font-bold mb-1 tracking-tight">{project.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-4 font-light">{project.description}</p>
          <div className="flex items-center gap-2 text-white text-xs font-bold bg-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-md">
            {isVideo ? <><Play size={12} fill="currentColor" /> Play Video</> : <><Maximize2 size={12} /> View Design</>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; type: 'youtube' | 'local'; isShort: boolean } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = (selectedVideo || selectedImage) ? 'hidden' : 'unset';
  }, [selectedVideo, selectedImage]);

  const handleProjectClick = useCallback((project: Project) => {
    if (project.category === 'video' && project.link) {
      if (project.link.includes('youtube') || project.link.includes('youtu.be')) {
        const { id, isShort } = getYouTubeInfo(project.link);
        if (id) setSelectedVideo({ src: id, type: 'youtube', isShort });
      } else {
        const isShort = project.link.toLowerCase().includes('short') || project.link.toLowerCase().includes('tiktok');
        setSelectedVideo({ src: project.link, type: 'local', isShort });
      }
    } else if (project.category === 'graphic') {
      setSelectedImage(project.image);
    }
  }, []);

  return (
    <section id="portfolio" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Selected Works</h2>
            <p className="text-gray-400 text-lg font-light">A curation of cinematic motion and high-end aesthetics.</p>
          </div>
          
          <div className="flex bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-xl">
            {(['all', 'video', 'graphic'] as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  filter === cat ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-16 md:space-y-32">
        {(filter === 'all' || filter === 'video') && (
          <div className="fade-in">
            <div className="container mx-auto px-6 mb-6">
              <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em] mb-2">Portfolio</h3>
              <h4 className="text-2xl font-bold tracking-tight">Cinematic Motion</h4>
            </div>
            <WorkLoop direction="left" speed={45}>
              {videoProjects.map(p => <ProjectCard key={`vid-${p.id}`} project={p} onClick={handleProjectClick} />)}
            </WorkLoop>
          </div>
        )}

        {(filter === 'all' || filter === 'graphic') && (
          <div className="fade-in">
            <div className="container mx-auto px-6 mb-6">
              <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] mb-2">Gallery</h3>
              <h4 className="text-2xl font-bold tracking-tight">Graphic Mastery</h4>
            </div>
            <WorkLoop direction="right" speed={45}>
              {designProjects.map(p => <ProjectCard key={`des-${p.id}`} project={p} onClick={handleProjectClick} />)}
            </WorkLoop>
          </div>
        )}
      </div>

      {/* Optimized Modals */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl transition-opacity animate-fadeIn" onClick={() => setSelectedVideo(null)}>
          <div className={`relative bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 w-full ${selectedVideo.isShort ? 'max-w-[420px] aspect-[9/16]' : 'max-w-6xl aspect-video'}`} onClick={e => e.stopPropagation()}>
            <button className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10" onClick={() => setSelectedVideo(null)} aria-label="Close modal"><X size={24} /></button>
            {selectedVideo.type === 'youtube' ? (
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.src}?autoplay=1&rel=0`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            ) : (
              <video src={selectedVideo.src} className="w-full h-full object-contain" controls autoPlay loop />
            )}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl transition-opacity animate-fadeIn" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button className="absolute -top-16 right-0 p-3 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImage(null)} aria-label="Close modal"><X size={40} /></button>
            <img src={selectedImage} alt="Project High Resolution" className="w-full h-full object-contain rounded-3xl shadow-2xl border border-white/10" />
          </div>
        </div>
      )}
    </section>
  );
}