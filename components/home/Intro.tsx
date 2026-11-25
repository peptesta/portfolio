import Image from "next/image";
import Reveal from "./Reveal";
import { T } from "@/lib/i18n";

export default function Intro() {
  return (
    <section className="h-screen min-h-[560px] w-full p-3 sm:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-[2rem]">
        <Image
          src="/intro.jpg"
          alt="Silhouette of a man at sunset"
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
              <T>I build web apps and data tools for small businesses</T>
            </p>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-white/70 sm:shrink-0 sm:text-right sm:text-base">
              <T>Based in Barcelona · Worldwide</T>
            </p>
          </div>
          <Reveal className="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl font-mono text-sm uppercase tracking-[0.1em] sm:text-lg">
              <p className="mb-3 text-white/70">
                <T>Discipline &amp; craft</T> · SQL · Next.js · Vue · Python · Linux
              </p>
              <p className="font-bold">
                <T>
                  Full-stack developer moving into cybersecurity. Studying for CompTIA Security+ and open to junior security roles.
                </T>
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm text-black"
              >
                <T>Get in touch →</T>
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/40 px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm"
              >
                <T>Projects</T>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
