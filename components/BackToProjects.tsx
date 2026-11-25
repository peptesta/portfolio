"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { dive, isPlainClick } from "./dive";
import { useT } from "@/lib/i18n";

// "← All projects": tuffo al contrario, dalla pagina del progetto fino alla sua
// immagine nella galleria.
export default function BackToProjects({ id }: { id: string }) {
  const router = useRouter();
  const t = useT();

  const back = (ev: React.MouseEvent) => {
    const img = document.querySelector<HTMLImageElement>("[data-dive-target]");
    if (!img || !isPlainClick(ev)) return;
    ev.preventDefault();
    dive(img, () => router.push("/#projects", { scroll: false }), () => {
      const card = document.querySelector<HTMLElement>(`[data-project="${id}"]`);
      const section = card?.closest("section");
      if (!card || !section) return null;
      // porta la galleria nel punto in cui questo progetto è al centro
      const top =
        section.getBoundingClientRect().top +
        scrollY +
        Number(card.dataset.at) * (section.offsetHeight - innerHeight);
      scrollTo({ top, behavior: "instant" });
      return card.querySelector("img");
    });
  };

  return (
    <Link
      href="/#projects"
      onClick={back}
      className="text-sm text-muted hover:text-fg"
    >
      {t("← All projects")}
    </Link>
  );
}
