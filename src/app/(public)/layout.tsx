import HomeHeader from '@/app/_components/home-header';
import Logo from '@/components/logo';
import { AnalitycsProvider } from '@/lib/analitycs';
import Link from 'next/link';

function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <AnalitycsProvider>
      <HomeHeader />

      <main className="mx-auto max-w-screen-lg border-x">{children}</main>
      <footer className="relative border-t">
        <div className="border-plus mx-auto grid max-w-screen-lg grid-cols-[1fr_1fr_1fr] gap-6 p-10 px-16">
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
        </div>
      </footer>
    </AnalitycsProvider>
  );
}

export default LayoutHome;
