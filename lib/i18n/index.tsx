"use client";

import { useEffect, useSyncExternalStore } from "react";
import { es } from "./es";

// La chiave di ogni traduzione è il testo inglese: se manca, resta l'inglese.
export type Lang = "en" | "es";

const KEY = "lang";
let current: Lang | undefined;
const listeners = new Set<() => void>();

function read(): Lang {
  if (!current) {
    current = "en";
    try {
      if (localStorage.getItem(KEY) === "es") current = "es";
    } catch {}
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setLang(lang: Lang) {
  current = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
  listeners.forEach((l) => l());
}

export function useT() {
  const lang = useSyncExternalStore(subscribe, read, (): Lang => "en");
  return (text: string) => (lang === "es" ? (es[text] ?? text) : text);
}

/** Testo traducibile, usabile anche dentro i Server Component. */
export function T({ children }: { children: string }) {
  return useT()(children);
}

export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useSyncExternalStore(subscribe, read, (): Lang => "en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const next: Lang = lang === "en" ? "es" : "en";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      lang={next}
      aria-label={next === "es" ? "Ver en español" : "View in English"}
      className={className}
    >
      {next.toUpperCase()}
    </button>
  );
}
