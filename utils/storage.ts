
import { Post, BlogCategory, User } from '../types';

const POSTS_KEY = 'lumina_blog_posts';
const USERS_KEY = 'lumina_blog_users';
const CURRENT_USER_KEY = 'lumina_current_user';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Generative AI in Creative Writing',
    excerpt: 'Explore how large language models are reshaping the way we tell stories and create content in 2024 and beyond.',
    content: 'Generative AI is not just a tool; it is a collaborator. As we move further into the digital age, the line between human creativity and machine intelligence becomes increasingly blurred...\n\n### The Shift in Narrative\nContent creation is undergoing a paradigm shift. Writers are now leveraging LLMs to brainstorm, outline, and even refine their prose. This synergy allows for faster iterations and the exploration of diverse creative paths that were previously time-prohibitive.',
    author: 'Prashant Jha',
    authorId: 'admin-1',
    authorSocials: {
      email: 'pkjhaprashantjha@gmail.com',
      linkedin: 'prashant-jha-a18834378',
      twitter: 'Prashan00369179'
    },
    date: 'Oct 24, 2024',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    category: BlogCategory.AI,
    readTime: '6 min read',
    tags: ['AI', 'Writing', 'Creativity'],
    seoKeywords: ['Generative AI', 'Future of Writing', 'AI Content Tools']
  }
];

// POSTS
export const getPosts = (): Post[] => {
  const stored = localStorage.getItem(POSTS_KEY);
  if (!stored) {
    savePosts(INITIAL_POSTS);
    return INITIAL_POSTS;
  }
  return JSON.parse(stored);
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const addPost = (post: Post) => {
  const posts = getPosts();
  savePosts([post, ...posts]);
};

export const removePost = (id: string) => {
  const posts = getPosts();
  const updated = posts.filter(p => p.id !== id);
  savePosts(updated);
};

// USERS
export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [
    { id: 'admin-1', name: 'Prashant Jha', email: 'admin@prahant.com', role: 'admin', password: 'admin' }
  ];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
