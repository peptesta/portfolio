// "Tuffo" tra galleria e pagina del progetto (nei due sensi): l'immagine si
// ingrandisce fino a coprire lo schermo, nel frattempo si cambia pagina, poi si
// posa al posto dell'immagine corrispondente nella nuova pagina.
// Gli elementi animati stanno direttamente in <body>, così sopravvivono al
// cambio di pagina.
const IN_MS = 700;
const OUT_MS = 600;
const WAIT_MS = 4000; // oltre questo tempo si rinuncia ad aspettare la pagina
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

let running = false;

export const isDiving = () => running;

// nuova scheda e movimento ridotto restano una navigazione normale
export const isPlainClick = (ev: React.MouseEvent) =>
  ev.button === 0 &&
  !(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

const box = (r: { left: number; top: number; width: number; height: number }) => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
});

type Find = () => HTMLImageElement | null;

// aspetta che l'immagine di arrivo sia caricata e disegnata per qualche frame
function waitForTarget(find: Find, previous: HTMLImageElement) {
  const start = performance.now();
  let ready = 0;
  return new Promise<HTMLImageElement | null>((resolve) => {
    const check = () => {
      const img = find();
      const ok = img && img !== previous && img.complete && img.offsetWidth > 0;
      ready = ok ? ready + 1 : 0;
      if (ready >= 3) resolve(img);
      else if (performance.now() - start > WAIT_MS) resolve(null);
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
}

export async function dive(
  source: HTMLImageElement,
  navigate: () => void,
  find: Find,
) {
  if (running) return;
  running = true;

  const from = source.getBoundingClientRect();
  const ratio = source.naturalWidth / source.naturalHeight || from.width / from.height;
  // rettangolo con le stesse proporzioni che copre tutto lo schermo
  const width = Math.max(innerWidth, innerHeight * ratio);
  const height = width / ratio;
  const full = {
    width,
    height,
    left: (innerWidth - width) / 2,
    top: (innerHeight - height) / 2,
  };

  const veil = document.createElement("div");
  veil.style.cssText =
    "position:fixed;inset:0;z-index:100;background:var(--color-bg);opacity:0";
  const clone = document.createElement("img");
  clone.src = source.currentSrc || source.src;
  clone.alt = "";
  clone.style.cssText = "position:fixed;z-index:101;object-fit:cover;max-width:none";
  Object.assign(clone.style, box(from));
  document.body.append(veil, clone);

  let target: HTMLImageElement | null = null;
  const timing = { easing: EASE, fill: "forwards" as const };
  try {
    veil.animate([{ opacity: 0 }, { opacity: 1 }], { ...timing, duration: IN_MS });
    await clone.animate([box(from), box(full)], { ...timing, duration: IN_MS })
      .finished;

    navigate();
    target = await waitForTarget(find, source);
    // nascosta finché la copia non ci si posa sopra (niente doppione)
    if (target) target.style.visibility = "hidden";

    const out = { ...timing, duration: OUT_MS };
    const fade = veil.animate([{ opacity: 1 }, { opacity: 0 }], out);
    if (target) {
      clone.style.objectFit = "contain";
      await clone.animate([box(full), box(target.getBoundingClientRect())], out)
        .finished;
    } else {
      clone.animate([{ opacity: 1 }, { opacity: 0 }], out);
    }
    await fade.finished;
  } finally {
    if (target) target.style.visibility = "";
    veil.remove();
    clone.remove();
    running = false;
  }
}
