import Header from '@/app/(dashboard)/_components/header';
import { ScrollArea } from '@/components/ui/scroll-area';

function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <Header />

      <div className="px-6 py-4"></div>
    </ScrollArea>
  );
}

export default DashboardPage;
