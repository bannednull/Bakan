function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[270px_1fr]">
      <aside className="flex flex-col gap-4 border-r bg-muted p-5">
        <h1 className="mb-2 text-xl font-bold">Bakan</h1>
      </aside>

      <section className="overflow-hidden">{children}</section>
    </main>
  );
}

export default DashboardLayout;
