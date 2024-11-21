function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-plus grid grid-cols-[200px_1fr] border-t">
      <nav></nav>
      <div>{children}</div>
    </div>
  );
}

export default DocsLayout;
