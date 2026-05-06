import { ChevronLeft, ChevronRight, Terminal, Database, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const challenges = [
  {
    icon: Terminal,
    title: 'React Advanced Patterns',
    description: 'Test your knowledge of high-performance rendering and custom hooks in large-scale apps.',
    level: 'Expert',
    meta: '45 min • 2.5k took it',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Database,
    title: 'SQL Performance Tuning',
    description: 'Optimize complex queries and master indexing strategies for billion-row databases.',
    level: 'Intermediate',
    meta: '30 min • 1.2k took it',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Cloud Security Auditing',
    description: 'Identify vulnerabilities in AWS IAM policies and VPC configurations.',
    level: 'Advanced',
    meta: '60 min • 800 took it',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function SkillChallenges() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-manrope">Skill Challenges for You</h3>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 rounded-full hover:bg-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 border border-slate-200 rounded-full hover:bg-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${challenge.color}`}>
                <challenge.icon size={24} />
              </div>
              <span className="text-[10px] font-bold py-1 px-2 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
                {challenge.level}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-manrope">{challenge.title}</h4>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{challenge.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{challenge.meta}</span>
              <button className="text-indigo-600 font-bold text-sm">Start Challenge</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
