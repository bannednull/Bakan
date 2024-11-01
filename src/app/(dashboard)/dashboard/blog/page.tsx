import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/app/(dashboard)/_components/header';

function BlogPage() {
  return (
    <ScrollArea className="h-full">
      <Header title="Blog" />

      <div className="px-6 py-4"></div>
    </ScrollArea>
  );
}

export default BlogPage;
