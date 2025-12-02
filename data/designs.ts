import { Project } from '../types';

// Ensure these paths match the location of your uploaded images
// If your images are in a folder named 'images' at the root of your project, these paths are correct.
export const designProjects: Project[] = [
  {
    id: 5,
    title: 'Sweet Freeze Campaign',
    category: 'graphic',
    image: '/images/sweet-freeze.jpg',
    description: 'Vibrant event poster design for ICBT Campus ice cream stall featuring custom typography.',
    link: '/images.rar'
  },
  {
    id: 6,
    title: 'SparePoint Product Ad',
    category: 'graphic',
    image: '/images/NISSAN_X_2.png',
    description: 'Professional product advertisement for Nissan X-Trail automotive parts.',
    link: '/images.rar'
  },
  {
    id: 7,
    title: 'Hotel Seetha Flyer',
    category: 'graphic',
    image: '/images/hotel-flyer.jpg',
    description: 'Elegant flyer design showcasing hotel features, services, and seasonal offers.',
    link: '/images.rar'
  },
  {
    id: 7,
    title: 'Lewis Hamilton Poster',
    category: 'graphic',
    image: '/images/f1.png',
    description: 'F1 Poster for Reasons Podcast.',
    link: '/images.rar'
  },
];