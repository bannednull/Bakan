import { getDocsData } from '@/lib/docs';
import Link from 'next/link';

async function DocsLayout({ children }: { children: React.ReactNode }) {
  const allDocsData = await getDocsData();

  return (
    <div className="border-plus grid grid-cols-[220px_1fr] border-t">
      <nav className="flex flex-col gap-3 border-r px-8 py-10">
        <Link href="/docs">Quick Start</Link>
        {allDocsData.map((doc) => (
          <Link href={`/docs/${doc?.id}`} key={doc?.id}>
            {doc?.title}
          </Link>
        ))}
      </nav>
      <div className="px-8 py-10">{children}</div>
    </div>
  );
}

export default DocsLayout;
