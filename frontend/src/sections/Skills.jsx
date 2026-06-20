import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  { name: 'Python',          level: 90, category: 'Language',  gradient: 'from-violet-500 to-purple-600',   glow: 'rgba(139,92,246,0.35)'  },
  { name: 'Machine Learning',level: 85, category: 'AI/ML',     gradient: 'from-indigo-500 to-blue-500',     glow: 'rgba(99,102,241,0.35)'  },
  { name: 'Deep Learning',   level: 75, category: 'AI/ML',     gradient: 'from-blue-500 to-cyan-500',       glow: 'rgba(56,189,248,0.35)'  },
  { name: 'FastAPI',         level: 82, category: 'Backend',   gradient: 'from-green-500 to-emerald-500',   glow: 'rgba(16,185,129,0.35)'  },
  { name: 'MongoDB',         level: 80, category: 'Database',  gradient: 'from-orange-500 to-amber-500',    glow: 'rgba(245,158,11,0.35)'  },
  { name: 'SQL',             level: 78, category: 'Database',  gradient: 'from-slate-500 to-slate-400',     glow: 'rgba(148,163,184,0.25)'  },
  { name: 'NoSQL / MongoDB', level: 82, category: 'Database',  gradient: 'from-teal-500 to-cyan-500',       glow: 'rgba(20,184,166,0.35)'  },
  { name: 'Pandas & NumPy',  level: 88, category: 'Data',      gradient: 'from-cyan-500 to-teal-500',       glow: 'rgba(6,182,212,0.35)'   },
  { name: 'Scikit-learn',    level: 78, category: 'AI/ML',     gradient: 'from-blue-500 to-indigo-500',     glow: 'rgba(59,130,246,0.35)'  },
  { name: 'Data Analysis',   level: 82, category: 'Analytics', gradient: 'from-pink-500 to-rose-500',       glow: 'rgba(244,63,94,0.35)'   },
  { name: 'Automation',      level: 75, category: 'AI/ML',     gradient: 'from-emerald-500 to-lime-500',     glow: 'rgba(132,204,22,0.35)'  },
  { name: 'AI Integration',  level: 80, category: 'AI/ML',     gradient: 'from-indigo-400 to-violet-500',   glow: 'rgba(129,140,248,0.35)'  },
  { name: 'REST APIs',       level: 80, category: 'Backend',   gradient: 'from-emerald-500 to-green-400',   glow: 'rgba(52,211,153,0.35)'  },
];

const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

const getLevelLabel = (level) => {
  if (level >= 85) return { text: 'Expert',    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' };
  if (level >= 75) return { text: 'Advanced',  color: 'text-indigo-400  bg-indigo-500/10  border-indigo-500/25'  };
  return               { text: 'Proficient', color: 'text-amber-400   bg-amber-500/10   border-amber-500/25'   };
};

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const label = getLevelLabel(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card p-5 cursor-default relative overflow-hidden group"
      style={{
        boxShadow: hovered ? `0 8px 32px ${skill.glow}` : '0 0 0 transparent',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* hover gradient shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${skill.glow.replace('0.35', '0.06')} 0%, transparent 70%)`,
        }}
      />

      {/* animated corner accent */}
      <motion.div
        className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-bl ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* top row */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div>
          <h4 className="font-semibold text-white text-sm group-hover:text-white transition-colors">
            {skill.name}
          </h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
            {skill.category}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-base font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}>
            {skill.level}%
          </span>
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${label.color}`}>
            {label.text}
          </span>
        </div>
      </div>

      {/* progress track */}
      <div className="relative z-10">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.3 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full relative`}
          >
            {/* shimmer sweep on bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.8, delay: 1.2 + index * 0.04, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* tick marks */}
        <div className="flex justify-between mt-1.5 px-0.5">
          {[25, 50, 75, 100].map(tick => (
            <span
              key={tick}
              className={`text-[8px] ${skill.level >= tick ? 'text-slate-500' : 'text-slate-700'}`}
            >
              {tick}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 network-bg opacity-20" />

      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 bg-violet-600/8 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-tag">Mastery Breakdown</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { label: 'Total Skills', value: skills.length },
            { label: 'Expert Level', value: skills.filter(s => s.level >= 85).length },
            { label: 'Avg. Mastery', value: Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length) + '%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-5 py-2 glass-card">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;