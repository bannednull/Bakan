import HomeHeader from '@/app/_components/home-header';

function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />

      <main className="mx-auto max-w-screen-lg">{children}</main>
    </>
  );
}

export default LayoutHome;
