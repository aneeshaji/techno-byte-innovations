import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type PointerEvent, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  /** How strongly the child is pulled toward the cursor (0..1). */
  strength?: number;
  className?: string;
}

const Magnetic = ({ children, strength = 0.3, className }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
