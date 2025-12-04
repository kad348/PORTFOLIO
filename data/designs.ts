import { Project } from '../types';

// Using direct raw links from GitHub/CDN as requested
export const designProjects: Project[] = [
  {
    id: 5,
    title: 'Sweet Freeze Campaign',
    category: 'graphic',
    // Using the raw GitHub user content link format for reliability
    image: 'https://raw.githubusercontent.com/kad348/Work/main/sweet-freeze.jpg',
    description: 'Vibrant event poster design for ICBT Campus ice cream stall featuring custom typography.',
  },
  {
    id: 6,
    title: 'SparePoint Product Ad',
    category: 'graphic',
    image: 'https://raw.githubusercontent.com/kad348/Work/main/sparepoint.jpg',
    description: 'Professional product advertisement for Nissan X-Trail automotive parts.',
  },
  {
    id: 7,
    title: 'Hotel Seetha Flyer',
    category: 'graphic',
    image: 'https://raw.githubusercontent.com/kad348/Work/main/hotel-flyer.jpg',
    description: 'Elegant flyer design showcasing hotel features, services, and seasonal offers.',
  },
  {
    id: 8,
    title: 'Lewis Hamilton Poster',
    category: 'graphic',
    image: 'https://raw.githubusercontent.com/kad348/Work/blob/main/f1.png',
    description: 'F1 Poster for Reasons Podcast.',
  },
];
