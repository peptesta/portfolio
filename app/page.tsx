"use client";

import { useEffect } from "react";
import styles from "./Home.module.css";
import { FiExternalLink } from "react-icons/fi";

export default function Home() {
  useEffect(() => {
    const dataText = [
      "Full Stack Developer.",
      "Data Analyst.",
      "Application Developer.",
      "Software Engineer.",
    ];

    // =========================
    // TYPEWRITER SETTINGS
    // =========================
    const TYPING_SPEED = 90; // velocità scrittura
    const DELETING_SPEED = 40; // velocità cancellazione
    const PAUSE_AFTER_TYPING = 1200; // pausa dopo scrittura completa

    const heading = document.querySelector(`.${styles.animated}`);

    let i = 0;
    let j = 0;
    let deleting = false;

    function loop() {
      const current = dataText[i];

      if (!heading) return;

      if (!deleting) {
        // TYPING
        heading.innerHTML =
          current.substring(0, j + 1) + '<span class="cursor"></span>';

        j++;

        if (j === current.length) {
          deleting = true;
          setTimeout(loop, PAUSE_AFTER_TYPING);
          return;
        }
      } else {
        // DELETING
        heading.innerHTML =
          current.substring(0, j - 1) + '<span class="cursor"></span>';

        j--;

        if (j === 0) {
          deleting = false;
          i = (i + 1) % dataText.length;
        }
      }

      setTimeout(loop, deleting ? DELETING_SPEED : TYPING_SPEED);
    }

    loop();
  }, []);

  return (
    <main className={styles.container}>
      {/* LEFT - IMAGE */}
      <div className={styles.left}>
        <div className={styles.image}></div>
      </div>

      {/* RIGHT - TEXT */}
      <div className={styles.right}>
        <div className="typewriter">
          <span className={styles.animated}></span>
          <br></br>
          <br></br>
          <span className={styles.static}>
            Turning Ideas Into Digital Solutions.
          </span>
        </div>

        <p className={styles.description}>
          3+ years of experience in IT support, Full-Stack development, and
          large-scale data analysis. Passionate about automation and problem
          solving, I am currently focusing my technical and analytical skills
          toward the field of Cybersecurity.
        </p>

        <div className={styles.buttons}>
          <a
            href="/CV_eng.pdf"
            className={styles.primaryBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <FiExternalLink className={styles.externalIcon} />
          </a>

          <a href="/contact" className={styles.secondaryBtn}>
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}
