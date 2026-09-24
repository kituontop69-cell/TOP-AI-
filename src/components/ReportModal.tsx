import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { AITool, ReportItem } from '../types';
import { toolStorage } from '../services/toolStorage';
import { analytics } from '../services/analytics';
import { X, AlertTriangle, Send, Check } from 'lucide-react';

interface ReportModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ tool, isOpen, onClose }) => {
  const [reason, setReason] = useState<ReportItem['reason']>('pricing_changed');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool || !details.trim()) return;

    setIsSubmitting(true);
    try {
      await toolStorage.submitReport({
        toolId: tool.id,
        toolName: tool.name,
        reason,
        details: details.trim(),
        userEmail: email.trim() || undefined
      });

      analytics.track('report_submitted', { toolId: tool.id, reason });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDetails('');
        setEmail('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && tool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm" 
          />

          <motion.div 
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="relative w-full max-w-lg bg-[#000000] text-white border-2 border-white shadow-[8px_8px_0px_#FF4D00] p-6 sm:p-7 z-10 select-none"
          >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-[#FF4D00] transition-colors border-2 border-black"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-display text-xl text-white uppercase tracking-tight mb-1">
              REPORT LOGGED TO ARCHIVE
            </h3>
            <p className="font-mono text-xs text-white/80">
              The auditing collective will review the tool listing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg text-white uppercase tracking-tight">
                  AUDIT &amp; REPORT INACCURACY
                </h3>
                <span className="font-mono text-xs text-[#FF4D00] uppercase block">
                  TARGET // {tool.name}
                </span>
              </div>
            </div>

            {/* Issue Category */}
            <div className="mb-4">
              <label className="font-mono text-xs font-bold text-white block mb-1 uppercase">
                // ISSUE CATEGORY
              </label>
              <select
                value={reason}
                onChange={e => setReason(e.target.value as ReportItem['reason'])}
                className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs font-bold uppercase text-white focus:outline-none"
              >
                <option value="pricing_changed">💰 PRICING OR FREE TIER HAS CHANGED</option>
                <option value="broken_link">🔗 BROKEN OFFICIAL LINK (404 ERROR)</option>
                <option value="wrong_category">🏷️ INCORRECT DOMAIN CATEGORY / TAGS</option>
                <option value="tool_defunct">⚠️ TOOL DEFUNT / SHUT DOWN</option>
                <option value="incorrect_desc">📝 INACCURATE CAPABILITIES DESCRIPTION</option>
                <option value="other">💬 OTHER TECHNICAL CORRECTION</option>
              </select>
            </div>

            {/* Details */}
            <div className="mb-4">
              <label className="font-mono text-xs font-bold text-white block mb-1 uppercase">
                // VERIFICATION DETAILS *
              </label>
              <textarea
                required
                rows={3}
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="STATE EXACT CORRECTION NEEDED (E.G. 'THEY REDUCED DAILY CREDITS TO 10')..."
                className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] p-3 font-mono text-xs text-white placeholder-white/30 focus:outline-none uppercase leading-relaxed"
              />
            </div>

            {/* Optional Email */}
            <div className="mb-6">
              <label className="font-mono text-xs font-bold text-white block mb-1 uppercase">
                // YOUR CONTACT EMAIL (OPTIONAL)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="USER@NETWORK.COM"
                className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs text-white placeholder-white/30 focus:outline-none uppercase"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-transparent text-white border-2 border-white font-mono text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors"
              >
                CANCEL
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !details.trim()}
                className="flex items-center gap-1.5 px-6 py-2 bg-[#FF4D00] text-black border-2 border-black font-display text-xs uppercase tracking-tight hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF] disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT REPORT'}</span>
              </button>
            </div>
          </form>
        )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
