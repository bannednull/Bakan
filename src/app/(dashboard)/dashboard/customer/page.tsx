import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@dashboard/_components/header';
import Heading from '@dashboard/_components/heading';

function CustomerPage() {
  return (
    <ScrollArea className="h-full">
      <Header title="Customers" />

      <div className="px-8 py-4">
        <Heading title="Customers" description="Manage your customers" />
      </div>
    </ScrollArea>
  );
}

export default CustomerPage;
