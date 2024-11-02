import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/app/(dashboard)/_components/header';
import { Suspense } from 'react';
import BlogList from './_components/blog-lits';
import CreateBlog from './_components/create-blog';
import { searchParamsCache } from './searchParams';
import { SearchParams } from 'nuqs/server';
import BoxSearch from './_components/box-search';
import Heading from '../../_components/heading';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function BlogPage({ searchParams }: PageProps) {
  searchParamsCache.parse(await searchParams);
  return (
    <ScrollArea className="h-full">
      <Header title="Blog" />

      <div className="px-8 py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Heading title="Blog" description="Manage your blog posts" />

          <div className="flex items-center gap-4">
            <BoxSearch />
            <CreateBlog />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogList />
        </Suspense>
      </div>
    </ScrollArea>
  );
}

export default BlogPage;
