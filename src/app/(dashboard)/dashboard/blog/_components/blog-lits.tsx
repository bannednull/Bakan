import { prisma } from '@/lib/prisma';
import { columns } from './columns';
import { DataTable } from './data-table';
import { searchParamsCache } from '../searchParams';
import { Prisma } from '@prisma/client';

async function BlogList() {
  const pageSize = 10;
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');

  const skip = (page - 1) * pageSize;

  const whereCondition = search
    ? {
        title: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};

  const [blogs, totalPages] = await prisma.$transaction([
    prisma.blog.findMany({
      skip,
      take: pageSize,
      where: whereCondition,
    }),
    prisma.blog.count({ where: whereCondition }),
  ]);

  return <DataTable columns={columns} data={blogs} totalItems={totalPages} pageSize={pageSize} />;
}

export default BlogList;
