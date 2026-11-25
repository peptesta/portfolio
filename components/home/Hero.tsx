"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AboutScribble from "./AboutScribble";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { useT } from "@/lib/i18n";

const MIN_SCALE = 0.4;

export default function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(0);
  const t = useT();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrap.current;
      const c = card.current;
      if (!w || !c) return;
      // zoom indietro nel primo schermo di scroll; intanto la scritta si
      // disegna fin dall'inizio, per tutta la durata del blocco
      // poi la hero si sblocca e lo scroll riprende normalmente
      const pin = w.offsetHeight - innerHeight;
      const zoomEnd = innerHeight;
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const p = clamp(scrollY / zoomEnd);
      const scale = 1 - p * (1 - MIN_SCALE);
      c.style.transform = `scale(${scale})`;
      c.style.borderRadius = `${p * 120}px`;
      setDraw(Math.round(clamp(scrollY / pin) * 500) / 500);
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
    <section id="home" ref={wrap} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        {/* sfondo visibile mentre la hero si rimpicciolisce */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-2 text-fg">
          <ScrollBasedVelocity
            text={t("Full-stack · Data · Cybersecurity · ")}
            default_velocity={-1}
            className="font-serif text-[11vw] uppercase italic leading-[0.95] tracking-tight text-fg/70"
          />
          <ScrollBasedVelocity
            text={t("Building data-driven web products · ")}
            default_velocity={1.5}
            className="text-[11vw] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]"
          />
        </div>
        <AboutScribble progress={draw} />
        <div
          ref={card}
          className="relative z-10 flex h-full origin-center flex-col overflow-hidden bg-paper text-ink will-change-transform"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 sm:px-8">
            <h1 className="display text-center text-[clamp(3rem,12.5vw,11rem)]">
              {t("Explore my")}
              <br />
              <span className="bg-gradient-to-b from-ink to-ink/10 bg-clip-text text-transparent">
                {t("Portfolio")}
              </span>
            </h1>
          </div>

          <Image
            src="/hero.webp"
            alt="Giuseppe Testa"
            width={900}
            height={1200}
            priority
            className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[68vh] w-auto -translate-x-1/2 object-contain object-bottom grayscale contrast-125"
          />

          <div className="relative z-10 mt-auto flex items-end justify-between px-5 pb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white [text-shadow:0_1px_6px_rgb(0_0_0/0.6)] sm:px-8 sm:text-ink sm:[text-shadow:none]">
            <p>
              {t("Designed")}
              <br />
              {t("est. 2025")}
            </p>
            <div className="max-w-[220px] text-right">
              <p className="mb-3 normal-case tracking-normal">
                {t(
                  "I am passionate about building data-driven web products that stand out from the crowd.",
                )}
              </p>
              <p>{t("Full-stack · Data · Security")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
