'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { blogStore } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';

function PreviewPost() {
  const { isPreview, blog } = blogStore(
    useShallow((state) => ({ isPreview: state.isPreview, blog: state.blog })),
  );

  return (
    <Sheet open={isPreview} onOpenChange={() => blogStore.setState({ isPreview: false })}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">{blog?.title}</SheetTitle>
          <div>{blog?.content}</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default PreviewPost;
