import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@dashboard/_components/header';
import Heading from '@dashboard/_components/heading';
import Chat from '@dashboard/chat/_components/chat';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat',
};

function IaPage() {
  return (
    <ScrollArea className="h-full">
      <Header title="Chat" />

      <div className="px-6 py-4">
        <Heading title="Chat" description="Intelligent Assistant" />
        <div className="mx-auto max-w-3xl">
          <Chat />
        </div>
      </div>
    </ScrollArea>
  );
}

export default IaPage;
