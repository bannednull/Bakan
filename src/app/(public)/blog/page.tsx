import ScrollAnimate from '@/app/_components/scroll-animate';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog',
};

async function PublicBlogPage() {
  const blogs = await prisma.blog.findMany({
    where: {
      User: {
        role: 'admin',
      },
    },
    include: {
      User: { select: { role: true } },
    },
  });

  return (
    <>
      <div className="border-plus border-t p-10 py-6">
        <div className="space-y-2 rounded-xl bg-accent/30 p-10">
          <h1 className="text-4xl">Blog</h1>
          <h2 className="text-xl text-muted-foreground">
            Explore our latest news, announcements, and articles.
          </h2>
        </div>
      </div>

      <div className="border-plus grid grid-cols-1 gap-8 border-t p-16 py-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <ScrollAnimate key={blog.id}>
            <Link className="hover:underline" href={`/blog/${blog.id}-${createSlug(blog.title)}`}>
              <img
                src="/default.jpg"
                alt={blog.title}
                className="h-[180px] w-full rounded-lg border"
              />
              <h3 className="my-2 text-xl font-bold">{blog.title}</h3>
            </Link>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(blog?.createdAt)}
            </span>
            <p className="mt-2 line-clamp-3 text-muted-foreground">{blog.content}</p>
          </ScrollAnimate>
        ))}
      </div>
    </>
  );
}

export default PublicBlogPage;
