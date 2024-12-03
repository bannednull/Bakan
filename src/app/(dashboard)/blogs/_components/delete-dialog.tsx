'use client';

import { store } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAction } from 'next-safe-action/hooks';
import { deleteAction } from '@dashboard/blogs/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

function DeleteDialog() {
  const { id, isRemove } = store(
    useShallow((state) => ({ id: state.id, isRemove: state.isRemove })),
  );

  const { executeAsync, isPending } = useAction(deleteAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        return;
      }
      handleClose();
      toast.success('Remove post');
    },
  });

  const handleClose = () => {
    store.setState({ isRemove: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    executeAsync({ id: +id });
  };

  return (
    <Dialog open={isRemove} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>Are you sure you want to delete this post</DialogDescription>

          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form onSubmit={handleSubmit}>
              {id && <input type="hidden" name="id" value={id} />}
              <Button variant="destructive">
                {isPending && <Loader className="animate-spin" />} Confirm
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
