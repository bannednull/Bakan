'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { store } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';
import { formatDistanceToNow } from 'date-fns';

export const Preview = () => {
  const { isPreview, data } = store(
    useShallow((state) => ({ isPreview: state.isPreview, data: state.data })),
  );
  const createdAt = data?.createdAt;

  return (
    <Sheet open={isPreview} onOpenChange={() => store.setState({ isPreview: false })}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">{data?.title}</SheetTitle>
          <SheetDescription>
            {createdAt ? formatDistanceToNow(createdAt) : 'Unknown'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">{data?.content}</div>
      </SheetContent>
    </Sheet>
  );
};
