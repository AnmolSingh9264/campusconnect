import { LayoutDashboard, Users, Briefcase, BrainCircuit, BarChart3, Mail, HelpCircle, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Candidates' },
  { icon: Briefcase, label: 'Job Boards' },
  { icon: BrainCircuit, label: 'Skill Tests' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Mail, label: 'Messages' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] border-r border-slate-200 bg-white flex flex-col py-6 px-4 z-50 transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 px-2 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none font-manrope">Elite Hiring</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">Enterprise Plan</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg group ${
                item.active
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                  : 'text-slate-500 hover:bg-slate-50 hover:translate-x-1'
              }`}
            >
              <item.icon size={20} className={item.active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
         {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-6 py-3 primary-gradient text-white rounded-xl font-semibold shadow-lg shadow-indigo-200"
          >
            Post New Job
          </motion.button>*/}

          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 transition-colors text-sm rounded-lg">
              <HelpCircle size={18} />
              <span>Help Center</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 transition-colors text-sm rounded-lg">
              <Settings size={18} />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
