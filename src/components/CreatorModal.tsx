import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Coffee, 
  MapPin, 
  Sparkles, 
  Heart, 
  Code2, 
  ExternalLink, 
  ArrowRight,
  Zap,
  Terminal,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(true);

  // Close on Escape key press (UI/UX Pro Max accessibility requirement)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem('aivault_creator_popup_dismissed', 'true');
    }
    onClose();
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        colors: ['#FF4D00', '#FFFFFF', '#000000', '#FFDD00']
      });
    } catch {}
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="creator-modal-title"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* 21st.dev Spring Modal Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="relative w-full max-w-2xl bg-[#000000] text-white border-2 border-white shadow-[10px_10px_0px_#FF4D00] p-6 sm:p-8 z-10 my-8 overflow-hidden select-none"
          >
            {/* Ambient Kinetic Glow on Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF4D00] via-white to-[#FF4D00]" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="absolute top-5 right-5 p-2 bg-white text-black hover:bg-[#FF4D00] border-2 border-black transition-colors focus:ring-2 focus:ring-[#FF4D00] outline-none z-20 cursor-pointer"
              aria-label="Close creator dialog"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            {/* Header Badge Row */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="font-mono text-[11px] font-bold uppercase bg-[#FF4D00] text-black px-3 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#FFFFFF] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                FOUNDER & CREATOR
              </span>

              <span className="font-mono text-[11px] font-bold uppercase border border-white/40 text-white/90 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF4D00]" />
                ASSAM, INDIA 🇮🇳
              </span>
            </div>

            {/* Profile Intro Banner */}
            <div className="flex items-start gap-4 sm:gap-5 mb-6 pb-6 border-b border-white/20">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center font-display text-2xl sm:text-3xl tracking-tight shadow-[4px_4px_0px_#FFFFFF] flex-shrink-0">
                  KB
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center text-[#FF4D00]">
                  <Zap className="w-3.5 h-3.5 fill-[#FF4D00]" />
                </div>
              </div>

              <div>
                <h2 
                  id="creator-modal-title"
                  className="font-display text-2xl sm:text-3xl tracking-tight uppercase text-white flex items-center gap-2"
                >
                  KAUSHIK BORUAH
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[#FF4D00] font-bold uppercase tracking-tight mt-0.5">
                  // DEVELOPER & TECHNOLOGY ENTHUSIAST 💻
                </p>
                <p className="font-body text-xs text-white/70 mt-1.5 leading-relaxed">
                  Passionate about software development, AI systems, and building tools that deliver immediate real-world utility.
                </p>
              </div>
            </div>

            {/* Creator Story & Philosophy */}
            <div className="space-y-4 font-body text-xs sm:text-sm leading-relaxed text-white/90 mb-6 max-h-[36vh] overflow-y-auto pr-2 no-scrollbar">
              
              {/* High-impact mission blockquote */}
              <div className="bg-[#111111] border-l-4 border-[#FF4D00] p-4 text-white">
                <p className="font-mono text-[11px] text-[#FF4D00] font-bold uppercase mb-1">
                  // THE CORE MISSION
                </p>
                <p className="font-display text-base sm:text-lg tracking-tight uppercase text-white leading-snug">
                  « AI tools shouldn’t be difficult to discover. »
                </p>
              </div>

              <p>
                There are thousands of AI websites scattered across the internet. <strong className="text-white">AI Vault</strong> brings the most useful free and free-tier tools together in one clean, organized, high-performance platform.
              </p>

              <p className="text-white/80">
                From AI chatbots and coding assistants to image generators, video suites, research engines, and productivity apps — AI Vault is built to help you find the right tool faster.
              </p>

              {/* What I'm Building Section */}
              <div className="p-4 border border-white/20 bg-black space-y-2">
                <h4 className="font-display text-sm tracking-tight uppercase text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#FF4D00]" />
                  <span>WHAT I'M BUILDING 🚀</span>
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  I’m continuously learning, experimenting, and shipping projects around AI, autonomous agents, and modern web architectures. AI Vault will continue evolving with weekly tool updates and community submissions.
                </p>
              </div>

              {/* Signature Tagline */}
              <div className="font-mono text-[11px] sm:text-xs text-white/60 pt-2 border-t border-white/10 uppercase tracking-tight">
                Built with curiosity. Powered by technology. Made for everyone exploring AI. ⚡
                <span className="block text-white font-bold mt-1">— Kaushik Boruah</span>
              </div>
            </div>

            {/* Social & Support Action Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              
              {/* Buy Me a Coffee */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://buymeacoffee.com/kaushikxmelody"
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="flex items-center justify-between p-3.5 bg-[#FFDD00] text-black border-2 border-black font-display text-xs tracking-tight uppercase shadow-[4px_4px_0px_#FFFFFF] hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-black text-[#FFDD00] rounded-full flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold">BUY ME A COFFEE</span>
                    <span className="font-mono text-[10px] block opacity-80">SUPPORT THE PROJECT</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Instagram Profile */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://www.instagram.com/codexkitu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-black text-white border-2 border-white font-display text-xs tracking-tight uppercase shadow-[4px_4px_0px_#FF4D00] hover:bg-[#FF4D00] hover:text-black hover:border-black transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-white text-black group-hover:bg-black group-hover:text-[#FF4D00] rounded-full flex items-center justify-center font-bold font-mono text-sm">
                    @
                  </div>
                  <div>
                    <span className="block font-bold">FOLLOW ON INSTAGRAM</span>
                    <span className="font-mono text-[10px] block opacity-80">@CODEXKITU</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

            </div>

            {/* Bottom Dismiss Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/20">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white/70 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={e => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 rounded-none accent-[#FF4D00] border-2 border-white cursor-pointer"
                />
                <span>DON'T SHOW THIS ON NEXT VISIT</span>
              </label>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleDismiss}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF4D00] hover:bg-white text-black font-display text-xs tracking-tight uppercase border-2 border-black hover:border-white transition-all shadow-[4px_4px_0px_#FFFFFF] flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span>ENTER DIRECTORY</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
