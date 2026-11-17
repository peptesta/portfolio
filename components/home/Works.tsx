"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";

// Galleria "sparsa" che scorre in diagonale con parallasse, mentre lo sfondo
// passa da scuro a chiaro. Coordinate: x/w in vw, y in vh.
const TRAVEL_X = 290; // vw percorsi a profondità 1
const TRAVEL_Y = 14; // vh percorsi a profondità 1
const SCROLL_VH = 480;

// Ogni progetto passa dal centro dello schermo quando lo scroll arriva a `pc`
// (0→1) e in quel momento la sua cima è a `yc` vh: x/y di partenza sono
// ricavate di conseguenza, così in primo piano non finisce mai fuori schermo.
// Le immagini mantengono il loro rapporto reale (nessun ritaglio) e le
// larghezze sono proporzionali alle dimensioni originali.
const MAX_H_VH = 46; // altezza massima dell'immagine
const BIGGEST_PX = Math.max(...projects.map((p) => p.imageWidth));
const BIGGEST_VW = 40; // larghezza (vw) dell'immagine più grande
// yc alterna tra alto e basso: più è grande la differenza, più sono sfalsate
const LAYOUT = [
  { pc: 0.12, yc: 24.5, d: 1.0 },
  { pc: 0.28, yc: 39.5, d: 1.1 },
  { pc: 0.44, yc: 24.5, d: 1.0 },
  { pc: 0.6, yc: 39.5, d: 1.1 },
  { pc: 0.76, yc: 24.5, d: 1.0 },
  { pc: 0.92, yc: 39.5, d: 1.1 },
  { pc: 1.08, yc: 26.5, d: 1.2 },
];
const MAIN = projects.map((p, i) => {
  const l = LAYOUT[i % LAYOUT.length];
  const ratio = p.imageWidth / p.imageHeight;
  const w = Math.min((p.imageWidth / BIGGEST_PX) * BIGGEST_VW, 100); // vw
  return {
    ...l,
    w,
    ratio,
    x: 50 - w / 2 + l.pc * TRAVEL_X * l.d,
    y: l.yc + l.pc * TRAVEL_Y * l.d,
  };
});

// Lo scroll della galleria finisce (e la pagina riprende a scorrere in
// verticale) quando l'ultimo progetto è entrato del tutto: il suo bordo destro
// è a EDGE_MARGIN_VW dal bordo destro dello schermo.
const EDGE_MARGIN_VW = 5;
const LAST = MAIN[MAIN.length - 1];
const P_END = Math.min(
  1,
  LAST.pc + (LAST.w / 2 - (50 - EDGE_MARGIN_VW)) / (TRAVEL_X * LAST.d),
);

// immagini piccole sullo sfondo (strato lontano)
const FAR = [
  { x: 36, y: 128, w: 10, d: 0.6, src: 0 },
  { x: 138, y: 18, w: 9, d: 0.6, src: 1 },
  { x: 196, y: 150, w: 11, d: 0.6, src: 2 },
  { x: 250, y: 132, w: 9, d: 0.6, src: 3 },
  { x: 318, y: 128, w: 11, d: 0.6, src: 4 },
];

const DARK = [5, 5, 7];
const LIGHT = [233, 232, 228];
const INK = [11, 11, 12];
const WHITE = [242, 242, 242];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

export default function Works() {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrap.current;
      const st = stage.current;
      if (!w || !st) return;
      const total = w.offsetHeight - innerHeight;
      const p = clamp(-w.getBoundingClientRect().top / total) * P_END;

      // sfondo scuro → chiaro e testo chiaro → scuro
      const t = clamp((p - 0.12) / 0.5);
      st.style.backgroundColor = mix(DARK, LIGHT, t);
      st.style.color = mix(WHITE, INK, t);

      st.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth);
        el.style.transform = `translate3d(${-p * TRAVEL_X * d}vw, ${-p * TRAVEL_Y * d}vh, 0)`;
      });
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
    <section
      id="projects"
      ref={wrap}
      className="relative"
      style={{ height: `${100 + SCROLL_VH * P_END}vh` }}
    >
      <div
        ref={stage}
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          backgroundColor: mix(DARK, LIGHT, 0),
          color: mix(WHITE, INK, 0),
        }}
      >
        {/* titolo iniziale */}
        <div
          data-depth="1"
          className="absolute left-[7vw] top-[22vh] will-change-transform"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] opacity-60 sm:text-xs">
            Projects · 2023 — Now
          </p>
          <h2 className="display text-[clamp(3rem,10vw,9rem)]">
            Selected
            <br />
            <span className="font-serif font-normal normal-case italic tracking-normal">
              works
            </span>
          </h2>
        </div>

        {/* strato lontano: piccole immagini sfocate */}
        {FAR.map((f, i) => (
          <div
            key={`far-${i}`}
            data-depth={f.d}
            aria-hidden
            className="absolute will-change-transform"
            style={{
              left: `${f.x * (TRAVEL_X / 230)}vw`,
              top: `${f.y}vh`,
              width: `${f.w}vw`,
            }}
          >
            <Image
              src={projects[f.src % projects.length].image}
              alt=""
              width={projects[f.src % projects.length].imageWidth}
              height={projects[f.src % projects.length].imageHeight}
              sizes="12vw"
              className="h-auto w-full opacity-50 grayscale"
            />
          </div>
        ))}

        {/* progetti */}
        {projects.map((p, i) => {
          const m = MAIN[i % MAIN.length];
          return (
            <div
              key={p.id}
              data-depth={m.d}
              className="absolute will-change-transform"
              style={{
                left: `${m.x}vw`,
                top: `${m.y}vh`,
                width: `max(min(${m.w}vw, ${MAX_H_VH * m.ratio}vh), 150px)`,
              }}
            >
              <Link href={`/projects/${p.id}`} className="group block">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] opacity-70 sm:text-[10px]">
                  {p.title}
                </p>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={p.imageWidth}
                  height={p.imageHeight}
                  sizes="40vw"
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
                />
                <p className="mt-2 max-w-[28ch] font-serif text-sm italic opacity-80 sm:text-base">
                  {p.description}
                </p>
              </Link>
            </div>
          );
        })}

        <p className="absolute bottom-6 left-[7vw] font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
          Scroll →
        </p>
      </div>
    </section>
  );
}
