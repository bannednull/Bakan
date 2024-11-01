import { prisma } from '@/lib/prisma';

async function PublicBlogPage() {
  const blogs = await prisma.blog.findMany();

  return (
    <>
      <div className="my-4 space-y-2 rounded-xl bg-accent/30 p-10">
        <h1 className="text-4xl">Blog</h1>
        <h2 className="text-xl text-muted-foreground">
          Explore our latest news, announcements, and articles.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <img
              src="/default.jpg"
              alt={blog.title}
              className="h-[180px] w-full rounded-lg border"
            />
            <h3 className="my-2 text-xl font-bold">{blog.title}</h3>
            <p className="text-muted-foreground">{blog.content}</p>
            <span className="text-sm text-muted-foreground">{blog.createdAt.toISOString()}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default PublicBlogPage;
