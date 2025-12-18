
import React, { useState, useEffect } from 'react';
import { ProjectCategory, Project } from '../types';
import { Play, ExternalLink, X, Maximize2 } from 'lucide-react';
import { videoProjects } from '../data/videos';
import { designProjects } from '../data/designs';
import WorkLoop from './WorkLoop';

// Helper function moved to top level for sharing between components and consistent typing
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

// Extracted ProjectCard to top level to resolve JSX prop typing issues
const ProjectCard = ({ project, onClick }: { project: Project; onClick: (p: Project) => void; key?: React.Key }) => {
  const isVideo = project.category === 'video';
  const thumbUrl = isVideo && project.link && (project.link.includes('youtube') || project.link.includes('youtu.be'))
    ? `https://img.youtube.com/vi/${getYouTubeInfo(project.link).id}/maxresdefault.jpg` 
    : project.image;

  return (
    <div 
      onClick={() => onClick(project)}
      className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-1 shadow-2xl
        ${isVideo ? 'w-[260px] md:w-[320px] aspect-[9/16]' : 'w-[280px] md:w-[350px] aspect-square'}`}
    >
      <img 
        src={thumbUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src = project.image;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 block">{project.category}</span>
          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-4">{project.description}</p>
          <div className="flex items-center gap-2 text-white text-xs font-semibold">
            {isVideo ? <><Play size={14} /> Play Video</> : <><Maximize2 size={14} /> View Design</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; type: 'youtube' | 'local'; isShort: boolean } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVideo, selectedImage]);

  const handleProjectClick = (project: Project) => {
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
  };

  return (
    <section id="portfolio" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Selected Works</h2>
            <p className="text-gray-400">Cinematic edits and high-impact graphic design.</p>
          </div>
          
          <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
            {(['all', 'video', 'graphic'] as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12 md:space-y-20">
        {/* Video Ribbon */}
        {(filter === 'all' || filter === 'video') && (
          <div>
            <div className="container mx-auto px-6 mb-4">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-[0.3em]">Cinematic Motion</h3>
            </div>
            {/* Speed set to 40 to match the LogoLoop in Hero.tsx */}
            <WorkLoop direction="left" speed={40}>
              {videoProjects.map(p => <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />)}
            </WorkLoop>
          </div>
        )}

        {/* Design Ribbon */}
        {(filter === 'all' || filter === 'graphic') && (
          <div>
            <div className="container mx-auto px-6 mb-4">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em]">Graphic Mastery</h3>
            </div>
            {/* Speed set to 40 to match the LogoLoop in Hero.tsx */}
            <WorkLoop direction="right" speed={40}>
              {designProjects.map(p => <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />)}
            </WorkLoop>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedVideo(null)}>
          <div className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 w-full ${selectedVideo.isShort ? 'max-w-[400px] aspect-[9/16]' : 'max-w-5xl aspect-video'}`} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-20 p-2 bg-black/60 text-white rounded-full hover:bg-white/20 transition-colors border border-white/10" onClick={() => setSelectedVideo(null)}><X size={20} /></button>
            {selectedVideo.type === 'youtube' ? (
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.src}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            ) : (
              <video src={selectedVideo.src} className="w-full h-full object-contain" controls autoPlay loop />
            )}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button className="absolute -top-12 right-0 p-2 text-white hover:text-purple-400" onClick={() => setSelectedImage(null)}><X size={32} /></button>
            <img src={selectedImage} alt="Project" className="w-full h-full object-contain rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
}
