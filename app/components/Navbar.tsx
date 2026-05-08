"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiKaggle } from "react-icons/si";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [compact, setCompact] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setCompact(el.offsetWidth < 900);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      ref={ref}
    >
      {/* LEFT */}
      <div className={styles.left}>
        {compact && (
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
          >
            <HiOutlineMenu />
          </button>
        )}
        {!compact &&
          navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${
                pathname === link.path ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
      </div>
      {/* CENTER */}
      <div className={styles.center}>
        <div className={styles.logoCircle}>
          <strong>GT</strong>
        </div>
      </div>
      {/* RIGHT */}
      <div className={styles.right}>
        {!compact && (
          <>
            <a
              href="https://github.com/peptesta"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.github}
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/petesta9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              <FaLinkedin />
            </a>

            <a
              href="https://kaggle.com/peppetesta"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.kaggle}
            >
              <SiKaggle />
            </a>
          </>
        )}

        {compact && (
          <button
            className={styles.socialToggle}
            onClick={() => setSocialOpen(!socialOpen)}
          >
            <span>Socials</span>
            <span className={styles.arrow}>▾</span>
          </button>
        )}

        <button
          className={styles.themeToggle}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      {/* OVERLAY MENU (HAMBURGER) */}
      {menuOpen && (
        <div className={styles.overlay}>
          <button className={styles.close} onClick={() => setMenuOpen(false)}>
            <HiX />
          </button>

          <div className={styles.overlayMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`${styles.overlayLink} ${
                  pathname === link.path ? styles.active : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* SOCIAL DROPDOWN */}
      {socialOpen && compact && (
        <div className={styles.socialDropdown}>
          <a href="https://github.com/peptesta">
            <FaGithub /> GitHub
          </a>

          <a href="https://linkedin.com">
            <FaLinkedin /> LinkedIn
          </a>

          <a href="https://kaggle.com">
            <SiKaggle /> Kaggle
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
