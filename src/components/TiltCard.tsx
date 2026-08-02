import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import './TiltCard.css';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Variants to forward — lets the card participate in a parent stagger reveal. */
  variants?: Variants;
  /** Passed through to the forwarded variants (e.g. stagger index). */
  custom?: number;
  /** Max tilt in degrees in each axis. */
  maxTilt?: number;
}

const fallbackFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const TiltCard = ({ children, className, variants, custom, maxTilt = 8 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  // Normalized pointer position within the card (0..1).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 160, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);

  const spotX = useTransform(px, (v) => `${v * 100}%`);
  const spotY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${spotX} ${spotY}, rgba(186, 255, 41, 0.12), transparent 65%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={['tilt-card', className].filter(Boolean).join(' ')}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      variants={variants ?? fallbackFade}
      custom={custom}
      initial={variants ? undefined : 'hidden'}
      whileInView={variants ? undefined : 'visible'}
      viewport={variants ? undefined : { once: true, amount: 0.2 }}
    >
      {children}
      {!reduceMotion && (
        <motion.div className="tilt-spotlight" style={{ background: spotlight }} aria-hidden="true" />
      )}
    </motion.div>
  );
};

export default TiltCard;
