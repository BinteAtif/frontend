import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Timeline from './sections/Timeline';
import Certifications from './sections/Certifications';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import AIChat from './components/AIChat';
import ScrollToTop from './components/ScrollToTop';
import NeuralNetworkBg from './components/NeuralNetworkBg';

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const fn = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <div
      className="mouse-glow"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  );
};

function App() {
  const name = import.meta.env.VITE_APP_NAME || 'Aasiyah Syed';

  return (
    <div className="relative bg-slate-950 min-h-screen overflow-x-hidden">
      <NeuralNetworkBg />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Certifications />
        <Skills />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <AIChat />
      <ScrollToTop />
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center">
        <p className="text-slate-600 text-sm">
          © 2026 {name} · Built with React, TailwindCSS & Groq AI
        </p>
      </footer>
    </div>
  );
}

export default App;
