import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      {/* BIG 404 */}
      <h1 className={styles.code}>404</h1>

      {/* TITLE */}
      <h2 className={styles.title}>This page escaped the stack.</h2>

      {/* FUN TEXT */}
      <div className={styles.messages}>
        <p>The requested page was not found in this timeline.</p>
        <p>I searched the database, the logs, and even Stack Overflow.</p>
        <p>Nothing. Absolutely nothing.</p>
      </div>

      {/* BUTTON */}
      <Link href="/" className={styles.button}>
        Return Home
      </Link>
    </main>
  );
}
