'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ChevronLeft,
  PersonStanding,
} from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { projects } from '@/content/projects';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PROJECTS = projects
  .filter((p) => p.featured)
  .map((project) => ({
    id: project.slug,
    slug: project.slug,
    title: project.title,
    description: project.description,
    tags: project.tags.slice(0, 3),
    image: project.images?.[0] || '/images/placeholder.jpg',
  }));

const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: any;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 border border-white/5 hover:border-white/20"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default function HeroPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* =========================
     CURSOR FOLLOW BACKGROUND
  ========================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  /* ========================= */

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex(
      (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    const total = PROJECTS.length;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const abs = Math.abs(diff);
    const isCenter = diff === 0;

    return {
      x: diff * 320,
      scale: isCenter ? 1 : Math.max(0.75, 1 - abs * 0.15),
      rotateY: diff < 0 ? 25 : diff > 0 ? -25 : 0,
      opacity: isCenter ? 1 : Math.max(0.4, 1 - abs * 0.25),
      zIndex: isCenter ? 50 : 40 - abs * 10,
    };
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-slate-50 font-sans">

      {/* ===== BACKGROUND STATICO ===== */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* ===== CURSOR GLOW ===== */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(
            400px circle at ${smoothX}px ${smoothY}px,
            rgba(59,130,246,0.12),
            transparent 60%
          )`,
        }}
      />

      <main className="relative z-10 flex flex-col min-h-screen pt-16">
        <div className="flex-1 flex items-center px-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">

            {/* LEFT */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Available for hire
                </div>

                <h1 className="text-6xl font-bold tracking-tight mb-6">
                  Building <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    digital
                  </span>
                  <br />
                  experiences
                </h1>

                <p className="text-lg text-gray-300 max-w-md">
                  Full-Stack Developer & Data Analyst crafting scalable web applications and intuitive data visualizations.
                </p>
              </div>

              <div className="flex gap-4">
                <Link href="/about">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition shadow-lg shadow-blue-500/30">
                    <PersonStanding className="w-4 h-4 inline mr-2" />
                    About Me
                  </button>
                </Link>

                <Link href="/projects">
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium">
                    View Projects
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <SocialIcon href="#" icon={Github} />
                <SocialIcon href="#" icon={Linkedin} />
              </div>
            </div>

            {/* RIGHT - CAROUSEL */}
            <div
              className="relative h-[600px] w-full flex items-center justify-center"
              style={{ perspective: 1200 }}
            >
              {/* 🔥 Freccia più piccola */}
              <button
                onClick={handlePrev}
                className="absolute left-0 z-[999] p-3 rounded-full bg-white text-slate-900 shadow-xl hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 z-[999] p-3 rounded-full bg-white text-slate-900 shadow-xl hover:scale-110 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {PROJECTS.map((project, index) => {
                const style = getCardStyle(index);

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-[320px] cursor-pointer"
                    animate={{
                      x: style.x,
                      scale: style.scale,
                      rotateY: style.rotateY,
                      opacity: style.opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 250,
                      damping: 25,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: style.zIndex,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">

                        <div className="aspect-[4/5] relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {project.title}
                          </h3>

                          <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                            {project.description}
                          </p>

                          <div className="flex gap-2 flex-wrap">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-black/40 text-blue-100 border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}