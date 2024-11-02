'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Blog } from '@dashboard/blog/validate';
import CellAction from '@dashboard/blog/_components/cell-action';

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
  },
  {
    accessorKey: 'content',
    header: 'Content',
  },
  {
    accessorKey: 'published',
    header: 'Published',
    cell: ({ cell }) => {
      return cell.getValue() ? 'Yes' : 'No';
    },
  },
  {
    id: 'actions',
    cell: ({ row: { original } }) => <CellAction data={original} />,
  },
];
