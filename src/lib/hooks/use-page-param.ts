'use client';

import { searchParams } from '@dashboard/blogs/searchParams';
import { useQueryState } from 'nuqs';
import { useTransition } from 'react';

function usePage() {
  const [isLoading, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    searchParams.page.withOptions({ startTransition, shallow: false }).withDefault(1),
  );

  return {
    isLoading,
    currentPage,
    setCurrentPage,
  };
}

export default usePage;
