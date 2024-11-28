'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { blogStore } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';
import { formatDistanceToNow } from 'date-fns';

function PreviewPost() {
  const { isPreview, blog } = blogStore(
    useShallow((state) => ({ isPreview: state.isPreview, blog: state.blog })),
  );
  const createdAt = blog?.createdAt;

  return (
    <Sheet open={isPreview} onOpenChange={() => blogStore.setState({ isPreview: false })}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">{blog?.title}</SheetTitle>
          <SheetDescription>
            {createdAt ? formatDistanceToNow(createdAt) : 'Unknown'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">{blog?.content}</div>
      </SheetContent>
    </Sheet>
  );
}

export default PreviewPost;
