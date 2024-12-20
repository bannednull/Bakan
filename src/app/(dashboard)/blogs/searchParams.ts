import usePage from '@/lib/hooks/use-page-param';
import { useQueryState } from 'nuqs';
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(''),
};

export const searchParamsCache = createSearchParamsCache(searchParams);

//hooks
export const useFiltered = () => {
  const { isLoading, currentPage, setCurrentPage } = usePage();

  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(''),
  );

  return {
    isLoading,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  };
};
