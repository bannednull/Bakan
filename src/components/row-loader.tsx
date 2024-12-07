import { Skeleton } from '@/components/ui/skeleton';

function RowLoader({ size }: { size: number }) {
  return Array.from({ length: 4 }, (_, rowIndex) => (
    <tr key={`row-${rowIndex}`}>
      {Array.from({ length: size }, (_, colIndex) => (
        <td className="border-y p-2.5" key={`cell-${rowIndex}-${colIndex}`}>
          <Skeleton className="h-6" />
        </td>
      ))}
    </tr>
  ));
}

export default RowLoader;
