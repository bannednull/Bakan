import HomeHeader from '@/app/_components/home-header';
import Logo from '@/components/logo';
import Link from 'next/link';

function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />

      <main className="mx-auto max-w-screen-lg border-x">
        {children}
        <footer className="border-plus relative grid grid-cols-[1fr_1fr_1fr] gap-6 border-t p-16">
          <div className="absolute"></div>
          <div>
            <div className="flex items-center gap-2">
              <Logo className="size-6" /> <h3 className="text-xl">Bakan</h3>
            </div>
            <p className="text-muted-foreground">
              © 2024 <br />
              Designed & built by <a href="https://twitter.com/bannednull">BannedNull</a>
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link href="/blog">Blog</Link>
            <Link href="#">Link 01</Link>
            <Link href="#">Link 02</Link>
          </nav>

          <nav className="flex flex-col gap-2">
            <Link href="#">Link 01</Link>
            <Link href="#">Link 02</Link>
            <Link href="#">Link 03</Link>
          </nav>
        </footer>
      </main>
    </>
  );
}

export default LayoutHome;
