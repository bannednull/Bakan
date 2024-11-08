import { useQueryState } from 'nuqs';
import { parseAsInteger } from 'nuqs/server';

function usePage() {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );

  return {
    currentPage,
    setCurrentPage,
  };
}

export default usePage;
