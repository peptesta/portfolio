"use client";

import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.about}>
      {/* TOP TITLE */}
      <section className={styles.hero}>
        <h1 className={styles.mainTitle}>
          Building Meaningful Digital Experiences.
        </h1>
      </section>

      {/* CONTENT */}
      <section className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.smallTitle}>Biography</span>

          <div className={styles.bio}>
            <p>
              I am a computer science professional and a graduate of the
              University of Naples Federico II. My professional experience
              ranges from infrastructure technical support and systems
              automation to the development of full-stack web architectures.
            </p>
            <p>
              I have a strong inclination for problem-solving, developed both in
              corporate environments optimizing databases and workflows and as a
              university tutor in scientific subjects and programming languages.
            </p>
          </div>

          <br></br>
          <div>
            <span className={styles.smallTitle}>Core Competencies</span>
            <ul className={styles.bio}>
              <li>
                <strong>Web Development:</strong> Experienced in languages such
                as JavaScript, Python, Java, and C++, alongside technologies
                like React, Next.js, Vue, and Supabase.
              </li>
              <li>
                <strong>Data & AI:</strong> Ability to analyze large scale
                datasets (1.5M+ entries), implement ETL pipelines, and integrate
                computer vision models.
              </li>
              <li>
                <strong>Infrastructure:</strong> Management of Linux/Windows
                systems, LAN networks, and containerization with Docker.
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
            <h2>1.5M+</h2>
            <p>Data Points Processed</p>
          </div>

          <div className={styles.stat}>
            <h2>4</h2>
            <p>Languages Spoken</p>
          </div>

          <div className={styles.stat}>
            <h2>10+</h2>
            <p>Technologies & Tools</p>
          </div>
        </div>
      </section>
    </main>
  );
}
