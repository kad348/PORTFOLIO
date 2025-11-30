export type ProjectCategory = 'all' | 'video' | 'graphic';

export interface Project {
  id: number;
  title: string;
  category: 'video' | 'graphic';
  image: string;
  description: string;
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
}