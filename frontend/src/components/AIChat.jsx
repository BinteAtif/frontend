// frontend/src/components/AIChat.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Trash2, Sparkles, Minimize2 } from 'lucide-react';
import { chatApi } from '../services/chatApi';

const ownerName = import.meta.env.VITE_APP_NAME?.split(' ')[0] || 'Aasiyah';
const WELCOME = `Hi! I'm ${ownerName}'s AI assistant. Ask me anything about her Python, AI, ML/DL, or FastAPI projects! 🚀`;

const quickQuestions = [
  'What AI projects has she built?',
  'What are her top skills?',
  'Is she available for hire?',
];

// ── Typing dots ──────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex gap-1 items-center px-1 py-0.5">
    {[0, 0.18, 0.36].map((d, i) => (
      <motion.span
        key={i}
        className="w-2 h-2 bg-indigo-400 rounded-full"
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: d, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ── Message bubble ────────────────────────────────────────────────────────────
const MessageBubble = ({ msg, isNew }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[88%] gap-2 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* avatar */}
        <div className={`w-6 h-6 rounded-lg flex-shrink-0 mb-0.5 flex items-center justify-center ${
          isUser ? 'bg-indigo-600' : 'bg-slate-700 border border-slate-600/50'
        }`}>
          {isUser
            ? <User className="w-3 h-3 text-white" />
            : <Bot className="w-3 h-3 text-indigo-400" />}
        </div>

        {/* bubble */}
        <div className={`px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-2xl rounded-br-sm shadow-lg shadow-indigo-500/20'
            : 'bg-slate-800/90 text-slate-200 rounded-2xl rounded-bl-sm border border-slate-700/50'
        }`}>
          {msg.content}
          {msg.model && (
            <div className="text-[9px] opacity-30 mt-1.5 font-mono tracking-wide">
              {msg.model}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const AIChat = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [{ role: 'assistant', content: WELCOME }];
    } catch {
      return [{ role: 'assistant', content: WELCOME }];
    }
  });

  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [error, setError]       = useState(null);
  const [unread, setUnread]     = useState(0);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    try { localStorage.setItem('chatHistory', JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) { setUnread(0); inputRef.current?.focus(); }
  }, [isOpen]);

  const handleSend = async (text = input) => {
    const msg = text.trim();
    if (!msg || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await chatApi.sendMessage(msg, history);
      if (res.status !== 'success') throw new Error('Bad response');
      setMessages(prev => [...prev, { role: 'assistant', content: res.bot_response, model: res.model }]);
      if (!isOpen) setUnread(u => u + 1);
    } catch {
      setError('Cannot connect to AI server.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again!',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{ role: 'assistant', content: WELCOME }]);
    localStorage.removeItem('chatHistory');
    setError(null);
  };

  // ── Floating button (closed state) ────────────────────────────────────────
  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-2xl shadow-indigo-600/35 transition-colors duration-200"
        aria-label="Open AI Chat"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full" />
        </div>
        <span className="text-white font-semibold text-sm">{ownerName} Agent</span>
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>
    );
  }

  // ── Chat window ──────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[390px] bg-slate-900 rounded-2xl shadow-2xl shadow-black/50 border border-slate-700/60 flex flex-col overflow-hidden"
      style={{ height: minimized ? 'auto' : '560px' }}
    >
      {/* top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/70 border-b border-slate-700/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative p-1.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25">
            <Bot className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
              {ownerName} AI Agent
              <Sparkles className="w-3 h-3 text-indigo-400" />
            </h3>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
              Online · Powered by Groq AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearHistory}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-rose-400"
            title="Clear history"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMinimized(m => !m)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
            title={minimized ? 'Expand' : 'Minimize'}
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Body (hidden when minimized) ── */}
      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isNew={i === messages.length - 1} />
              ))}

              {/* typing indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-lg bg-slate-700 border border-slate-600/50 flex items-center justify-center mb-0.5">
                        <Bot className="w-3 h-3 text-indigo-400" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-800/90 border border-slate-700/50">
                        <TypingDots />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center px-3 py-2 bg-rose-900/30 border border-rose-700/40 rounded-xl text-rose-300 text-xs"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={endRef} />
            </div>

            {/* quick questions */}
            {messages.length <= 2 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 pb-3 flex flex-wrap gap-1.5"
              >
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-700/60 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </motion.div>
            )}

            {/* input */}
            <div className="px-3 pb-3 pt-2 bg-slate-900/80 border-t border-slate-800/60 flex-shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && !isLoading && handleSend()}
                  placeholder={isLoading ? 'Thinking...' : 'Ask me anything...'}
                  disabled={isLoading}
                  className="flex-1 bg-slate-800/80 border border-slate-700/60 rounded-xl pl-4 pr-12 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>
              <p className="text-[9px] text-slate-600 text-center mt-2">
                Powered by Groq · LLaMA 3.1
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIChat;