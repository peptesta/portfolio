"use client";

import { useEffect, useState } from "react";
import { isDiving } from "../dive";

const COLUMNS = 4;
const STAGGER_MS = 110; // intervallo tra una colonna e la successiva
const COLUMN_MS = 900; // durata della salita di ogni colonna
const SHOW_MS = 1800; // tempo in cui il loader resta visibile

// Cerchio ondulato: raggio che oscilla con LOBES onde (più onde = più curve)
const LOBES = 12;
const WAVE_PATH = (() => {
  const R = 112;
  const A = 8;
  const STEPS = 360;
  let d = "";
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2 - Math.PI / 2; // parte dall'alto
    const r = R + A * Math.sin(LOBES * t);
    const x = (r * Math.cos(t)).toFixed(2);
    const y = (r * Math.sin(t)).toFixed(2);
    d += `${i === 0 ? "M" : "L"}${x} ${y} `;
  }
  return d;
})();

export default function Loader() {
  // tornando da un progetto con il tuffo il loader non deve ricomparire
  const [skip] = useState(isDiving);
  const [phase, setPhase] = useState<"show" | "hide" | "gone">(
    skip ? "gone" : "show",
  );
  // l'animazione parte solo a pagina pronta (dopo l'hydration), così si vede davvero
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (skip) return;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setStarted(true));
    const t1 = setTimeout(() => setPhase("hide"), SHOW_MS);
    const t2 = setTimeout(
      () => {
        setPhase("gone");
        document.body.style.overflow = "";
      },
      SHOW_MS + COLUMN_MS + STAGGER_MS * (COLUMNS - 1) + 100,
    );
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [skip]);

  if (phase === "gone") return null;

  const hiding = phase === "hide";

  return (
    <div
      className={`fixed inset-0 z-50 ${hiding ? "pointer-events-none" : ""}`}
    >
      {/* colonne: salgono una dopo l'altra rivelando la pagina */}
      {Array.from({ length: COLUMNS }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-y-0 bg-bg"
          style={{
            left: `${(i * 100) / COLUMNS}%`,
            width: `calc(${100 / COLUMNS}% + 1px)`, // 1px di sovrapposizione: niente righe tra le colonne
            transform: hiding ? "translateY(-100%)" : "translateY(0)",
            transition: `transform ${COLUMN_MS}ms cubic-bezier(0.76, 0, 0.24, 1) ${i * STAGGER_MS}ms`,
          }}
        />
      ))}

      {/* logo: sfuma prima che le colonne partano */}
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
          hiding ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative grid size-64 place-items-center">
          <svg
            viewBox="-128 -128 256 256"
            className="absolute inset-0 size-full overflow-visible drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            aria-hidden
          >
            <path
              d={WAVE_PATH}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={started ? "loader-draw" : "loader-idle"}
            />
          </svg>
          <span
            className={`${started ? "loader-text" : "opacity-0"} pl-[0.35em] text-3xl font-extrabold uppercase tracking-[0.35em]`}
          >
            Testa
          </span>
        </div>
      </div>
    </div>
  );
}
