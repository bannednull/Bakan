import Pricing from '@/app/_components/pricing';

export default function Home() {
  return (
    <>
      <section className="py-32">
        <div className="relative mx-auto max-w-3xl">
          <div className="pointer-events-none absolute inset-0 -top-2 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="absolute -top-2 bottom-0 left-0 right-0 -z-10 bg-[linear-gradient(to_right,#7c7c7c2e_1px,transparent_1px),linear-gradient(to_bottom,#7c7c7c2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_100%_70%_at_50%_0%,#000_100%,transparent_100%)]" />
          <h1 className="text-center text-7xl font-extrabold">
            Get Your{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              SaaS
            </span>{' '}
            Up and Running in{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Record
            </span>{' '}
            Time
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto mb-4 max-w-xl text-center">
          <h3 className="text-center text-3xl font-extrabold">Pricing</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore iste nam fugiat
            magnam eveniet
          </p>
        </div>

        <Pricing />
      </section>
    </>
  );
}
