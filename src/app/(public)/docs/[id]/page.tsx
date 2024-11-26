import { getDocById, getDocsData } from '@/lib/docs';

export async function generateStaticParams() {
  const allDocsData = await getDocsData();
  return allDocsData.map((doc) => ({ id: doc?.id }));
}

async function DocIdPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const doc = await getDocById(id);

  if (!doc) {
    return <p>This page does not exist</p>;
  }

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">{doc.title}</h1>
      <div className="docs space-y-4" dangerouslySetInnerHTML={{ __html: doc.contentHtml }}></div>
    </>
  );
}

export default DocIdPage;
