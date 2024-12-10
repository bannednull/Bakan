import { Suspense } from 'react';
import {
  DataTable,
  UpsertModal,
  BoxSearch,
  DeleteDialog,
  Preview,
  Tools,
} from '@dashboard/blogs/_components';
import { searchParamsCache } from '@dashboard/blogs/searchParams';
import { SearchParams } from 'nuqs/server';
import { Heading, Header } from '@dashboard/_components';
import { ScrollArea } from '@/components/ui/scroll-area';
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
            <Tools />
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
