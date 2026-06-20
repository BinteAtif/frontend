import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, ChevronDown } from 'lucide-react';

const experiences = [
  {
    title: 'AI Developer Intern',
    company: 'TechNexus Virtual University',
    period: 'March 2026 – Present',
    badge: 'Current',
    description:
      'Building AI-powered automation and ML/DL systems with Python, FastAPI, SQL/NoSQL architectures, MongoDB, and API-first integration patterns, building real world projects',
    tags: ['Python', 'FastAPI', 'MongoDB', 'SQL', 'NoSQL', 'Automation', 'ML', 'DL'],
    icon: Briefcase,
    color: 'primary',
  },
];

const education = [
  {
    title: 'Home Schooled',
    badge: 'In Progress',
    description:'Maths, English, Science, Computer Science, and more. Focused on self-directed learning and real-world projecsts in AI, ML, and software development. Self-Learnign by online courses and platforms like alison, simplelearn, coursera, udemy, and more. Building a strong foundation in core subjects while pursuing my passion for technology and innovation.',
    tags: ['ML', 'AI Systems', 'Software Eng', 'Python', 'AI', 'Maths'],
    icon: GraduationCap,
    color: 'blue',
  },
];

const badgeColor = {
  Current:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  'In Progress': 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
  Completed:  'bg-slate-700/60    text-slate-400  border border-slate-600/40',
};

const TimelineItem = ({ item, index, accentClass, dotClass, tagClass }) => {
  const Icon = item.icon;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      {/* vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-700/50 to-transparent" />

      {/* animated dot */}
      <motion.div
        className={`absolute left-[-5px] top-4 w-[11px] h-[11px] rounded-full border-2 bg-slate-950 ${dotClass}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.13 + 0.2, type: 'spring', stiffness: 300 }}
      >
        {/* pulse ring on dot */}
        <motion.span
          className={`absolute inset-[-4px] rounded-full ${dotClass.replace('border-', 'bg-').replace('-500', '-500/20')}`}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* card */}
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(99,102,241,0.12)' }}
        transition={{ duration: 0.25 }}
        className="glass-card p-5 cursor-pointer relative overflow-hidden group"
        onClick={() => setExpanded(!expanded)}
      >
        {/* hover shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 60%)',
          }}
        />

        {/* top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl flex-shrink-0 ${accentClass}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                {item.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor[item.badge]}`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <p className={`text-xs mt-0.5 font-medium ${tagClass}`}>{item.company}</p>
              {item.meta && (
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {item.meta}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-lg text-xs text-slate-400 flex-shrink-0">
              <Calendar className="w-3 h-3" />
              {item.period}
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-slate-500"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* expandable body */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="text-slate-400 text-sm leading-relaxed pl-11 pt-3">
            {item.description}
          </p>
          {item.tags && (
            <div className="flex flex-wrap gap-1.5 pl-11 pt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* collapsed preview line */}
        {!expanded && (
          <p className="text-slate-500 text-xs pl-11 pt-2 truncate">
            {item.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

const SectionHeader = ({ icon: Icon, title, accentClass, iconBg }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-3 mb-8"
  >
    <div className={`p-2.5 rounded-xl ${iconBg}`}>
      <Icon className={`w-5 h-5 ${accentClass}`} />
    </div>
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    <div className={`flex-1 h-px bg-gradient-to-r ${
      title === 'Experience'
        ? 'from-indigo-500/30 to-transparent'
        : 'from-blue-500/30 to-transparent'
    }`} />
  </motion.div>
);

const Timeline = () => {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-0 w-80 h-80 bg-indigo-600/8 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-0 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        {/* grid */}
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
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Professional Runtime Logs</span>
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3">Click any card to expand details</p>
        </motion.div>

        {/* two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Experience */}
          <div id="experience">
            <SectionHeader
              icon={Briefcase}
              title="Experience"
              accentClass="text-indigo-400"
              iconBg="bg-indigo-600/20"
            />
            <div className="relative pl-4">
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={i}
                  item={exp}
                  index={i}
                  accentClass="bg-indigo-600/20 text-indigo-400"
                  dotClass="border-indigo-500"
                  tagClass="text-indigo-400"
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education">
            <SectionHeader
              icon={GraduationCap}
              title="Education"
              accentClass="text-blue-400"
              iconBg="bg-blue-600/20"
            />
            <div className="relative pl-4">
              {education.map((edu, i) => (
                <TimelineItem
                  key={i}
                  item={edu}
                  index={i}
                  accentClass="bg-blue-600/20 text-blue-400"
                  dotClass="border-blue-500"
                  tagClass="text-blue-400"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;