import { motion, type Variants } from 'framer-motion';
import './Testimonials.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* NOTE: placeholder quotes — replace with real client testimonials before launch. */
const testimonials = [
  {
    quote: 'TechnoByte delivered our platform ahead of schedule. They understood the brief immediately and kept us in the loop through every sprint.',
    name: 'Rahul Menon',
    role: 'Founder, ATSense',
  },
  {
    quote: 'From the first call to launch, everything was seamless. Our online store went from idea to live in under eight weeks — and orders have grown steadily since.',
    name: 'Divya Nair',
    role: 'Operations Head, FramezLabs',
  },
  {
    quote: 'They rebuilt our internal CRM and it genuinely changed how the team works. The post-launch support has been just as good as the build itself.',
    name: 'Arjun Krishnan',
    role: 'Director, Balancely',
  },
];

const Testimonials = () => (
  <section className="testimonials-section">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="section-label">Testimonials</div>
        <h2 className="testimonials-heading">
          Trusted by<br /><span>Great Teams</span>
        </h2>
      </motion.div>

      <motion.div
        className="testimonials-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {testimonials.map((t, i) => (
          <motion.div key={i} className="testimonial-card" variants={fadeUp} custom={i}>
            <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">{t.role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
