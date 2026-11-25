"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

export default function ProjectImage({ project }: { project: Project }) {
  const t = useT();
  return (
    <Image
      src={project.image}
      alt={t(project.imageAlt)}
      width={project.imageWidth}
      height={project.imageHeight}
      sizes="768px"
      priority
      data-dive-target
      className="h-auto max-h-[70vh] w-auto max-w-full object-contain"
    />
  );
}
