import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'Car Rental Recommendation System',
    category: 'AI / ML',
    description: 'AI-powered recommendation engine that suggests similar cars based on category and price using content-based filtering, cosine similarity, and FastAPI.',
    images: ['/projects/car-rental-1.webp', '/projects/car-rental-2.webp'],
    tags: ['Python', 'FastAPI', 'MongoDB', 'Scikit-learn', 'Pandas'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Car_Rental_Web_Application_-Project-',
    featured: false,
  },
  {
    title: 'Miller Dental AI Features',
    category: 'AI / ML',
    description: 'Automated dental clinic management system with AI-powered appointment scheduling, patient record management, and dental image analysis using FastAPI and Scikit-learn.',
    images: ['/projects/dental-1.webp', '/projects/dental-2.webp'],
    tags: ['Python', 'FastAPI', 'MongoDB', 'Scikit-learn'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Miller-Dental-Clinic-Automation',
    featured: false,
  },
  {
    title: 'AI Notepad',
    category: 'AI / ML',
    description:'AI-powered note-taking app with text summarization, keyword extraction, and sentiment analysis using Hugging Face Transformers and Streamlit.',
    images: ['/projects/notepad-ai.png'],
    tags: ['Python', 'Sqlite DB', 'Hugging Face Transformers', 'Streamlit'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/AI-Notepad',
    featured: true,
  },
  {
    title: 'Library Management System',
    category: 'SQL / Database',
    description: 'Comprehensive library management system with user authentication, book inventory, borrowing/returning features, and admin dashboard using FastAPI and PostgreSQL.',
    images: ['/projects/library-management-system.png'],
    tags: ['FastAPI', 'PostgreSQL', 'SQL', 'Authentication'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Library-Management-System',
    featured: true,
  },
  {
    title: 'Screen Recorder',
    category: 'Python/Libraries',
    description: 'A simple screen recording application built with Python and OpenCV.',
    images: ['/projects/screen-recorder-1.png'],
    tags: ['Python', 'OpenCV', 'Tkinter'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Python-Projects/tree/main/Python%20Projects/Screen%20Recorder',
    featured: false,
  },
  {
    title: 'QR Code Generator',
    category: 'Python / Libraries',
    description: 'A simple QR code generator application built with Python and Tkinter.',
    images: ['/projects/myqr.png'],
    tags: ['Python', 'Tkinter'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Python-Projects/tree/main/Python%20Projects/QR%20Code%20Genereator',
    featured: false,
  },
  {
    title: 'Nexora Store AI Features',
    category: 'Python / Libraries',
    description: 'A Ecommerce store management system with AI-powered product recommendation, semantic search, and More to Love Ai Suggestions using FastAPI and Scikit-learn.',
    images: ['/projects/nexora-ai.webp'],
    tags: ['Python', 'FastAPI', 'MongoDB', 'Scikit-learn'],
    liveUrl: '',
    githubUrl: 'https://github.com/BinteAtif/Nexora-AI-Store-Project',
    featured: false,

  },
];

const categoryColors = {
  'AI / ML':          { dot: 'bg-indigo-400',  badge: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25' },
  'AI / Healthcare':  { dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  'Computer Vision':  { dot: 'bg-rose-400',    badge: 'text-rose-400 bg-rose-500/10 border-rose-500/25' },
  'NLP':              { dot: 'bg-amber-400',   badge: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
  'Machine Learning': { dot: 'bg-cyan-400',    badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' },
};

const getCategoryStyle = (cat) =>
  categoryColors[cat] || { dot: 'bg-slate-400', badge: 'text-slate-400 bg-slate-500/10 border-slate-500/25' };

// ── Lightbox ────────────────────────────────────────────────────────────────
const LightBox = ({ images, title, onClose }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(p => (p - 1 + images.length) % images.length);
  const next = () => setCurrent(p => (p + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={images[current]}
          alt={`${title} ${current + 1}`}
          className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 rounded-full text-white hover:bg-indigo-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 rounded-full text-white hover:bg-indigo-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-indigo-400 w-6' : 'bg-slate-600 w-1.5'}`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Image placeholder ────────────────────────────────────────────────────────
const ImageSkeleton = ({ category }) => {
  const style = getCategoryStyle(category);
  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${style.badge.split(' ').slice(1).join(' ')}`}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiGithub className="w-6 h-6 opacity-50" />
      </motion.div>
      <p className="text-slate-600 text-xs">Preview coming soon</p>
    </div>
  );
};

// ── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [lightbox, setLightbox] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasImage = project.images.length > 0 && !imgError;
  const style = getCategoryStyle(project.category);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="group glass-card overflow-hidden relative flex flex-col"
        style={{
          boxShadow: hovered ? '0 16px 48px rgba(99,102,241,0.12)' : '0 0 0 transparent',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* featured ribbon */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-bold uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5" />
            Featured
          </div>
        )}

        {/* image */}
        <div
          className="aspect-video overflow-hidden relative bg-slate-900 cursor-pointer flex-shrink-0"
          onClick={() => hasImage && setLightbox(true)}
        >
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 animate-pulse bg-slate-800" />
          )}
          {hasImage ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className={`w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
            />
          ) : (
            <ImageSkeleton category={project.category} />
          )}

          {/* hover overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-3"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {hasImage && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30"
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.button>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-700 rounded-full"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-700 rounded-full"
              >
                <FiGithub className="w-5 h-5 text-white" />
              </motion.a>
            )}
          </motion.div>

          {/* category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${style.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {project.category}
            </span>
          </div>

          {/* image count */}
          {project.images.length > 1 && !imgError && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="px-2 py-0.5 bg-slate-900/80 text-[10px] text-slate-400 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                {project.images.length} imgs
              </span>
            </div>
          )}
        </div>

        {/* content */}
        <div className="p-5 flex flex-col flex-1">
          <h4 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
            {project.title}
          </h4>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 5).map((tag, i) => (
              <span
                key={i}
                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700/50 hover:border-slate-500 transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-slate-500 rounded-md border border-slate-700/30">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* links */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <FiGithub className="w-3.5 h-3.5" />
                Source Code
              </a>
            ) : (
              <span className="text-xs text-slate-600 italic">Private Repo</span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors ml-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <LightBox images={project.images} title={project.title} onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ── Portfolio section ─────────────────────────────────────────────────────────
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 network-bg opacity-20" />

      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-indigo-600/8 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px]"
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
          <span className="section-tag">Selected Deployments</span>
          <h2 className="section-title">
            Projects That <span className="gradient-text">Matter</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm">
            Real-world AI systems built with production-grade architecture and clean code.
          </p>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-5 mb-10"
        >
          {[
            { label: 'Total Projects',  value: projects.length },
            { label: 'Live Demos',      value: projects.filter(p => p.liveUrl).length },
            { label: 'Open Source',     value: projects.filter(p => p.githubUrl).length },
            { label: 'Featured',        value: projects.filter(p => p.featured).length },
          ].map(stat => (
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
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => {
            const style = getCategoryStyle(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                {cat !== 'All' && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : style.dot}`} />
                )}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Portfolio;