import { Eye, Star, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export function StatCards() {
  return (
    <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recruiter Views */}
      <div className="bg-white rounded-2xl p-6 shadow-elite border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Eye size={20} />
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +12% vs last week
            </span>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Recruiter Views</h4>
          <p className="text-4xl font-extrabold text-slate-900 mt-1 tracking-tight font-manrope">1,284</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
          <div className="h-1 flex-1 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[70%] transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Shortlist Count */}
      <div className="bg-white rounded-2xl p-6 shadow-elite border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Star size={20} />
            </span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              Top 5% Candidate
            </span>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Shortlist Count</h4>
          <p className="text-4xl font-extrabold text-slate-900 mt-1 tracking-tight font-manrope">42</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50">
          <p className="text-xs text-slate-400">Featured in 3 high-priority tech stacks this week.</p>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="md:col-span-2 bg-indigo-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center min-w-[64px]">
              <span className="text-xs uppercase font-bold opacity-70">Oct</span>
              <span className="text-2xl font-black font-manrope">24</span>
            </div>
            <div>
              <h4 className="font-bold text-lg font-manrope">Senior Product Designer Interview</h4>
              <p className="text-indigo-200 text-sm flex items-center gap-1 mt-1">
                <Building2 size={14} /> Google Tech Hub • 2:30 PM EST
              </p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-white text-indigo-900 font-bold rounded-xl"
          >
            Join Meeting
          </motion.button>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
