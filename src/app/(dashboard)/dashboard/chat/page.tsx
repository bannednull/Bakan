import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@dashboard/_components/header';
import Heading from '@dashboard/_components/heading';

function IaPage() {
  return (
    <ScrollArea className="h-full">
      <Header />

      <div className="px-8 py-4">
        <Heading title="Chat" description="Intelligent Assistant" />
      </div>
    </ScrollArea>
  );
}

export default IaPage;
