import TableLoader from '@/components/table-loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { auth } from '@/lib/auth';
import { getUser } from '@/lib/auth/session';
import { Header, Heading } from '@dashboard/_components';
import { DataTable } from '@dashboard/customer/_components/';
import { searchParamsCache } from '@dashboard/customer/searchParams';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function CustomerPage({ searchParams }: PageProps) {
  searchParamsCache.parse(await searchParams);

  const user = await getUser();

  if (user?.role !== 'admin') {
    return redirect('/dashboard');
  }

  return (
    <ScrollArea className="h-full">
      <Header title="Customers" />

      <div className="space-y-4 p-6">
        <Heading title="Customers" description="Manage your customers" />

        <Suspense fallback={<TableLoader />}>
          <DataTable />
        </Suspense>
      </div>
    </ScrollArea>
  );
}

export default CustomerPage;
