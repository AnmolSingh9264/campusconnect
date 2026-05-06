import { BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExpertCounseling() {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-2xl p-6 shadow-elite border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BrainCircuit size={32} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1 font-manrope">1-on-1 Expert Counseling</h3>
            <p className="text-slate-500 max-w-xl">
              Accelerate your career growth with personalized coaching sessions. Book a private call with industry leaders from top tech companies to review your portfolio or roadmap.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3 shrink-0 min-w-[160px]">
          <div className="text-2xl font-black text-slate-900 font-manrope">
            $49 <span className="text-sm font-medium text-slate-400">/ session</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            Book Session
          </motion.button>
        </div>
      </div>
    </section>
  );
}
