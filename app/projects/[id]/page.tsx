"use client";

import { projects } from "../../assets/projects";
import Link from "next/link";
import { use } from "react";
import styles from "./ProjectPage.module.css";
import { FiFileText } from "react-icons/fi";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectPage({ params }: Props) {
  const { id } = use(params);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className={styles.notFound}>
        <h1>Project not found</h1>
        <p>The project you are looking for does not exist.</p>

        <Link href="/projects" className={styles.back}>
          ← Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* TOP NAV */}
      <div className={styles.topBar}>
        <Link href="/projects" className={styles.back}>
          ← Back
        </Link>

        {/* Live Demo - mostrato solo se NON ha PDF */}
        {!project.hasPDF && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.live}
          >
            Live Demo
          </a>
        )}
      </div>

      {/* CONTENT */}
      <section className={styles.content}>
        {/* LEFT TEXT */}
        <div className={styles.left}>
          <h1 className={styles.title}>{project.title}</h1>

          <p className={styles.description}>{project.longDescription}</p>

          {/* TAGS */}
          <div className={styles.tags}>
            {project.tags?.map((tag: string) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* PDF BUTTON - mostrato solo se hasPDF è true e pdfUrl esiste */}
          {project.hasPDF && project.pdfUrl && (
            <a
              href={project.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pdfButton}
            >
              <FiFileText /> View Full Report (PDF)
            </a>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
