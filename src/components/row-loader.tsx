import { Skeleton } from '@/components/ui/skeleton';

function RowLoader({ size }: { size: number }) {
  return [...Array(4)].map((_, rowIndex) => (
    <tr key={`row-${rowIndex}`}>
      {[...Array(size)].map((_, colIndex) => (
        <td className="border-y p-2.5" key={`cell-${rowIndex}-${colIndex}`}>
          <Skeleton className="h-6" />
        </td>
      ))}
    </tr>
  ));
}

export default RowLoader;
