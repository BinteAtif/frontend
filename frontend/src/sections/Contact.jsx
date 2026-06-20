import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Copy, Check, Loader2, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const email    = import.meta.env.VITE_APP_EMAIL    || 'aasiyahalisyed@gmail.com';
  const github   = import.meta.env.VITE_APP_GITHUB   || 'https://github.com/BinteAtif';
  const linkedin = import.meta.env.VITE_APP_LINKEDIN || 'https://www.linkedin.com/in/aasiyah-ali-syed-370754411/';

  const [copied, setCopied]   = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState('');
  const [form, setForm]       = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSent(true);
    setSending(false);
    toast.success('Message sent! I will reply within 24 hours. 🚀');
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      glow: 'rgba(99,102,241,0.18)',
      iconBg: 'bg-indigo-600/20',
      iconColor: 'text-indigo-400',
      border: 'hover:border-indigo-500/40',
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'aasiyahalisyed',
      href: github,
      glow: 'rgba(148,163,184,0.15)',
      iconBg: 'bg-slate-600/30',
      iconColor: 'text-slate-300',
      border: 'hover:border-slate-500/40',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: linkedin,
      glow: 'rgba(59,130,246,0.18)',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      border: 'hover:border-blue-500/40',
    },
  ];

  const inputClass = (field) =>
    `w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all duration-200 resize-none ${
      focused === field
        ? 'border-indigo-500/60 ring-1 ring-indigo-500/25 bg-slate-800/90'
        : 'border-slate-700/50 hover:border-slate-600/60'
    }`;

  return (
    <section id="contact" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 network-bg opacity-20" />

      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-indigo-600/8 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title mb-4">
              Let's <span className="gradient-text">Work Together</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Open to collaboration, freelance projects, and full-time opportunities.
              Let's build something intelligent together.
            </p>
          </motion.div>

          {/* availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for new projects · Replies within 24h
            </div>
          </motion.div>

          {/* contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {contacts.map(({ icon: Icon, label, value, href, glow, iconBg, iconColor, border }, i) => (
              <motion.a
                key={i}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, boxShadow: `0 12px 36px ${glow}` }}
                className={`glass-card p-6 text-center transition-all duration-300 group block ${border}`}
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ duration: 0.25 }}
                  className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </motion.div>
                <h4 className="text-sm font-bold text-white mb-1">{label}</h4>
                <p className="text-slate-400 text-xs truncate">{value}</p>
              </motion.a>
            ))}
          </div>

          {/* form + cta */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 relative overflow-hidden"
            >
              {/* card top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/60 via-blue-400/40 to-transparent" />

              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full" />
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <Check className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-white font-bold text-lg mb-2">Message Sent! 🚀</h4>
                    <p className="text-slate-400 text-sm">I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-medium text-slate-400 block mb-1.5">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        placeholder="John Doe"
                        className={inputClass('name')}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 block mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        rows="4"
                        placeholder="Tell me about your project..."
                        className={inputClass('message')}
                      />
                      <p className="text-[10px] text-slate-600 mt-1 text-right">
                        {form.message.length} / 500
                      </p>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: sending ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-60 relative overflow-hidden"
                    >
                      {sending ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* card top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/60 via-cyan-400/40 to-transparent" />

              {/* floating sparkle */}
              <motion.div
                className="absolute top-6 right-6 text-indigo-400/30"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>

              <div className="text-center flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-400 text-xs">Gujranwala, Punjab, Pakistan</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                  Ready to collaborate?
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs">
                  I reply within 24 hours. Whether it's a project discussion,
                  freelance work, or just a hello — I'm always happy to connect.
                </p>

                {/* response time badges */}
                <div className="flex items-center gap-3 flex-wrap justify-center mb-8">
                  {[
                    { icon: Clock, text: '< 24h response' },
                    { icon: Check, text: 'Available now' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs text-slate-400">
                      <Icon className="w-3 h-3 text-indigo-400" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center justify-center gap-2 py-3 w-full"
                >
                  <Send className="w-4 h-4" />
                  Send Email
                </motion.a>
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary flex items-center justify-center gap-2 py-3 w-full"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <Check className="w-4 h-4" /> Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" /> Copy Email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <p className="text-slate-600 text-xs text-center font-mono pt-1">{email}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;