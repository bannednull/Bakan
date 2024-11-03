import { Blog } from '@dashboard/blog/validate';
import { create } from 'zustand';

interface BlogState {
  id: number | null;
  blog: Blog | null;
  isRemove: boolean;
}

interface BlogActions {}

type BlogStore = BlogState & BlogActions;

const initialState: BlogState = {
  id: null,
  blog: null,
  isRemove: false,
};

export const blogStore = create<BlogStore>()(() => ({
  ...initialState,
}));
