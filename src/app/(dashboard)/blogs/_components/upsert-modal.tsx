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
import FormData from '@dashboard/blogs/_components/form-data';
import { store } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';

function UpsertModal() {
  const { isEdit, isOpen } = store(
    useShallow((state) => ({ isEdit: state.isEdit, isOpen: state.isOpen })),
  );

  const handleOpen = () => {
    store.setState({ isEdit: false, isOpen: true });
  };

  const handleClose = (open: boolean) => {
    store.setState({ isOpen: open, isEdit: false });
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

        <FormData close={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default UpsertModal;
