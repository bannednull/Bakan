import { Skeleton } from '@/components/ui/skeleton';

function TableLoader() {
  return Array.from({ length: 6 }, (_, rowIndex) => (
    <div key={`row-${rowIndex}`} className="grid grid-cols-4 border-t p-2.5">
      {Array.from({ length: 4 }, (_, colIndex) => (
        <div key={`cell-${rowIndex}-${colIndex}`} className="flex items-center gap-2.5 px-6">
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  ));
}

export default TableLoader;
