import { Suspense } from 'react';
import Header from '@dashboard/_components/header';
import DataTable from '@dashboard/blogs/_components/data-table';
import UpsertModal from '@dashboard/blogs/_components/upsert-modal';
import { searchParamsCache } from '@dashboard/blogs/searchParams';
import { SearchParams } from 'nuqs/server';
import Heading from '@dashboard/_components/heading';
import BoxSearch from '@dashboard/blogs/_components/box-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteDialog from '@dashboard/blogs/_components/delete-dialog';
import Preview from '@dashboard/blogs/_components/preview';
import type { Metadata } from 'next';
import TableLoader from '@/components/table-loader';

export const metadata: Metadata = {
  title: 'Blog',
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  searchParamsCache.parse(await searchParams);
  return (
    <ScrollArea className="h-full">
      <Header title="Blog" />

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <Heading title="Blog" description="Manage your blog posts" />

          <div className="flex items-center gap-4">
            <BoxSearch />
            <UpsertModal />
          </div>
        </div>
        <Suspense fallback={<TableLoader />}>
          <DataTable />
        </Suspense>
      </div>

      <Preview />
      <DeleteDialog />
    </ScrollArea>
  );
}

export default Page;
