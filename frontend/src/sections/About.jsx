import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, ExternalLink } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import profileImg from '../assets/profile.png';

const AnimatedName = ({ name }) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: -35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="inline-block font-bold text-base bg-gradient-to-r from-indigo-300 via-sky-400 to-indigo-500 bg-clip-text text-transparent"
    >
      {name}
    </motion.span>
  );
};

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const id = Date.now() + Math.random();
      const colors = ['#6366f1', '#818cf8', '#3b82f6', '#06b6d4', '#a78bfa', '#38bdf8'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 9 + 4;
      setParticles((prev) => [
        ...prev.slice(-20),
        { id, x: e.clientX, y: e.clientY, color, size },
      ]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.85, scale: 1, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ opacity: 0, scale: 0.1, y: p.y - p.size / 2 - 35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const masteryPoints = [
  { label: 'AI-integrated API design & automation', icon: '🤖' },
  { label: 'FastAPI REST API Development', icon: '⚡' },
  { label: 'SQL & NoSQL database architecture', icon: '🗄️' },
  { label: 'MongoDB Atlas integration', icon: '🍃' },
  { label: 'Machine Learning & Deep Learning', icon: '🧠' },
  { label: 'Automation pipelines & workflow engineering', icon: '⚙️' },
  { label: 'Recommendation systems & intelligent chatbots', icon: '💬' },
];

const About = () => {
  const email    = import.meta.env.VITE_APP_EMAIL    || 'aasiyahalisyed@gmail.com';
  const github   = import.meta.env.VITE_APP_GITHUB   || '#';
  const linkedin = import.meta.env.VITE_APP_LINKEDIN || '#';

  return (
    <>
      <CursorTrail />

      <section id="about" className="py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 network-bg opacity-20" />

        {/* ── Premium background blobs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 rounded-full bg-indigo-600/10 blur-[100px]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-600/5 blur-[130px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="section-container relative z-10">

          {/* ── Section heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              The Intersection of{' '}
              <span className="gradient-text">Vision & Intelligence</span>
            </h2>
          </motion.div>

          {/* ── Profile image — BIGGER circle ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-20"
          >
            <div className="relative">

              {/* outer spinning conic ring */}
              <motion.div
                className="absolute -inset-[5px] rounded-full z-0"
                style={{
                  background: 'conic-gradient(from 0deg, #6366f1, #3b82f6, #06b6d4, #a78bfa, #6366f1)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-slate-950" />
              </motion.div>

              {/* second counter-rotating ring — dashed style */}
              <motion.div
                className="absolute -inset-[14px] rounded-full z-0"
                style={{
                  border: '1.5px dashed rgba(99,102,241,0.35)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* glow behind image */}
              <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl -z-10 scale-125" />

              {/* ── MAIN IMAGE — w-72 h-72 (was w-44/w-56) ── */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl shadow-primary-500/30 z-10">
                <img
                  src={profileImg}
                  alt="Aasiyah Syed"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                {/* subtle inner glow overlay */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border border-slate-700 rounded-full shadow-lg backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[11px] text-slate-300 font-medium">Available</span>
              </motion.div>

              {/* floating stat badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 px-3 py-2 bg-slate-900/90 border border-indigo-500/30 rounded-xl shadow-lg backdrop-blur-sm text-center"
              >
                <p className="text-lg font-bold text-indigo-400">3.94</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider">CGPA</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 px-3 py-2 bg-slate-900/90 border border-cyan-500/30 rounded-xl shadow-lg backdrop-blur-sm text-center"
              >
                <p className="text-lg font-bold text-cyan-400">6+</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider">Projects</p>
              </motion.div>

            </div>
          </motion.div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Who I Am */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              {/* card glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-inherit" />

              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full" />
                Who I Am
              </h3>

              <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                I am <AnimatedName name="Aasiyah Syed" />, a Python and AI Developer with a focus on
                automation, ML/DL, intelligent API integration, and AI-driven business workflows.
              </p>

              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                I hold two certifications from Alison.com and completed an advanced AI course
                with TechNexus Virtual University. I build production-ready systems with FastAPI,
                SQL/NoSQL databases like MongoDB, and high-impact AI solutions.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors group/link"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover/link:bg-indigo-600/20 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm truncate">{email}</span>
                </a>

                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">Karachi, Sindh, Pakistan</span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
                  >
                    <FiGithub className="w-4 h-4" />
                    GitHub
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
                  >
                    <FiLinkedin className="w-4 h-4" />
                    LinkedIn
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Areas of Mastery */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                Areas of Mastery
              </h3>

              <div className="space-y-1.5">
                {masteryPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group/item cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary-600/25 transition-colors text-sm">
                      {point.icon}
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                      {point.label}
                    </span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500/0 group-hover/item:bg-primary-500 transition-colors flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
};

export default About;
