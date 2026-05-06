import { Bell, Settings, Menu } from 'lucide-react';

interface TopNavProps {
  onOpenMenu: () => void;
}

export default function TopNav({ onOpenMenu }: TopNavProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button onClick={onOpenMenu} className="lg:hidden p-2 text-slate-600 hover:bg-white rounded-lg shadow-sm border border-slate-100">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-manrope">Welcome back, Alex!</h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">You have 3 new recruiter views and 1 upcoming interview today.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-sm border border-slate-100">
          <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors text-slate-600">
            <Settings size={20} />
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfpWLHHvrpF01kbUIpm-Atk9f71IUyzGHw8J2ejqnAKwjIrRZhK02RodpfvnwShi6BPEg2K6MRdRhCwf-nXkyPz7CUaC8IK_YgNKuDSlO7l8gSD18V4Tk41bZiaM1XgDcqZovElZ6jWPqEaUKyIyINcwXPD-vqhM4nUUshQ1pbl3qbciS9y5Pbfjyl73Ec5p8Vg8QbDcKyHFCdp4OAqKetwt-5dMEgfm-oHdON1c-WmgMYFecongQinKn4T9AbQId_ethvqbvsiiQ"
            alt="User Profile Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
