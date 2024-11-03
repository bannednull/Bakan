'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import FormBlog from '@dashboard/blog/_components/form-blog';

function CreateBlog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Plus className="size-4" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>Fill in the details to create your post</DialogDescription>
        </DialogHeader>

        <FormBlog close={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateBlog;
