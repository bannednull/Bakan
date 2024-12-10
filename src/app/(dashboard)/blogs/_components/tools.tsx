'use client';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { exportDataAction } from '@dashboard/blogs/actions';
import { toast } from 'sonner';

export const Tools = () => {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      try {
        const result = await exportDataAction();
        if (!result) throw new Error('Something went wrong');
        if (result.data && result.data.success) {
          const blob = new Blob([result.data.csv as string], { type: 'text/csv;charset=utf-8;' });

          const link = document.createElement('a');
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } catch (error: any) {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error('Something went wrong');
      }
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleExport}>
        {isPending ? <Loader2 className="animate-spin" size={14} /> : <FileDown />}
        Export
      </Button>
    </>
  );
};
