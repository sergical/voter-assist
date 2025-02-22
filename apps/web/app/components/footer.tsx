import { Status } from '@repo/observability/status';

export const Footer = () => (
  <section className="dark border-foreground/10 border-t">
    <section className="w-full bg-background py-20 text-foreground lg:py-40">
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                next-forge
              </h2>
              <p className="max-w-lg text-left text-foreground/75 text-lg leading-relaxed tracking-tight">
                This is the start of something new.
              </p>
            </div>
            <Status />
          </div>
        </div>
      </div>
    </section>
  </section>
);
