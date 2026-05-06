import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import ProfileStrength from '../components/ProfileStrength';
import { StatCards } from '../components/StatsGrid';
import ExpertCounseling from '../components/ExpertCounseling';
import SkillChallenges from '../components/SkillChallenges';
import TopCourses from '../components/TopCourses';
import RecentActivity from '../components/RecentActivity';
import BestMatches from '../components/BestMatches';
import { useAuth } from "../../src/Context/AuthContext.tsx";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const { signOut } = useAuth();

  // Close sidebar on window resize if it's open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px] p-4 md:p-8 max-w-[1440px] w-full">
        {/* Entrance Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <TopNav onOpenMenu={() => setIsSidebarOpen(true)} />

          {/* Top Grid: Stats & Profile Strength */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <ProfileStrength />
            <StatCards />
          </div>

          {/* 1-on-1 Banner */}
          <ExpertCounseling />

          {/* Challenges Section */}
          <SkillChallenges />

          {/* Courses Section */}
          <TopCourses />

          {/* Bottom Grid: Activity & Matches */}
          <div className="grid grid-cols-12 gap-8 mb-20">
            <RecentActivity />
            <BestMatches />
          </div>
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.button
      onClick={signOut}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 primary-gradient text-white rounded-full shadow-2xl flex items-center justify-center z-50 group"
      >
        <Plus size={24} />
        <span className="absolute right-16 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Update Status
        </span>
      </motion.button>
    </div>
  );
}
