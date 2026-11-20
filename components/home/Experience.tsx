"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    label: "Origin & foundations",
    title: "Where I've been",
    period: "",
    text: "My professional journey through different roles and environments.",
    milestones: [],
    ghost: "2022",
    month: "Start",
    tab: null,
  },
  {
    label: "Education",
    title: "Computer Science",
    period: "Sep 2022 — Apr 2026",
    text: "Bachelor's degree at the University of Naples Federico II, graduated 110/110.",
    milestones: [
      { k: "Degree", v: "BSc Computer Science (L-31), 110/110" },
    ],
    ghost: "2022",
    month: "September",
    tab: "Degree",
  },
  {
    label: "IT support",
    title: "IT Assistant",
    period: "Sep 2023 — Sep 2024",
    text: "Technical support and infrastructure at DFT Architecture Studio in Pozzuoli, across Linux and Windows environments.",
    milestones: [
      { k: "Network", v: "LAN troubleshooting, router and DNS configuration" },
      { k: "Automation", v: "Daily backups with Bash and Python" },
      { k: "Software", v: "PostgreSQL database with ORM and a Vue.js internal app" },
    ],
    ghost: "2023",
    month: "September",
    tab: "IT Support",
  },
  {
    label: "Freelance",
    title: "University tutor",
    period: "Jan 2024 — Aug 2025",
    text: "Private tutoring in Calculus, Linear Algebra and programming fundamentals, with debugging support and structured problem-solving guidance.",
    milestones: [
      { k: "Math", v: "Calculus and Linear Algebra" },
      { k: "Code", v: "C, C++, Python and Java fundamentals" },
      { k: "Method", v: "Debugging support and structured problem solving" },
    ],
    ghost: "2024",
    month: "January",
    tab: "Tutoring",
  },
  {
    label: "Current role",
    title: "Web developer",
    period: "Feb 2026 — Present",
    text: "Sole developer and digital marketing specialist at La Despensa de Eva, a bakery in Barcelona: e-commerce platform, back office and technical SEO.",
    milestones: [
      { k: "Platform", v: "Next.js + Supabase e-commerce with online payments" },
      { k: "Database", v: "PostgreSQL triggers, RPCs, RLS and 11 scheduled jobs" },
      { k: "Marketing", v: "SEO audit, GA4, Meta Pixel and Brevo newsletters" },
    ],
    ghost: "2026",
    month: "February",
    tab: "Web Dev",
  },
  {
    label: "Ongoing / next chapter",
    title: "Cybersecurity",
    period: "Now",
    text: "Moving into cybersecurity alongside everyday development: fundamentals, network security and hands-on practice.",
    milestones: [
      { k: "Studying", v: "CompTIA Security+" },
      { k: "Practice", v: "TryHackMe labs" },
      { k: "Focus", v: "Cybersecurity fundamentals and network security" },
    ],
    ghost: "2026",
    month: "Now",
    tab: "Security",
  },
] as const;

const N = slides.length;
const GHOST_START_VW = 22; // posizione (da sinistra) dell'anno attivo
const MONTH_START_VW = 4; // i mesi partono più a sinistra degli anni
const MONTH_STEP_VW = 200; // e scorrono più veloci (parallasse)
const GHOST_STEP_VW = 130; // distanza tra un anno e il successivo
const END_PAUSE_VH = 80; // scroll extra fermo sull'ultima voce prima di uscire
const SHIFT_VW = 85; // quanto sporge la slide successiva sul bordo destro
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function Experience() {
  const wrap = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const months = useRef<HTMLDivElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrap.current;
      if (!w) return;
      const total = (N - 1) * 1.1 * innerHeight; // il resto è la pausa finale
      const p = clamp(-w.getBoundingClientRect().top / total);
      const idx = p * (N - 1);

      w.querySelectorAll<HTMLElement>("[data-slide]").forEach((el, i) => {
        const d = i - idx; // >0: deve ancora arrivare, <0: già passata
        const e = clamp(Math.abs(d));
        const content = el.querySelector<HTMLElement>("[data-content]")!;
        const title = el.querySelector<HTMLElement>("[data-title]")!;

        content.style.transform = `translate3d(${d * SHIFT_VW}vw,0,0)`;
        content.style.opacity = String(1 - e * 0.55);
        // eco / motion-blur sul titolo durante il passaggio
        title.style.textShadow = `${e * 26}px 0 0 rgba(255,255,255,${0.35 * e}), ${e * 52}px 0 0 rgba(255,255,255,${0.18 * e})`;
        title.style.filter = `blur(${e * 3}px)`;
      });

      // striscia di anni sullo sfondo: scorre da destra a sinistra,
      // di GHOST_STEP_VW per ogni attività
      if (track.current)
        track.current.style.transform = `translate3d(${-idx * GHOST_STEP_VW + GHOST_START_VW}vw,0,0)`;

      // scritta di sfondo: percorre tutta la sua lunghezza durante l'intero carosello
      if (marquee.current) {
        const max = marquee.current.scrollWidth - innerWidth;
        marquee.current.style.transform = `translate3d(${-(1 - p) * Math.max(0, max)}px,0,0)`;
      }

      if (months.current)
        months.current.style.transform = `translate3d(${-idx * MONTH_STEP_VW + MONTH_START_VW}vw,0,0)`;

      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const next = Math.round(idx);
      setActive((a) => (a === next ? a : next));
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

  const goTo = (i: number) => {
    const w = wrap.current;
    if (!w) return;
    const total = (N - 1) * 1.1 * innerHeight;
    const top = w.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + (i / (N - 1)) * total, behavior: "smooth" });
  };

  return (
    <section
      id="experience"
      ref={wrap}
      className="relative"
      style={{ height: `${100 + (N - 1) * 110 + END_PAUSE_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        {/* scritta gigante dietro a tutto */}
        <div
          ref={marquee}
          aria-hidden
          className="display pointer-events-none absolute left-[4vw] top-[2%] w-max whitespace-nowrap text-[17vw] text-white/[0.07] will-change-transform"
        >
          Creative Technologist
        </div>

        {/* anni di sfondo: una cella per attività */}
        <div
          ref={track}
          aria-hidden
          className="display pointer-events-none absolute left-0 top-[38%] flex whitespace-nowrap text-[22vw] text-white/[0.16] will-change-transform"
        >
          {slides.map((s) => (
            <span
              key={s.title}
              className="shrink-0"
              style={{ width: `${GHOST_STEP_VW}vw` }}
            >
              {s.ghost}
            </span>
          ))}
        </div>

        {/* mesi di inizio di ogni attività */}
        <div
          ref={months}
          aria-hidden
          className="display pointer-events-none absolute left-0 top-[27%] flex whitespace-nowrap text-[9vw] text-white/[0.16] will-change-transform"
        >
          {slides.map((s) => (
            <span
              key={s.title}
              className="shrink-0"
              style={{ width: `${MONTH_STEP_VW}vw` }}
            >
              {s.month}
            </span>
          ))}
        </div>

        {slides.map((s, i) => (
          <div key={s.title} data-slide className="absolute inset-0">
            <div
              data-content
              className="absolute left-[7vw] top-1/2 w-[86vw] max-w-5xl -translate-y-1/2 will-change-transform sm:left-[8vw]"
            >
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:text-xs">
                {s.label}
                {s.period && (
                  <span className="ml-4 text-fg/60">{s.period}</span>
                )}
              </p>
              <h2
                data-title
                className="display text-[clamp(2.6rem,9vw,8rem)] will-change-[filter]"
              >
                {i === 0 ? (
                  <>
                    Where
                    <br />
                    I&apos;ve been
                  </>
                ) : (
                  s.title
                )}
              </h2>
              <p className="mt-6 max-w-lg text-sm text-fg/75 sm:text-base">
                {s.text}
              </p>
              {s.milestones.length > 0 && (
                <dl className="mt-8 grid max-w-3xl gap-5 sm:grid-cols-3">
                  {s.milestones.map((m) => (
                    <div key={m.k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {m.k}
                      </dt>
                      <dd className="mt-1 text-xs text-fg/80 sm:text-sm">
                        {m.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        ))}

        {/* barra di avanzamento */}
        <div className="absolute right-5 top-24 h-px w-28 bg-white/15 sm:right-8">
          <div
            ref={bar}
            className="h-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* tab */}
        <div className="no-scrollbar absolute bottom-28 left-[7vw] right-0 flex gap-2 overflow-x-auto pr-[7vw] sm:left-[8vw] sm:right-auto sm:overflow-visible sm:pr-0">
          {slides.map(
            (s, i) =>
              s.tab && (
                <button
                  key={s.tab}
                  onClick={() => goTo(i)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition ${
                    i === active
                      ? "bg-white text-black"
                      : "border border-line text-muted hover:text-fg"
                  }`}
                >
                  {s.tab}
                </button>
              ),
          )}
        </div>
      </div>
    </section>
  );
}
