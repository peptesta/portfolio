"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { useT } from "@/lib/i18n";
import { dive, isPlainClick } from "../dive";

// Galleria che scorre in diagonale (verso il basso a destra) con parallasse,
// mentre lo sfondo passa da scuro a chiaro. I progetti che escono a sinistra si
// piegano in 3D verso chi guarda, come all'interno di una spirale.
// Coordinate: x/w in vw, y in vh.
const TRAVEL_X = 290; // vw percorsi a profondità 1
const TRAVEL_Y = 200; // vh percorsi a profondità 1 (inclinazione diagonale)
const SCROLL_VH = 480;
const MOBILE_TX = 1.5; // su mobile le immagini sono più distanziate in orizzontale
// effetto spirale, valori massimi raggiunti al bordo sinistro
const PERSPECTIVE = 1200; // px
const TURN = 62; // gradi di rotazione verso l'interno
const TWIST = 9; // gradi di inclinazione
const NEAR = 380; // px di avvicinamento
const BEND = 30; // vh: curva la traiettoria, così escono di lato e non dall'alto
// la scena segue il mouse: spostamento massimo (px) a profondità 1
const MOUSE_X = 40;
const MOUSE_Y = 28;
const MOUSE_EASE = 0.07; // più basso = inseguimento più morbido

// Ogni progetto passa dal centro dello schermo quando lo scroll arriva a `pc`
// (0→1) e in quel momento la sua cima è a `yc` vh: x/y di partenza sono
// ricavate di conseguenza, così in primo piano non finisce mai fuori schermo.
// Le immagini mantengono il loro rapporto reale (nessun ritaglio) e le
// larghezze sono proporzionali alle dimensioni originali.
const BIGGEST_PX = Math.max(...projects.map((p) => p.imageWidth));
const BIGGEST_VW = 40; // larghezza (vw) dell'immagine più grande
// yc è uguale per tutti: lo sfalsamento viene dalla diagonale
const LAYOUT = [
  { pc: 0.12, yc: 26, d: 1.0 },
  { pc: 0.28, yc: 26, d: 1.1 },
  { pc: 0.44, yc: 26, d: 1.0 },
  { pc: 0.60, yc: 26, d: 1.1 },
  { pc: 0.76, yc: 26, d: 1.0 },
  { pc: 0.92, yc: 26, d: 1.1 },
  { pc: 1.08, yc: 26, d: 1.0 },
  { pc: 1.24, yc: 26, d: 1.2 },
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
// verticale) quando l'ultimo progetto ha raggiunto il centro dello schermo.
const LAST = MAIN[MAIN.length - 1];
const P_END = LAST.pc;
const HOLD = 0.9; // frazione di scroll usata per l'animazione

// Altre schermate del progetto al centro: compaiono sullo sfondo, nelle zone
// lasciate libere dalla diagonale, e svaniscono passando al successivo.
const SHOT_SLOTS = [
  "left-[73vw] top-[13vh] w-[20vw] max-sm:left-[48vw] max-sm:top-[11vh] max-sm:w-[46vw]",
  "left-[7vw] top-[68vh] w-[21vw] max-sm:top-[73vh] max-sm:w-[46vw]",
  "left-[83vw] top-[33vh] w-[13vw] max-sm:hidden",
];
const SHOT_OPACITY = 0.75;
const SHOT_FULL = 0.03; // distanza (in scroll) entro cui sono pienamente visibili
const SHOT_GONE = 0.09; // distanza a cui sono sparite
const SHOT_DEPTH = 0.5; // quanto seguono il mouse
const SHOT_DRIFT_X = 90; // vw: scivolano lungo la diagonale, più lente della copertina
const SHOT_DRIFT_Y = 60; // vh

// progetti in evidenza (sono i primi della galleria)
const FEATURED = ["la-despensa-de-eva", "tanit-terron", "ophryslens"];

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
  const t = useT();
  const router = useRouter();

  // apertura "a tuffo"
  const open = (ev: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isPlainClick(ev)) return;
    const img = ev.currentTarget.querySelector("img");
    if (!img) return;
    ev.preventDefault();
    dive(
      img,
      () => router.push(href),
      () => document.querySelector<HTMLImageElement>("[data-dive-target]"),
    );
  };

  useEffect(() => {
    let raf = 0;
    // posizione del mouse rispetto al centro (-1 → 1): `goal` è quella reale,
    // `cur` la raggiunge gradualmente
    const goal = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const update = () => {
      raf = 0;
      const w = wrap.current;
      const st = stage.current;
      if (!w || !st) return;
      const total = w.offsetHeight - innerHeight;
      // l'ultimo progetto arriva al centro al 90% dello scroll e ci resta fermo
      // fino alla fine (margine anche per la barra del browser mobile)
      const p = clamp(-w.getBoundingClientRect().top / (total * HOLD)) * P_END;

      // sfondo scuro → chiaro e testo chiaro → scuro
      const k = clamp((p - 0.12) / 0.5);
      st.style.backgroundColor = mix(DARK, LIGHT, k);
      st.style.color = mix(WHITE, INK, k);

      // su mobile le distanze orizzontali sono più ampie
      const tx = matchMedia("(max-width: 639px)").matches ? MOBILE_TX : 1;
      const flat = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const vw = innerWidth / 100;
      const vh = innerHeight / 100;
      cur.x += (goal.x - cur.x) * MOUSE_EASE;
      cur.y += (goal.y - cur.y) * MOUSE_EASE;

      st.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth);
        const x = -p * TRAVEL_X * tx * d * vw;
        const y = -p * TRAVEL_Y * d * vh;
        const mx = cur.x * MOUSE_X * d;
        const my = cur.y * MOUSE_Y * d;
        let transform = `translate3d(${x + mx}px, ${y + my}px, 0)`;

        if ("spiral" in el.dataset && !flat) {
          // 0 al centro dello schermo → 1 quando è uscito del tutto a sinistra
          // (offsetLeft ignora le trasformazioni: è la posizione di partenza)
          const center = el.offsetLeft + el.offsetWidth / 2 + x;
          const out = clamp(
            (innerWidth / 2 - center) / (innerWidth / 2 + el.offsetWidth / 2),
          );
          const e = Math.pow(out, 1.1);
          transform = `translate3d(${x + mx}px, ${y + my + e * BEND * vh}px, ${e * NEAR}px) rotateY(${e * TURN}deg) rotateZ(${e * TWIST}deg)`;
          el.style.zIndex = out > 0 ? "1" : "0"; // chi è più vicino sta sopra
        }
        el.style.transform = transform;
      });

      st.querySelectorAll<HTMLElement>("[data-shot]").forEach((el) => {
        const ahead = Number(el.dataset.shot) - p;
        const seen = clamp(
          (SHOT_GONE - Math.abs(ahead)) / (SHOT_GONE - SHOT_FULL),
        );
        const x = (flat ? 0 : ahead * SHOT_DRIFT_X * vw) + cur.x * MOUSE_X * SHOT_DEPTH;
        const y = (flat ? 0 : ahead * SHOT_DRIFT_Y * vh) + cur.y * MOUSE_Y * SHOT_DEPTH;
        el.style.opacity = String(seen * SHOT_OPACITY);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      // continua ad animare finché la scena non ha raggiunto il mouse
      if (Math.abs(goal.x - cur.x) + Math.abs(goal.y - cur.y) > 0.002) {
        raf = requestAnimationFrame(update);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (ev: PointerEvent) => {
      // solo mouse (non il tocco) e non con movimento ridotto
      if (ev.pointerType !== "mouse") return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      goal.x = (ev.clientX / innerWidth) * 2 - 1;
      goal.y = (ev.clientY / innerHeight) * 2 - 1;
      onScroll();
    };
    const onLeave = () => {
      goal.x = 0;
      goal.y = 0;
      onScroll();
    };
    const st = stage.current;
    st?.addEventListener("pointermove", onMove);
    st?.addEventListener("pointerleave", onLeave);
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      st?.removeEventListener("pointermove", onMove);
      st?.removeEventListener("pointerleave", onLeave);
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
          perspective: PERSPECTIVE,
        }}
      >
        {/* titolo iniziale */}
        <div
          data-depth="1"
          className="absolute left-[7vw] top-[22vh] will-change-transform"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] opacity-60 sm:text-xs">
            {t("Projects · 2023 — Now")}
          </p>
          <h2 className="display text-[clamp(3rem,10vw,9rem)]">
            {t("Selected")}
            <br />
            <span className="font-serif font-normal normal-case italic tracking-normal">
              {t("works")}
            </span>
          </h2>
        </div>

        {/* sfondo: altre schermate di ogni progetto */}
        {projects.map((p, i) =>
          p.gallery?.slice(0, SHOT_SLOTS.length).map((shot, j) => (
            <div
              key={shot.src}
              data-shot={MAIN[i % MAIN.length].pc}
              // le immagini verticali si stringono per non superare 19vh
              style={{ maxWidth: `${(19 * shot.width) / shot.height}vh` }}
              aria-hidden
              className={`pointer-events-none absolute opacity-0 will-change-transform ${SHOT_SLOTS[j]}`}
            >
              <Image
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 639px) 46vw, 21vw"
                unoptimized={shot.src.endsWith(".gif")} // resta animata
                className="h-auto w-full shadow-lg"
              />
            </div>
          )),
        )}

        {/* progetti */}
        {projects.map((p, i) => {
          const m = MAIN[i % MAIN.length];
          return (
            <div
              key={p.id}
              data-depth={m.d}
              data-spiral
              data-project={p.id}
              data-at={(m.pc / P_END) * HOLD}
              className="absolute will-change-transform"
              style={{
                left: `calc(${50 - m.w / 2}vw - (var(--ws) - 1) * ${m.w / 2}vw + var(--tx) * ${m.pc * TRAVEL_X * m.d}vw)`,
                top: `${m.yc + m.pc * TRAVEL_Y * m.d}vh`,
                width: `max(min(calc(var(--ws) * ${m.w}vw), calc(var(--hcap) * ${m.ratio}vh)), 150px)`,
              }}
            >
              <Link
                href={`/projects/${p.id}`}
                onClick={(ev) => open(ev, `/projects/${p.id}`)}
                className="group block"
              >
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] opacity-70 sm:text-[10px]">
                  {p.title}
                  {FEATURED.includes(p.id) && ` · ★ ${t("Featured")}`}
                </p>
                <Image
                  src={p.image}
                  alt={t(p.imageAlt)}
                  width={p.imageWidth}
                  height={p.imageHeight}
                  sizes="55vw"
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
                />
                <p className="mt-2 max-w-[28ch] font-serif text-sm italic opacity-80 sm:text-base">
                  {t(p.description)}
                </p>
              </Link>
            </div>
          );
        })}

        <p className="absolute bottom-6 left-[7vw] font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
          {t("Scroll ↘")}
        </p>
      </div>
    </section>
  );
}
