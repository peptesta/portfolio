"use client";

import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.about}>
      {/* TOP TITLE */}
      <section className={styles.hero}>
        <h1 className={styles.mainTitle}>
          Building Scalable Data-Driven Solutions.
        </h1>
      </section>

      {/* CONTENT */}
      <section className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.smallTitle}>Biography</span>

          <div className={styles.bio}>
            <p>
              I am a Computer Science graduate from the University of Naples
              Federico II with a strong focus on{" "}
              <strong>Data Engineering</strong> and full-stack development. I
              currently work as a Full-Stack &amp; Data Developer, where I
              architect high-performance relational databases and write
              ultra-fast SQL queries to support globally distributed platforms.
            </p>
            <p>
              My experience spans from managing{" "}
              <strong>5,000+ user profiles</strong> and building custom admin
              panels for real-time data manipulation, to implementing ETL
              pipelines and integrating Machine Learning models. I am passionate
              about Big Data, performance optimization, and solving complex
              engineering challenges at scale.
            </p>
          </div>

          <br></br>
          <div>
            <span className={styles.smallTitle}>Core Competencies</span>
            <ul className={styles.bio}>
              <li>
                <strong>Data Engineering:</strong> Expert in{" "}
                <strong>SQL</strong> (PostgreSQL, Supabase) and{" "}
                <strong>Python</strong> for ETL pipelines, data processing, and
                performance optimization. Experience writing ultra-fast queries
                for internationally distributed platforms.
              </li>
              <li>
                <strong>Web Development:</strong> Full-stack development with
                JavaScript, TypeScript, React, Next.js, and Vue. Implementation
                of <strong>optimistic updates</strong> and responsive UIs for
                seamless user experiences.
              </li>
              <li>
                <strong>Infrastructure &amp; Cloud:</strong> Linux/Windows
                system administration, automation with Bash, containerization
                with Docker, and <strong>AWS</strong> (Solutions Architect – In
                Progress).
              </li>
              <li>
                <strong>Languages:</strong> International profile with
                proficiency in Italian (Native), Spanish (C1), English (B2), and
                Catalan (B1).
              </li>
            </ul>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className={styles.center}>
          <div className={styles.imageWrapper}>
            <Image
              src="/profilo.jpeg"
              alt="Profile"
              width={1000}
              height={1000}
              className={styles.image}
            />
          </div>
        </div>

        {/* RIGHT STATS */}
        <div className={styles.right}>
          <div className={styles.stat}>
            <h2>5,000+</h2>
            <p>User Profiles Managed</p>
          </div>

          <div className={styles.stat}>
            <h2>4</h2>
            <p>Languages Spoken</p>
          </div>

          <div className={styles.stat}>
            <h2>10+</h2>
            <p>Tech Stack Tools</p>
          </div>
        </div>
      </section>
    </main>
  );
}
