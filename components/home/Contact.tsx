import Reveal from "./Reveal";
import { T } from "@/lib/i18n";

const socials = [
  { label: "GitHub", href: "https://github.com/peptesta" },
  { label: "LinkedIn", href: "https://linkedin.com/in/petesta9" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col px-5 pt-32 sm:px-8"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Reveal>
          <h2 className="display bg-gradient-to-b from-white to-white/30 bg-clip-text text-[clamp(3.5rem,14vw,13rem)] text-transparent">
            <T>Let’s talk</T>
          </h2>
        </Reveal>
        <Reveal
          delay={150}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-5 py-2 font-mono text-[11px] uppercase tracking-widest transition hover:bg-white hover:text-black"
            >
              {s.label}
            </a>
          ))}
          <a
            href="mailto:sonsycomb@gmail.com"
            className="rounded-full bg-white px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-black"
          >
            <T>Contact me</T>
          </a>
        </Reveal>
      </div>
      {/* torna in cima: lo scorrimento è morbido grazie a scroll-behavior */}
      <a
        href="#home"
        className="self-center rounded-full border border-white/30 px-5 py-2 font-mono text-[11px] uppercase tracking-widest transition hover:bg-white hover:text-black"
      >
        <T>Back to top ↑</T>
      </a>
      <footer className="flex justify-between py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>
          <T>Portfolio · All rights reserved</T>
        </span>
        <span>© {new Date().getFullYear()} Giuseppe Testa</span>
      </footer>
    </section>
  );
}
