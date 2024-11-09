import usePage from '@/lib/hooks/use-page-param';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
};

export const searchParamsCache = createSearchParamsCache(searchParams);

//hooks
export const useFilteredCustomer = () => {
  const { currentPage, setCurrentPage } = usePage();

  return {
    currentPage,
    setCurrentPage,
  };
};
