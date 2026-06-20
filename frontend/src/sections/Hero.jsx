import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-scroll';

// ─── Animated Name ────────────────────────────────────────────────────────────
const AnimatedName = ({ name }) => {
  const [visible, setVisible] = useState(true);
  const letters = name.split('');

  useEffect(() => {
    const cycle = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), letters.length * 90 + 2200);
    };
    cycle();
    const id = setInterval(cycle, letters.length * 90 + 4200);
    return () => clearInterval(id);
  }, [letters.length]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
    exit:    { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const letterVariant = {
    hidden:  { opacity: 0, y: 80, rotateX: -90, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
               transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -60, rotateX: 90, filter: 'blur(10px)',
               transition: { duration: 0.45, ease: [0.64, 0, 0.78, 0] } },
  };

  return (
    <div style={{ perspective: '1000px', display: 'inline-block' }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key="name"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariant}
                whileHover={{ scale: 1.15, y: -10, transition: { duration: 0.18 } }}
                style={{
                  display: 'inline-block',
                  whiteSpace: letter === ' ' ? 'pre' : 'normal',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 30%, #38bdf8 70%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 18px rgba(99,102,241,0.3))',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Typewriter subtitle ──────────────────────────────────────────────────────
const TypeWriter = ({ words }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((wordIdx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx, words]);

  return (
    <span className="font-mono text-indigo-400 text-lg">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 align-middle"
      />
    </span>
  );
};

// ─── Animated stat counter ────────────────────────────────────────────────────
const StatCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const numericVal = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || isNaN(numericVal)) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = numericVal / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericVal) { setCount(numericVal); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(2)));
    }, step);
    return () => clearInterval(timer);
  }, [started, numericVal]);

  const display = isNaN(numericVal) ? value : (
    numericVal % 1 !== 0 ? count.toFixed(2) : Math.floor(count)
  ) + suffix;

  return (
    <div ref={ref} className="text-center group cursor-default">
      <motion.p
        className="text-4xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
      >
        {display}
      </motion.p>
      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
};

// ─── Magnetic social button ───────────────────────────────────────────────────
const MagneticLink = ({ href, label, icon: Icon, isEmail }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={!isEmail ? '_blank' : undefined}
      rel={!isEmail ? 'noopener noreferrer' : undefined}
      aria-label={label}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.9 }}
      className="p-3 bg-slate-900/80 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-colors duration-200 block"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const name     = import.meta.env.VITE_APP_NAME     || 'Aasiyah Syed';
  const role     = import.meta.env.VITE_APP_ROLE     || 'Python & AI Developer';
  const github   = import.meta.env.VITE_APP_GITHUB   || 'https://github.com/aasiyahalisyed';
  const linkedin = import.meta.env.VITE_APP_LINKEDIN || 'https://www.linkedin.com/in/aasiyahalisyed';
  const email    = import.meta.env.VITE_APP_EMAIL    || 'aasiyahalisyed@gmail.com';
  const cvUrl    = import.meta.env.VITE_APP_CV_URL   || '/cv/aasiyah-cv.pdf';

  const stats = [
    { value: '6+',   label: 'Projects Built' },
    { value: '2+',   label: 'Certifications' },
    { value: '3.94', label: 'CGPA' },
    { value: '1+',   label: 'AI Course' },
  ];

  const socials = [
    { icon: FiGithub,   href: github,           label: 'GitHub',   isEmail: false },
    { icon: FiLinkedin, href: linkedin,          label: 'LinkedIn', isEmail: false },
    { icon: Mail,       href: `mailto:${email}`, label: 'Email',    isEmail: true  },
  ];

  const subtitles = [
    'Python & FastAPI Specialist',
    'ML / DL & Automation Engineer',
    'AI Integration & Intelligent APIs',
    'SQL / NoSQL Database Architect',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 network-bg opacity-40" />

      {/* background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[150px]" />
        {/* extra premium orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-violet-500/8 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
        {/* top glow bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-20 bg-gradient-to-b from-indigo-500/8 to-transparent blur-sm" />
      </div>

      <div className="section-container relative z-10 pt-28 pb-16">
        <div className="max-w-5xl mx-auto text-center">

          {/* available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 text-sm font-medium mb-10 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-slate-300">Available for new projects</span>
          </motion.div>

          {/* name */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
            style={{ minHeight: '1.2em' }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9]">
              <AnimatedName name={name} />
            </h1>
          </motion.div>

          {/* role + typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 mb-8"
          >
            <p className="text-xl md:text-2xl text-slate-400">
              <span className="text-white font-semibold">{role}</span>
              <span className="mx-3 text-slate-600">·</span>
              <TypeWriter words={subtitles} />
            </p>
          </motion.div>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-12"
          >
            Specializing in Python-powered AI automation, ML/DL systems, intelligent API integration,
            and FastAPI backends. Currently doing an internship of my role.
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="portfolio" smooth offset={-80}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 text-base px-8 py-4 shadow-lg shadow-indigo-500/20"
              >
                View My Projects
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>
            <motion.a
              href={cvUrl}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary flex items-center gap-2 text-base px-8 py-4"
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.a>
          </motion.div>

          {/* magnetic social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-20"
          >
            {socials.map((s) => (
              <MagneticLink key={s.label} {...s} />
            ))}
          </motion.div>

          {/* animated stat counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-800/50"
          >
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
