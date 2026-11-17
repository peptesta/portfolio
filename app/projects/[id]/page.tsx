import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-32">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg">
        ← All projects
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-muted">{project.description}</p>

      <div className="mt-8 flex justify-center overflow-hidden rounded-2xl border border-line bg-black">
        <Image
          src={project.image}
          alt={project.title}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="768px"
          priority
          className="h-auto max-h-[70vh] w-auto max-w-full object-contain"
        />
      </div>

      <p className="mt-8 leading-relaxed text-fg/90">
        {project.longDescription}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black"
        >
          {project.liveUrl.includes("github") ? "View code ↗" : "Live site ↗"}
        </a>
        {project.hasPDF && (
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-fg"
          >
            Open PDF
          </a>
        )}
      </div>
    </main>
  );
}
