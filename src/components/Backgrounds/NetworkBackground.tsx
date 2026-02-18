'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Dot[] = [];

    // MOVED INSIDE useEffect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Configuration
    const DOT_COUNT = 80;
    const CONNECTION_DISTANCE = 150;
    const DOT_SPEED = 0.5;
    const DOT_RADIUS = 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      dots = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * DOT_SPEED,
          vy: (Math.random() - 0.5) * DOT_SPEED,
          radius: Math.random() * DOT_RADIUS + 1,
        });
      }
    };

    const drawDot = (dot: Dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    };

    const drawLine = (dot1: Dot, dot2: Dot, distance: number) => {
      const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;
      ctx.beginPath();
      ctx.moveTo(dot1.x, dot1.y);
      ctx.lineTo(dot2.x, dot2.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          dot.vx += dx * 0.0001;
          dot.vy += dy * 0.0001;
        }

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            drawLine(dots[i], dots[j], distance);
          }
        }
      }

      dots.forEach(drawDot);

      animationFrameId = requestAnimationFrame(update);
    };

    resize();
    createDots();
    update();

    window.addEventListener('resize', () => {
      resize();
      createDots();
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove); // ADDED CLEANUP
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent', 
        zIndex: -1  
      }}
    />
  );
}