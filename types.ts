
export interface Source {
  uri: string;
  title: string;
}

export interface AuthorSocials {
  linkedin?: string;
  twitter?: string;
  facebook?: string; // Kept for type compatibility but removed from UI
  instagram?: string;
  email?: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Only for local demo storage
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string; // Linked to User.id
  authorSocials?: AuthorSocials;
  date: string;
  coverImage: string;
  category: string;
  readTime: string;
  tags: string[];
  seoKeywords: string[];
  sources?: Source[];
}

export enum BlogCategory {
  TECH = 'Technology',
  LIFESTYLE = 'Lifestyle',
  AI = 'Artificial Intelligence',
  DESIGN = 'Design',
  TRAVEL = 'Travel',
  BUSINESS = 'Business'
}
