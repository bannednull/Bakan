import { Blog } from '@dashboard/blogs/validate';
import { create } from 'zustand';

interface State {
  id: number | null;
  data: Blog | null;
  isRemove: boolean;
  isPreview: boolean;
  isEdit: boolean;
  isOpen: boolean;
}

interface Actions {}

type Store = State & Actions;

const initialState: State = {
  id: null,
  data: null,
  isRemove: false,
  isPreview: false,
  isEdit: false,
  isOpen: false,
};

export const store = create<Store>()(() => ({
  ...initialState,
}));
