'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import FormBlog from '@dashboard/blog/_components/form-blog';
import { blogStore } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';

function UpsertBlog() {
  const { isEdit, isOpen } = blogStore(
    useShallow((state) => ({ isEdit: state.isEdit, isOpen: state.isOpen })),
  );

  const handleOpen = () => {
    blogStore.setState({ isEdit: false, isOpen: true });
  };

  const handleClose = (open: boolean) => {
    blogStore.setState({ isOpen: open, isEdit: false });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={handleOpen}>
          <PlusCircle className="size-4" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit post' : 'Create post'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the details of your post' : 'Fill in the details to create your post'}
          </DialogDescription>
        </DialogHeader>

        <FormBlog close={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default UpsertBlog;
