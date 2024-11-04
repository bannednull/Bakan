import { Suspense } from 'react';
import Header from '@dashboard/_components/header';
import BlogList from '@dashboard/blog/_components/blog-lits';
import UpsertBlog from '@dashboard/blog/_components/upsert-blog';
import { searchParamsCache } from '@dashboard/blog/searchParams';
import { SearchParams } from 'nuqs/server';
import Heading from '@dashboard/_components/heading';
import BoxSearch from '@dashboard/blog/_components/box-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeletePost from '@dashboard/blog/_components/delete-post';
import PreviewPost from '@dashboard/blog/_components/preview-post';

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
        <Suspense fallback={<div>Loading...</div>}>
          <BlogList />
        </Suspense>
      </div>

      <PreviewPost />
      <DeletePost />
    </ScrollArea>
  );
}

export default BlogPage;
