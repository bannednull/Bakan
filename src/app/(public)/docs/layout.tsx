import { getDocsData } from '@/lib/docs';
import Link from 'next/link';

async function DocsLayout({ children }: { children: React.ReactNode }) {
  const allDocsData = await getDocsData();

  return (
    <div className="grid grid-cols-[220px_1fr]">
      <nav className="flex flex-col gap-3 border-r p-10">
        <Link href="/docs">Quick Start</Link>
        {allDocsData.map((doc) => (
          <Link href={`/docs/${doc?.id}`} key={doc?.id}>
            {doc?.title}
          </Link>
        ))}
      </nav>
      <div className="p-10">{children}</div>
    </div>
  );
}

export default DocsLayout;
