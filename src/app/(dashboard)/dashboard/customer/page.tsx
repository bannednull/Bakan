import TableLoader from '@/components/table-loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { auth } from '@/lib/auth';
import Header from '@dashboard/_components/header';
import Heading from '@dashboard/_components/heading';
import CustomerList from '@dashboard/customer/_components/customer-list';
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
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return redirect('/dashboard');
  }

  searchParamsCache.parse(await searchParams);
  return (
    <ScrollArea className="h-full">
      <Header title="Customers" />

      <div className="px-6 py-4">
        <Heading title="Customers" description="Manage your customers" />
      </div>

      <Suspense fallback={<TableLoader />}>
        <CustomerList />
      </Suspense>
    </ScrollArea>
  );
}

export default CustomerPage;
