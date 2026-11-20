import Image from "next/image";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="h-screen min-h-[560px] w-full p-3 sm:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-[2rem]">
        <Image
          src="/intro.jpg"
          alt="Silhouette di un uomo al tramonto"
          fill
          sizes="(max-width: 640px) 320vw, 100vw"
          quality={90}
          priority
          className="object-cover object-[50%_65%]"
        />
        {/* sfumature per mantenere leggibili i testi sul cielo chiaro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="relative h-full w-full">
          <div className="absolute inset-x-5 top-24 flex flex-col gap-3 sm:inset-x-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <p className="max-w-xl font-mono text-base font-bold uppercase tracking-[0.12em] sm:text-xl">
              Making dreams come true, with code
            </p>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-white/70 sm:shrink-0 sm:text-right sm:text-base">
              Based in Barcelona · Worldwide
            </p>
          </div>
          <Reveal className="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl font-mono text-sm uppercase tracking-[0.1em] sm:text-lg">
              <p className="mb-3 text-white/70">
                Discipline &amp; craft · SQL · Next.js · Vue · Python · Linux
              </p>
              <p className="font-bold">
                Developer and problem solver. I build web apps, automate
                systems, and I&apos;m moving into cybersecurity.
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm text-black"
              >
                Get in touch →
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/40 px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm"
              >
                Projects
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
