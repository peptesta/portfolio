import Link from "next/link";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-white mix-blend-difference sm:px-8">
      <Link
        href="/"
        className="pointer-events-auto font-mono text-sm font-bold uppercase tracking-widest"
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
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="/CV_eng.pdf"
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.2em] underline underline-offset-4"
      >
        CV ↗
      </a>
    </header>
  );
}
