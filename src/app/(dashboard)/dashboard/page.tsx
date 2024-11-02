import Header from '@dashboard/_components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import Heading from '@dashboard/_components/heading';

function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <Header />

      <div className="px-8 py-4">
        <Heading title="Dashboard" description="Welcome to your dashboard" />
      </div>
    </ScrollArea>
  );
}

export default DashboardPage;
