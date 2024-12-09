import prisma from '@/lib/prisma';
import { columns } from '@dashboard/customer/_components/columns';
import WrapperTable from '@dashboard/customer/_components/wrapper-table';
import { searchParamsCache } from '@dashboard/customer/searchParams';

export const DataTable = async () => {
  const pageSize = 10;
  const page = searchParamsCache.get('page');
  const skip = (page - 1) * pageSize;

  const [customers, totalPages] = await prisma.$transaction([
    prisma.subscription.findMany({
      select: {
        id: true,
        plan: true,
        period: true,
        endDate: true,
        createdAt: true,
        User: {
          select: { email: true },
        },
      },
      skip,
      take: pageSize,
    }),
    prisma.subscription.count(),
  ]);

  return (
    <WrapperTable columns={columns} data={customers} totalItems={totalPages} pageSize={pageSize} />
  );
};
