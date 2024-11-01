import { prisma } from '@/lib/prisma';
import { columns } from './columns';
import { DataTable } from './data-table';
import { searchParamsCache } from '../searchParams';

async function BlogList() {
  const pageSize = 10;
  const page = searchParamsCache.get('page');

  const skip = (page - 1) * pageSize;

  const [blogs, totalPages] = await prisma.$transaction([
    prisma.blog.findMany({
      skip,
      take: pageSize,
    }),
    prisma.blog.count(),
  ]);

  return <DataTable columns={columns} data={blogs} totalItems={totalPages} pageSize={pageSize} />;
}

export default BlogList;
