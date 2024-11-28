'use client';

import { ColumnDef } from '@tanstack/react-table';
import plans from '@/../pricing.json';
import { formatAmount } from '@/lib/utils';

interface Customers {
  User: {
    email: string | null;
  };
  id: number;
  plan: string | null;
  period: 'month' | 'year';
  endDate: Date;
  createdAt: Date;
}

const filterPlan = (id: string) => {
  const plan = plans.filter((plan) => plan.price.monthly.id === id || plan.price.yearly.id === id);
  return plan[0];
};

export const columns: ColumnDef<Customers>[] = [
  {
    id: 'plan',
    header: 'Product',
    cell: ({ row: { original } }) => {
      const plan = filterPlan(original.plan!);
      return plan ? plan.name : '';
    },
  },
  {
    id: 'amount',
    header: 'Amount',
    cell: ({ row: { original } }) => {
      const plan = filterPlan(original.plan!);
      return plan ? formatAmount(String(plan.price.monthly.value)) : '';
    },
  },
  {
    accessorKey: 'User.email',
    header: 'Email Address',
  },
];
