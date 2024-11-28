import { Suspense } from 'react';
import Header from '@dashboard/_components/header';
import BlogList from '@dashboard/blogs/_components/blog-lits';
import UpsertBlog from '@dashboard/blogs/_components/upsert-blog';
import { searchParamsCache } from '@dashboard/blogs/searchParams';
import { SearchParams } from 'nuqs/server';
import Heading from '@dashboard/_components/heading';
import BoxSearch from '@dashboard/blogs/_components/box-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeletePost from '@dashboard/blogs/_components/delete-post';
import PreviewPost from '@dashboard/blogs/_components/preview-post';
import type { Metadata } from 'next';
import TableLoader from '@/components/table-loader';

export const metadata: Metadata = {
  title: 'Blog',
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function BlogPage({ searchParams }: PageProps) {
  searchParamsCache.parse(await searchParams);
  return (
    <ScrollArea className="h-full">
      <Header title="Blog" />

      <div className="py-4">
        <div className="mb-4 flex items-center justify-between gap-4 px-6">
          <Heading title="Blog" description="Manage your blog posts" />

          <div className="flex items-center gap-4">
            <BoxSearch />
            <UpsertBlog />
          </div>
        </div>
        <Suspense fallback={<TableLoader />}>
          <BlogList />
        </Suspense>
      </div>

      <PreviewPost />
      <DeletePost />
    </ScrollArea>
  );
}

export default BlogPage;
