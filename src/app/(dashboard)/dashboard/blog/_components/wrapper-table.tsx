'use client';

import { DataTable } from '@/components/data-table';
import { useFilteredBlogs } from '@dashboard/blog/searchParams';
import { ColumnDef } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems: number;
  pageSize: number;
}

function WrapperTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, totalItems, pageSize } = props;
  const { isLoading, currentPage, setCurrentPage } = useFilteredBlogs();

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default WrapperTable;
