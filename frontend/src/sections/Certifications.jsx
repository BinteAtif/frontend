import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, Calendar } from 'lucide-react';

const certifications = [
  {
    title: 'Python For Beginners Certification',
    issuer: 'Alison.com',
    year: '2025',
    description:
      'Completed an Alison.com certification covering Python programming, Practiicng [Python Libraries and understanding speech recogniiontion, natural language processing, and AI concepts for practical applications.',
    credentialUrl: 'https://alison.com',
    color: 'indigo',
  },
  {
    title: 'Starting Python Programming Certification',
    issuer: 'Alison.com',
    year: '2024',
    description:
      'Earned a certification from Alison.com for mastering Python programming fundamentals, including syntax, data structures, and basic algorithms, with a focus on AI applications.',
    credentialUrl: 'https://alison.com',
    color: 'cyan',
  },
  {
    title: 'Python Coding Course',
    issuer: 'Radiant Tarbiyah',
    year: '2023',
    description:
      'Completed an Introductory Python coding course at Radiant Tarbiyah, gaining foundational programming skills and understanding of Python syntax, data types, and basic programming concepts.',
    credentialUrl: 'https://www.facebook.com/RadiantTarbiyah/',
    color: 'violet',
  },  
  {
    title: 'Mastering Python for AI Certification',
    issuer: 'Technexus Virtual University',
    year: '2023',
    description:
      'Completed a comprehensive certification course on mastering Python for AI applications, covering advanced topics in machine learning and data science.',
    credentialUrl: 'https://www.technexusvu.com/',
    color: 'emerald',
  },
  



];

const colorMap = {
  indigo:  { dot: 'bg-indigo-400',  badge: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',   line: 'from-indigo-500/40',   glow: 'rgba(99,102,241,0.15)'  },
  cyan:    { dot: 'bg-cyan-400',    badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',         line: 'from-cyan-500/40',     glow: 'rgba(6,182,212,0.15)'   },
  violet:  { dot: 'bg-violet-400',  badge: 'text-violet-400 bg-violet-500/10 border-violet-500/25',   line: 'from-violet-500/40',   glow: 'rgba(139,92,246,0.15)'  },
  emerald: { dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', line: 'from-emerald-500/40',  glow: 'rgba(16,185,129,0.15)'  },
  blue:    { dot: 'bg-blue-400',    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/25',         line: 'from-blue-500/40',     glow: 'rgba(59,130,246,0.15)'  },
};

const CertCard = ({ cert, index }) => {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[cert.color];
  const badgeParts = c.badge.split(' ');
  const badgeText = badgeParts[0];
  const badgeBg = badgeParts.slice(1).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      {/* Vertical line */}
      <div className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${c.line} to-transparent`} />

      {/* Animated dot */}
      <motion.div
        className={`absolute left-[-5px] top-5 w-[11px] h-[11px] rounded-full border-2 bg-slate-950`}
        style={{ borderColor: 'currentColor' }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
      >
        <div className={`w-full h-full rounded-full ${c.dot}`} />
        <motion.span
          className={`absolute inset-[-4px] rounded-full ${c.dot} opacity-20`}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="glass-card p-5 relative overflow-hidden group"
        style={{
          boxShadow: hovered ? `0 12px 36px ${c.glow}` : '0 0 0 transparent',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(135deg, ${c.glow} 0%, transparent 65%)` }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-2 rounded-xl flex-shrink-0 ${badgeBg}`}>
                <BadgeCheck className={`w-4 h-4 ${badgeText}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm group-hover:text-indigo-200 transition-colors leading-snug">
                  {cert.title}
                </h4>
                <p className={`text-xs font-semibold mt-1 ${badgeText}`}>
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-lg text-xs text-slate-400 border border-slate-700/40">
                <Calendar className="w-3 h-3" />
                {cert.year}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 bg-slate-800/80 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/40"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed pl-11">
            {cert.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certifications = () => (
  <section id="certifications" className="py-24 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 network-bg opacity-20" />

    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 right-16 w-72 h-72 bg-indigo-600/8 rounded-full blur-[110px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-16 w-64 h-64 bg-cyan-500/8 rounded-full blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </div>

    <div className="section-container relative z-10">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">Verified Learning</span>
          <h2 className="section-title">
            Licenses & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
            Continuously upskilling through industry-recognized certifications and training programs.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-5 mb-12"
        >
          {[
            { label: 'Certifications', value: certifications.length },
            { label: 'Platforms', value: new Set(certifications.map(c => c.issuer.split(' ')[0])).size },
            { label: 'Year', value: '2025+' },
          ].map(s => (
            <div key={s.label} className="text-center px-8 py-3 glass-card">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-4">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Certifications;