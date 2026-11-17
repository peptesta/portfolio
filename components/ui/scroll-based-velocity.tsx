"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

const COPIES = 4;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

type Props = {
  text: string;
  /** Fixed speed (% of one copy per second scale). Negative moves the row to the right. */
  default_velocity?: number;
  className?: string;
};

/** Marquee that moves at a constant speed, independent of page scroll. */
export function ScrollBasedVelocity({
  text,
  default_velocity = 5,
  className = "",
}: Props) {
  const baseX = useMotionValue(0);
  // the track holds COPIES identical copies, so moving by 100/COPIES % loops seamlessly
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() - default_velocity * (delta / 1000));
  });

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <motion.div className="flex w-max" style={{ x }}>
        {Array.from({ length: COPIES }).map((_, i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            className={`block pr-[0.4em] ${className}`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
