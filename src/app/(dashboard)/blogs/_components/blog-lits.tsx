import prisma from '@/lib/prisma';
import { columns } from '@dashboard/blogs/_components/columns';
import WrapperTable from '@dashboard/blogs/_components/wrapper-table';
import { searchParamsCache } from '@dashboard/blogs/searchParams';
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

  return (
    <WrapperTable columns={columns} data={blogs} totalItems={totalPages} pageSize={pageSize} />
  );
}

export default BlogList;
