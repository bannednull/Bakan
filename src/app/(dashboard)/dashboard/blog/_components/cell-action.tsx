'use client';

import { EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Blog } from '@dashboard/blog/validate';
import { blogStore } from '@/lib/store/blog';

type PropsActions = {
  data: Blog;
};

function CellAction({ data }: PropsActions) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-6" variant="outline">
          <EllipsisVertical className="size-4" strokeWidth={1} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => blogStore.setState({ blog: data })}>
          <Eye strokeWidth={1} /> Preview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => blogStore.setState({ id: data.id })}>
          <Pencil strokeWidth={1} /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => blogStore.setState({ id: data.id, isRemove: true })}>
          <Trash strokeWidth={1} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CellAction;
