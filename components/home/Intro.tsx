"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";

// Livelli: foto intera → titolo → ritaglio di figura e colline (intro-front.webp,
// stesse dimensioni di intro.jpg). Così il titolo sorge dietro l'orizzonte.
// Le variabili --enter (ingresso nello schermo) e --p (blocco) vanno da 0 a 1;
// senza JavaScript o con movimento ridotto valgono 1: composizione finale ferma.

// bordo superiore della testa: 45.87% dell'immagine 16:9, con la stessa
// copertura e posizione (65% in verticale) delle due immagini
const IMG_H = "max(100cqh, 56.25cqw)";
const HEAD_TOP = `calc(0.4587 * ${IMG_H} + (100cqh - ${IMG_H}) * 0.65)`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

const photo = {
  fill: true,
  sizes: "(max-width: 640px) 320vw, 100vw",
  quality: 90,
  loading: "eager",
  className: "object-cover object-[50%_65%]",
} as const;

export default function Intro() {
  const wrap = useRef<HTMLElement>(null);
  const t = useT();
  const title = t("Web apps and data tools for small businesses");
  const words = title.split(" ");
  // lo spagnolo è più lungo: corpo più piccolo e righe più larghe
  const long = title.length > 55;

  useEffect(() => {
    const el = wrap.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { top, height } = el.getBoundingClientRect();
      const pin = height - innerHeight;
      // il titolo parte prima che la sezione si blocchi e finisce a 2/3 del blocco
      const start = innerHeight * 0.4;
      el.style.setProperty("--enter", String(clamp(1 - top / innerHeight)));
      el.style.setProperty("--p", String(clamp(-top / pin)));
      el.style.setProperty(
        "--rise",
        String(clamp((start - top) / (start + pin * 0.65))),
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen min-h-[560px] w-full p-3 sm:p-6">
        <div
          className="relative h-full w-full overflow-hidden [container-type:size]"
          style={{
            transform: "scale(calc(0.9 + 0.1 * var(--enter, 1)))",
            borderRadius: "calc(2rem + (1 - var(--enter, 1)) * 6rem)",
          }}
        >
          {/* tutta la scena si assesta con un leggero zoom indietro */}
          <div
            className="absolute inset-0"
            style={{ transform: "scale(calc(1.12 - 0.12 * var(--p, 1)))" }}
          >
            <Image
              {...photo}
              src="/intro.jpg"
              alt="Silhouette of a man at sunset"
            />
            <h2
              aria-label={title}
              className={`display absolute inset-x-4 text-center !leading-[0.95] text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.25)] sm:inset-x-8 ${
                long
                  ? "text-[min(8.5cqw,6cqh)] sm:text-[min(5.5cqw,8cqh)]"
                  : "text-[min(12cqw,8cqh)] sm:text-[min(7cqw,10cqh)]"
              }`}
              // l'ultima riga scende dietro la testa
              style={{
                bottom: `calc(100cqh - ${HEAD_TOP} - 0.55em)`,
              }}
            >
              <span
                aria-hidden
                className={`mx-auto block ${long ? "max-w-[22ch]" : "max-w-[15ch]"}`}
              >
                {words.map((word, i) => (
                  <span key={`${i}-${word}`}>
                    <span
                      className="inline-block"
                      style={{
                        // ogni parola parte un po' dopo la precedente, da sotto le colline
                        transform: `translateY(calc((1 - clamp(0, (var(--rise, 1) - ${(i / words.length) * 0.55}) / 0.45, 1)) * 55cqh))`,
                      }}
                    >
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </span>
            </h2>
            {/* figura e colline: leggermente più vicine, per dare profondità */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 origin-[50%_65%]"
              style={{ transform: "scale(calc(1.07 - 0.07 * var(--p, 1)))" }}
            >
              <Image {...photo} src="/intro-front.webp" alt="" />
            </div>
          </div>

          {/* sfumature per mantenere leggibili i testi sul cielo chiaro */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent via-30% to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent to-50%" />

          <p className="absolute inset-x-5 top-24 text-center font-mono text-xs uppercase tracking-[0.18em] text-white/70 sm:text-sm">
            {t("Based in Barcelona · Worldwide")}
          </p>

          {/* testi e bottoni compaiono quando il titolo è salito */}
          <div
            className="absolute inset-x-5 bottom-5 flex flex-col gap-4 focus-within:!transform-none focus-within:!opacity-100 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between"
            style={{
              opacity: "clamp(0, (var(--p, 1) - 0.5) * 4, 1)",
              transform:
                "translateY(calc((1 - clamp(0, (var(--p, 1) - 0.5) * 4, 1)) * 40px))",
            }}
          >
            <div className="max-w-2xl font-mono text-sm uppercase tracking-[0.1em] sm:text-lg">
              <p className="mb-3 text-white/70">
                {t("Discipline & craft")} · SQL · Next.js · Vue · Python · Linux
              </p>
              <p className="font-bold">
                {t(
                  "Full-stack developer moving into cybersecurity. Studying for CompTIA Security+ and open to junior security roles.",
                )}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm text-black"
              >
                {t("Get in touch →")}
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/40 px-6 py-3 font-mono text-xs uppercase tracking-widest sm:text-sm"
              >
                {t("Projects")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
