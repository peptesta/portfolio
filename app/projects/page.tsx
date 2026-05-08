"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { projects } from "../assets/projects";
import Link from "next/link";

const ITEMS_PER_PAGE = 3;

export default function Projects() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = projects.filter((project) => {
    const q = search.toLowerCase();

    return (
      project.title.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = filtered.slice(start, start + ITEMS_PER_PAGE);

  function changePage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Where Imagination Meets A Keyboard</h1>

      {/* SEARCH */}
      <input
        className={styles.search}
        placeholder="Search by name or tag..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* GRID */}
      <div className={styles.grid}>
        {current.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                className={styles.image}
                alt={project.title}
              />
            </div>

            <h2>{project.title}</h2>
            <p>{project.description}</p>

            {/* TAGS */}
            <div className={styles.tags}>
              {project.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {/* BUTTONS */}
            <div className={styles.buttons}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                Live Demo
              </a>

              <Link
                href={`/projects/${project.id}`}
                className={styles.secondaryButton}
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => changePage(page - 1)}>
          Prev
        </button>

        <span>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}
