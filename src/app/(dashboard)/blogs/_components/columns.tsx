'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Blog } from '@dashboard/blogs/validate';
import CellAction from '@dashboard/blogs/_components/cell-action';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Blog>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ cell }) => {
      return <div className="line-clamp-1 max-w-[200px]">{cell.getValue() as string}</div>;
    },
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ cell }) => {
      return <div className="line-clamp-2 max-w-[300px]">{cell.getValue() as string}</div>;
    },
  },
  {
    accessorKey: 'published',
    header: 'Published',
    cell: ({ cell }) => {
      const value = cell.getValue() as boolean;
      return (
        <span
          className={cn('rounded-md px-3 py-1', {
            'bg-green-300 text-green-800': value,
            'bg-red-300 text-red-800': !value,
          })}
        >
          {value ? 'Yes' : 'No'}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row: { original } }) => (
      <div className="text-right">
        <CellAction data={original} />
      </div>
    ),
  },
];
