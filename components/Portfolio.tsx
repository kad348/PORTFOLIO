import React, { useState, useEffect } from 'react';
import { ProjectCategory, Project } from '../types';
import { Play, Eye, ExternalLink, X, Download } from 'lucide-react';
import { videoProjects } from '../data/videos';
import { designProjects } from '../data/designs';

// Combine the data sources
const projects: Project[] = [...videoProjects, ...designProjects];

export default function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; type: 'youtube' | 'local'; isShort: boolean } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const getYouTubeInfo = (url: string) => {
    let id = '';
    const isShort = url.includes('/shorts/');
    
    try {
      if (isShort) {
        id = url.split('/shorts/')[1].split('?')[0];
      } else if (url.includes('v=')) {
        id = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split('?')[0];
      }
    } catch (e) {
      console.error('Error parsing YouTube URL', e);
    }
    
    return { id, isShort };
  };

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    if (project.category === 'video' && project.link) {
      // Handle YouTube Links
      if (project.link.includes('youtube') || project.link.includes('youtu.be')) {
        e.preventDefault();
        const { id, isShort } = getYouTubeInfo(project.link);
        if (id) {
          setSelectedVideo({ src: id, type: 'youtube', isShort });
        }
      } 
      // Handle Local Video Files
      else if (project.link.endsWith('.mp4') || project.link.endsWith('.webm') || project.link.startsWith('/videos/')) {
        e.preventDefault();
        // Assume vertical if 'short' or 'vertical' is in the filename, otherwise default to landscape
        const isShort = project.link.toLowerCase().includes('short') || project.link.toLowerCase().includes('vertical');
        setSelectedVideo({ src: project.link, type: 'local', isShort });
      }
    }
    // For graphics (rar files), let the default anchor tag behavior handle the download
  };

  // Simple fallback: if image fails, show a placeholder with the text
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://placehold.co/600x800/1a1a1a/ffffff?text=${encodeURIComponent(title)}`;
  };

  return (
    <section id="portfolio" className="py-24 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-gray-400">A curation of my best edits and designs.</p>
          </div>
          
          <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
            {(['all', 'video', 'graphic'] as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isLink = !!project.link;
            const Component = isLink ? 'a' : 'div';
            const props = isLink ? {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: (e: React.MouseEvent) => handleProjectClick(e, project)
            } : {};

            // Use taller aspect ratio for graphics to prevent cropping of flyers/posters
            const aspectRatioClass = project.category === 'video' ? 'aspect-video' : 'aspect-[4/5]';
            
            // Check if link is a download (rar/zip)
            const isDownload = project.link?.endsWith('.rar') || project.link?.endsWith('.zip');

            return (
              <Component
                key={project.id}
                {...props}
                className={`group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`${aspectRatioClass} w-full overflow-hidden relative bg-gray-900`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => handleImageError(e, project.title)}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.category === 'video' ? (
                      <div className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                        <Play size={24} className="ml-1" />
                      </div>
                    ) : (
                      <div className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                        <Eye size={24} />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.link && (
                      isDownload 
                        ? <Download size={16} className="text-gray-500 hover:text-white" />
                        : <ExternalLink size={16} className="text-gray-500 hover:text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Component>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full ${selectedVideo.isShort ? 'max-w-md aspect-[9/16] max-h-[85vh]' : 'max-w-5xl aspect-video'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            {selectedVideo.type === 'youtube' ? (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.src}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={selectedVideo.src} 
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}