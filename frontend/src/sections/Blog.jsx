import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Tag, BookOpen, Eye, Heart } from 'lucide-react';

const posts = [
  {
    title: 'Building an AI Car Rental Recommendation system',
    date: 'May 2026',
    readTime: '6 min read',
    excerpt: 'How I built a content-based filtering system using cosine similarity and FastAPI to recommend cars based on category and price.',
    tag: 'AI / ML',
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
    dotColor: 'bg-indigo-400',
    glow: 'rgba(99,102,241,0.15)',
    views: '1.2k',
    likes: 38,
    featured: false,
  },
  {
    title: 'Integrating Groq AI into FastAPI — A Practical Guide',
    date: 'May 2026',
    readTime: '8 min read',
    excerpt: 'Step-by-step guide to building an AI-powered portfolio chatbot using Groq LLaMA 3.1 with FastAPI stateless backend.',
    tag: 'Tutorial',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    dotColor: 'bg-emerald-400',
    glow: 'rgba(16,185,129,0.15)',
    views: '2.4k',
    likes: 61,
    featured: true,
  },
  {
    title: 'Stateless AI Chat Architecture for Multi-User Systems',
    date: 'May 2026',
    readTime: '5 min read',
    excerpt: 'Why storing chat history on the frontend instead of the backend is the right approach for scalable AI chatbot systems.',
    tag: 'Architecture',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    dotColor: 'bg-amber-400',
    glow: 'rgba(245,158,11,0.15)',
    views: '980',
    likes: 27,
    featured: false,
  },
];

const BlogCard = ({ post, index }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card overflow-hidden cursor-pointer group relative flex flex-col"
      style={{
        boxShadow: hovered ? `0 16px 48px ${post.glow}` : '0 0 0 transparent',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      {/* top color bar */}
      <motion.div
        className={`h-0.5 w-full bg-gradient-to-r ${
          post.tag === 'AI / ML'      ? 'from-indigo-500 via-blue-400 to-transparent' :
          post.tag === 'Tutorial'     ? 'from-emerald-500 via-teal-400 to-transparent' :
                                        'from-amber-500 via-yellow-400 to-transparent'
        }`}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      />

      {/* featured ribbon */}
      {post.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
          ✦ Featured
        </div>
      )}

      {/* hover shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${post.glow} 0%, transparent 65%)`,
        }}
      />

      <div className="p-6 flex flex-col flex-1 relative z-10">

        {/* top meta row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {post.date}
            </div>
            <span className="text-slate-700">·</span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <BookOpen className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>
          <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${post.tagColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${post.dotColor}`} />
            {post.tag}
          </span>
        </div>

        {/* title */}
        <h4 className="text-base font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
          {post.title}
        </h4>

        {/* excerpt */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {post.excerpt}
        </p>

        {/* bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <motion.div
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors"
          >
            Read Article
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* views */}
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Eye className="w-3 h-3" />
              {post.views}
            </div>

            {/* like button */}
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.85 }}
              className="flex items-center gap-1 text-xs transition-colors"
            >
              <motion.span
                animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${liked ? 'text-rose-400 fill-rose-400' : 'text-slate-600'}`}
                />
              </motion.span>
              <span className={liked ? 'text-rose-400' : 'text-slate-600'}>
                {likeCount}
              </span>
            </motion.button>
          </div>
        </div>

      </div>
    </motion.article>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 network-bg opacity-20" />

      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 right-16 w-72 h-72 bg-indigo-600/8 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-64 h-64 bg-emerald-500/8 rounded-full blur-[100px]"
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
          className="text-center mb-12"
        >
          <span className="section-tag">Technical Insights</span>
          <h2 className="section-title">
            From the <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
            Deep dives into AI engineering, system design, and lessons learned building real-world ML projects.
          </p>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-5 mb-12"
        >
          {[
            { label: 'Articles',    value: posts.length },
            { label: 'Total Views', value: '4.6k' },
            { label: 'Topics',      value: new Set(posts.map(p => p.tag)).size },
          ].map(stat => (
            <div key={stat.label} className="text-center px-6 py-2 glass-card">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">More articles coming soon — stay tuned</p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-slate-700"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Blog;