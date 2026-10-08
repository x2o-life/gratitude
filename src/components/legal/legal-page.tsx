import type { ReactNode } from "react";
import { Footer } from "@/components/home/join";
import { MonoLabel, SerifTitle } from "@/components/home/kit";

/** Shared shell for Privacy and Terms: a readable column under the topbar. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-4 pt-32 pb-20 md:pt-40">
        <MonoLabel>Last updated {updated}</MonoLabel>
        <SerifTitle as="h1" className="mt-3 text-5xl md:text-7xl">
          {title}
        </SerifTitle>
        <div className="mt-10 flex flex-col gap-4 text-pretty text-muted-foreground [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
          {children}
        </div>
      </article>
      <Footer />
    </>
  );
}
