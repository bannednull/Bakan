import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@dashboard/_components/header';
import Heading from '@dashboard/_components/heading';
import CustomerList from '@dashboard/customer/_components/customer-list';
import { searchParamsCache } from '@dashboard/customer/searchParams';
import type { Metadata } from 'next';
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
  return (
    <ScrollArea className="h-full">
      <Header title="Customers" />

      <div className="px-6 py-4">
        <Heading title="Customers" description="Manage your customers" />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CustomerList />
      </Suspense>
    </ScrollArea>
  );
}

export default CustomerPage;
