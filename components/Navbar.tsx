"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LangToggle, useT } from "@/lib/i18n";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

// il cerchio del menu nasce dal centro del tasto con TESTA (come nel sito di Tanit)
const ORIGIN = "at 3.6rem 2.1rem";
const EASE = "cubic-bezier(0.7,0,0.2,1)";

export default function Navbar() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  // Se la sezione è in questa pagina si scrolla a mano: il router non lo rifà
  // quando l'indirizzo contiene già quell'ancora.
  const goTo = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    const hash = href.slice(href.indexOf("#"));
    const target = document.querySelector(hash);
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    target.scrollIntoView();
    history.replaceState(null, "", hash);
  };

  return (
    <>
      {/* solo mobile: sfondo scurito e pannello laterale */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 touch-none bg-black/60 transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <nav
        id="mobile-menu"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(82vw,20rem)] touch-none flex-col justify-center bg-surface px-8 text-fg motion-reduce:!transition-none md:hidden ${
          open ? "visible" : "invisible"
        }`}
        style={{
          clipPath: `circle(${open ? "140vmax" : "0px"} ${ORIGIN})`,
          transition: `clip-path 0.9s ${EASE}, visibility 0s ${open ? "0s" : "0.9s"}`,
        }}
      >
        <ul className="flex flex-col gap-2">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className={`display inline-block py-1 text-[2.5rem] !leading-none transition-transform motion-reduce:!transition-none ${
                  open
                    ? "translate-y-0 duration-700"
                    : "translate-y-[110%] duration-300"
                }`}
                // le voci salgono una dopo l'altra quando il cerchio è ormai grande
                style={{ transitionDelay: open ? `${0.3 + i * 0.07}s` : "0s" }}
              >
                {t(l.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-white mix-blend-difference sm:px-8">
        {/* su mobile TESTA apre il menu, da desktop porta alla home */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
          className="pointer-events-auto -m-3 flex cursor-pointer items-center gap-2.5 p-3 font-mono text-sm font-bold uppercase tracking-widest md:hidden"
        >
          {/* due linee che diventano una X, con la stessa curva del pannello */}
          <span aria-hidden className="relative h-2.5 w-4">
            {[
              open ? "top-1 rotate-45" : "top-0",
              open ? "top-1 -rotate-45" : "top-2",
            ].map((line, i) => (
              <span
                key={i}
                className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-[top,rotate] duration-[400ms] ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none ${line}`}
              />
            ))}
          </span>
          Testa
        </button>
        <Link
          href="/"
          className="pointer-events-auto hidden font-mono text-sm font-bold uppercase tracking-widest md:block"
        >
          Testa<span>•</span>
        </Link>
        <nav className="pointer-events-auto hidden md:block">
          <ul className="flex gap-7 font-mono text-[11px] uppercase tracking-[0.2em]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="opacity-70 transition hover:opacity-100"
                >
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pointer-events-auto flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em]">
          <LangToggle className="cursor-pointer rounded-full border border-white/60 px-3 py-1 uppercase tracking-[0.2em] transition hover:bg-white hover:text-black" />
          <a
            href="/CV_eng.pdf"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            CV ↗
          </a>
        </div>
      </header>
    </>
  );
}
