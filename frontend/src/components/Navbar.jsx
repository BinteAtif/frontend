import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Zap, Download } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const navLinks = [
    { name: 'About',          to: 'about'          },
    { name: 'Experience',     to: 'experience'     },
    { name: 'Certifications', to: 'certifications' },
    { name: 'Skills',         to: 'skills'         },
    { name: 'Portfolio',      to: 'portfolio'      },
    { name: 'Blog',           to: 'blog'           },
    { name: 'Contact',        to: 'contact'        },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-2xl border-slate-800/80 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent origin-center"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* logo */}
          <Link to="hero" smooth offset={-80} className="flex items-center gap-2.5 cursor-pointer group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="relative p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Aasiyah</span>
              <span className="text-indigo-400">.ai</span>
            </span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                spy
                offset={-80}
                activeClass="active-nav"
                onSetActive={() => setActiveLink(link.to)}
                className="relative px-3 py-2 text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors duration-200 rounded-lg hover:bg-slate-800/50 group"
              >
                {link.name}

                {activeLink === link.to && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {activeLink !== link.to && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-indigo-400/0 group-hover:bg-indigo-400/50 rounded-full transition-all duration-200" />
                )}
              </Link>
            ))}
          </div>

          {/* desktop CV button */}
          <div className="hidden md:block">
            <motion.a
              href={import.meta.env.VITE_APP_CV_URL || '/cv/aasiyah-cv.pdf'}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary py-2 px-5 text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.a>
          </div>

          {/* mobile hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.to}
                    smooth
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer group"
                  >
                    <span>{link.name}</span>
                    <motion.span
                      className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                className="pt-3 px-4 pb-2"
              >
                <a
                  href={import.meta.env.VITE_APP_CV_URL || '/cv/aasiyah-cv.pdf'}
                  download
                  className="btn-primary text-center text-sm flex items-center justify-center gap-2 w-full py-3"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;