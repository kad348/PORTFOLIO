import React, { useState, useEffect } from 'react';
import { ProjectCategory, Project } from '../types';
import { Play, Eye, ExternalLink, X, ImageOff } from 'lucide-react';
import { videoProjects } from '../data/videos';
import { designProjects } from '../data/designs';
import WorkLoop from './WorkLoop';

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

  // Split filtered projects by category for the specific layout request
  const videoRow = filteredProjects.filter(p => p.category === 'video');
  const graphicRow = filteredProjects.filter(p => p.category === 'graphic');

  const getYouTubeInfo = (url: string) => {
    let id = '';
    const isShort = url.includes('/shorts/');
    
    try {
      if (isShort) {
        const parts = url.split('/shorts/');
        if (parts.length > 1) {
            id = parts[1].split('?')[0].split('&')[0].split('/')[0];
        }
      } else if (url.includes('v=')) {
        id = url.split('v=')[1].split('&')[0].split('?')[0];
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
      if (project.link.includes('youtube') || project.link.includes('youtu.be')) {
        e.preventDefault();
        const { id, isShort } = getYouTubeInfo(project.link);
        if (id) {
          setSelectedVideo({ src: id, type: 'youtube', isShort });
        }
      } 
      else if (project.link.endsWith('.mp4') || project.link.endsWith('.webm') || project.link.startsWith('/videos/')) {
        e.preventDefault();
        const isShort = project.link.toLowerCase().includes('short') || project.link.toLowerCase().includes('vertical');
        setSelectedVideo({ src: project.link, type: 'local', isShort });
      }
    }
  };

  // Image component with Smart Quality Fallback
  const ProjectImage = ({ project, aspectRatioClass, objectPosClass }: { project: Project, aspectRatioClass: string, objectPosClass: string }) => {
    // Try to start with MQ default for youtube as it is safer
    let initialSrc = project.image;
    if (project.category === 'video' && project.link && (project.link.includes('youtube') || project.link.includes('youtu.be'))) {
         const { id } = getYouTubeInfo(project.link);
         if (id) initialSrc = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }

    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let newSrc = project.image;
        if (project.category === 'video' && project.link && (project.link.includes('youtube') || project.link.includes('youtu.be'))) {
            const { id } = getYouTubeInfo(project.link);
            if (id) {
                // First try maxres
                newSrc = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            }
        }
        setImgSrc(newSrc);
        setHasError(false);
    }, [project]);
    
    const handleError = () => {
      if (hasError) return;
      
      // If maxres failed, try hq, then mq
      if (imgSrc.includes('maxresdefault')) {
          setImgSrc(imgSrc.replace('maxresdefault', 'hqdefault'));
          return;
      }
      if (imgSrc.includes('hqdefault')) {
          setImgSrc(imgSrc.replace('hqdefault', 'mqdefault'));
          return;
      }

      setHasError(true);
      console.warn(`Failed to load image: ${imgSrc}`);
      
      if (project.category === 'graphic') {
          // Unsplash Fallbacks for graphics
          const t = project.title.toLowerCase();
          let fallback = `https://placehold.co/600x800/1a1a1a/ffffff?text=${encodeURIComponent(project.title)}`;
          if (t.includes('sweet') || t.includes('freeze')) fallback = 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('spare') || t.includes('auto')) fallback = 'https://images.unsplash.com/photo-1486262715619-01b8c2297602?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('hotel')) fallback = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('lewis') || t.includes('f1')) fallback = 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=600';
          setImgSrc(fallback);
      } else {
          setImgSrc(`https://placehold.co/600x800/1a1a1a/ffffff?text=${encodeURIComponent(project.title)}`);
      }
    };

    return (
      <img
        src={imgSrc}
        alt={project.title}
        className={`w-full h-full object-cover ${objectPosClass} transition-transform duration-700 group-hover:scale-110`}
        onError={handleError}
        loading="lazy"
      />
    );
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const isLink = !!project.link;
    const Component = isLink ? 'a' : 'div';
    const props = isLink ? {
      href: project.link,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: (e: React.MouseEvent) => handleProjectClick(e, project)
    } : {};

    const isVideo = project.category === 'video';
    
    // SPECIFIC SIZES REQUESTED
    // Videos: YouTube Short size (Vertical 9:16). Width 280px is good for mobile/desktop balance.
    // Graphics: Square (1:1). Width 320px for good visibility.
    const cardWidthClass = isVideo ? 'w-[280px]' : 'w-[320px]'; 
    const aspectRatioClass = isVideo ? 'aspect-[9/16]' : 'aspect-square';
    const objectPosClass = !isVideo ? 'object-top' : 'object-center';

    return (
      <Component
        {...props}
        className={`block group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col ${cardWidthClass} flex-shrink-0 ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className={`${aspectRatioClass} w-full overflow-hidden relative bg-gray-900`}>
          <ProjectImage 
            project={project} 
            aspectRatioClass={aspectRatioClass} 
            objectPosClass={objectPosClass} 
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
            {project.link && <ExternalLink size={16} className="text-gray-500 hover:text-white" />}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </Component>
    );
  };

  return (
    <section id="portfolio" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
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
      </div>

      <div className="w-full flex flex-col gap-12">
        {filteredProjects.length > 0 ? (
          <>
            {/* Row 1 - Videos Only - Left Direction */}
            {videoRow.length > 0 && (
              <WorkLoop direction="left" speed="normal">
                {videoRow.map((project) => <ProjectCard key={project.id} project={project} />)}
              </WorkLoop>
            )}
            
            {/* Row 2 - Graphics Only - Right Direction */}
            {graphicRow.length > 0 && (
              <WorkLoop direction="right" speed="normal">
                {graphicRow.map((project) => <ProjectCard key={project.id} project={project} />)}
              </WorkLoop>
            )}
          </>
        ) : (
          <div className="container mx-auto px-6 text-center text-gray-500 py-12">
            No projects found in this category.
          </div>
        )}
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