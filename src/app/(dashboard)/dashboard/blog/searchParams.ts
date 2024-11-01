import { useQueryState } from 'nuqs';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
};

export const searchParamsCache = createSearchParamsCache(searchParams);

//hooks
export const useFilteredBlogs = () => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );

  return {
    currentPage,
    setCurrentPage,
  };
};
