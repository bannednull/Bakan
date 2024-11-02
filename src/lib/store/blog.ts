import { Blog } from '@dashboard/blog/validate';
import { create } from 'zustand';

interface BlogState {
  id: number | null;
  blog: Blog | null;
}

interface BlogActions {}

type BlogStore = BlogState & BlogActions;

const initialState: BlogState = {
  id: null,
  blog: null,
};

export const blogStore = create<BlogStore>()(() => ({
  ...initialState,
}));
