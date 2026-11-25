import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectImage from "@/components/ProjectImage";
import { T } from "@/lib/i18n";
import { projects } from "@/lib/projects";

function linkLabel(id: string, url: string) {
  if (url.includes("github.com")) return "View code ↗";
  if (url.includes("kaggle.com")) return "View notebook ↗";
  return id === "fisioabadia" ? "Live demo ↗" : "Live site ↗";
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const title = `${project.title} — Giuseppe Testa`;
  const { description } = project;
  const images = [
    {
      url: project.image,
      width: project.imageWidth,
      height: project.imageHeight,
      alt: project.imageAlt,
    },
  ];

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `/projects/${project.id}`,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const facts = [
    ["Role", project.role],
    ["Client", project.client],
    ["Period", project.period],
    ["Status", project.status],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-32">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg">
        <T>← All projects</T>
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-muted">
        <T>{project.description}</T>
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        {facts.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="text-muted">
              <T>{k}</T>:
            </dt>
            <dd>
              <T>{v}</T>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex justify-center overflow-hidden rounded-2xl border border-line bg-black">
        <ProjectImage project={project} />
      </div>

      <p className="mt-8 leading-relaxed text-fg/90">
        <T>{project.longDescription}</T>
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            <T>{t}</T>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black"
          >
            <T>{linkLabel(project.id, project.liveUrl)}</T>
          </a>
        )}
        {project.hasPDF && (
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-fg"
          >
            <T>Open PDF</T>
          </a>
        )}
      </div>
    </main>
  );
}
