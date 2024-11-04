import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [id] = slug.split('-');

  const blog = await prisma.blog.findUnique({ where: { id: +id } });
  if (!blog) {
    return notFound();
  }

  return (
    <div className="mx-auto mt-14 max-w-screen-sm">
      <img src="/default.jpg" alt={blog.title} className="h-[320px] w-full rounded-lg border" />
      <h1 className="my-2 text-3xl">{blog.title}</h1>

      <div className="py-10">{blog.content}</div>
    </div>
  );
}

export default BlogSlugPage;
