import { Skeleton } from '@/components/ui/skeleton';

function TableLoader() {
  return [...Array(6)].map((_, rowIndex) => (
    <div key={`row-${rowIndex}`} className="grid grid-cols-4 border-t p-2.5">
      {[...Array(4)].map((_, colIndex) => (
        <div key={`cell-${rowIndex}-${colIndex}`} className="flex items-center gap-2.5 px-6">
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  ));
}

export default TableLoader;
