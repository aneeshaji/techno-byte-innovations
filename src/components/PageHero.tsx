import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ParticleField from './ParticleField';
import './PageHero.css';

interface PageHeroProps {
  label: string;
  line1: string;
  line2: string;
  subtitle: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const PageHero = ({ label, line1, line2, subtitle }: PageHeroProps) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() === true;

  // Mouse parallax (normalized -0.5..0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const parallaxSpring = { stiffness: 60, damping: 20 };
  const sx = useSpring(mx, parallaxSpring);
  const sy = useSpring(my, parallaxSpring);
  const orbX = useTransform(sx, (v) => v * 40);
  const orbY = useTransform(sy, (v) => v * 40);

  // Scroll-linked hero gentle parallax (keep opacity 100% so text is always readable)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section className="page-hero" ref={heroRef}>
      <ParticleField />
      <div className="page-hero-glow" />
      <div className="page-hero-glow-2" />
      <motion.div
        className="page-hero-parallax"
        style={reduceMotion ? undefined : { x: orbX, y: orbY }}
        aria-hidden="true"
      >
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />
        <div className="page-orb page-orb-3" />
      </motion.div>

      <div className="container">
        <motion.div
          className="page-hero-scroll"
          style={reduceMotion ? undefined : { y: scrollY }}
        >
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={stagger}
          >
            <motion.div className="section-label" variants={fadeUp} custom={0}>
              {label}
            </motion.div>
            <div className="page-hero-inner">
              <div>
                <motion.h1 className="page-title" variants={fadeUp} custom={1}>
                  <span className="page-line">{line1}</span>
                  <span className="page-line page-title-accent">{line2}</span>
                </motion.h1>
              </div>
              <motion.p className="page-subtitle" variants={fadeUp} custom={2}>
                {subtitle}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
