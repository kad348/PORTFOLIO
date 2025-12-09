import React, { useState, useEffect } from 'react';
import { ProjectCategory, Project } from '../types';
import { Play, Eye, ExternalLink, X, ImageOff, Maximize2 } from 'lucide-react';
import { videoProjects } from '../data/videos';
import { designProjects } from '../data/designs';
import WorkLoop from './WorkLoop';

// Combine the data sources
const projects: Project[] = [...videoProjects, ...designProjects];

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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo, selectedImage]);

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  // Split filtered projects by category
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
    // Handle Video Clicks
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
        const lowerLink = project.link.toLowerCase();
        const isShort = lowerLink.includes('short') || lowerLink.includes('vertical') || lowerLink.includes('tiktok');
        setSelectedVideo({ src: project.link, type: 'local', isShort });
      }
    } 
    // Handle Graphic Clicks (Open Lightbox)
    else if (project.category === 'graphic') {
      e.preventDefault();
      setSelectedImage(project.image);
    }
  };

  // Image component with Smart Quality Fallback
  const ProjectImage = ({ project, aspectRatioClass, objectPosClass }: { project: Project, aspectRatioClass: string, objectPosClass: string }) => {
    let initialSrc = project.image;
    // Attempt to load MQ thumb for videos immediately
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
                newSrc = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            }
        }
        setImgSrc(newSrc);
        setHasError(false);
    }, [project]);
    
    const handleError = () => {
      if (hasError) return;
      
      // Video Thumbnail Fallbacks
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
      
      // Graphic Design Fallbacks (Unsplash)
      if (project.category === 'graphic' && !project.image.startsWith('http')) {
          const t = project.title.toLowerCase();
          let fallback = `https://placehold.co/600x800/1a1a1a/ffffff?text=${encodeURIComponent(project.title)}`;
          if (t.includes('sweet') || t.includes('freeze')) fallback = 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('spare') || t.includes('auto')) fallback = 'https://images.unsplash.com/photo-1486262715619-01b8c2297602?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('hotel')) fallback = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600';
          else if (t.includes('lewis') || t.includes('f1') || t.includes('poster')) fallback = 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=600';
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
    // Treat project as clickable if it has a link OR is a graphic (for lightbox)
    const isClickable = !!project.link || project.category === 'graphic';
    const Component = project.link ? 'a' : 'div';
    
    const props = project.link ? {
      href: project.link,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: (e: React.MouseEvent) => handleProjectClick(e, project)
    } : {
      onClick: (e: React.MouseEvent) => handleProjectClick(e, project)
    };

    const isVideo = project.category === 'video';
    
    // RESPONSIVE Video Width: smaller on mobile, larger on desktop
    const cardWidthClass = isVideo ? 'w-[200px] sm:w-[240px]' : 'w-[260px] sm:w-[320px]'; 
    const aspectRatioClass = isVideo ? 'aspect-[9/16]' : 'aspect-square';
    const objectPosClass = !isVideo ? 'object-top' : 'object-center';

    return (
      <Component
        {...props}
        className={`block group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col ${cardWidthClass} flex-shrink-0 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
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
                <Maximize2 size={24} />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] sm:text-xs font-semibold text-purple-400 uppercase tracking-wider">
              {project.category}
            </span>
            {project.link && <ExternalLink size={14} className="text-gray-500 hover:text-white" />}
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </Component>
    );
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-gray-400">A curation of my best edits and designs.</p>
          </div>
          
          <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 overflow-x-auto max-w-full">
            {(['all', 'video', 'graphic'] as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full ${selectedVideo.isShort ? 'max-w-[90vw] aspect-[9/16] max-h-[85vh]' : 'max-w-5xl aspect-video max-h-[80vh] md:max-h-full'}`}
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
                src={`https://www.youtube.com/embed/${selectedVideo.src}?rel=0&modestbranding=1`}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                key={selectedVideo.src}
                src={selectedVideo.src} 
                className="w-full h-full object-contain bg-black"
                controls
                playsInline
                loop
              />
            )}
          </div>
        </div>
      )}

      {/* Image Modal (Lightbox) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-screen p-2 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-20 p-2 text-white bg-black/50 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full screen view" 
              className="max-h-[90vh] max-w-full w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}