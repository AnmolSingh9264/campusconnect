import { CheckCircle2, MessageSquare, UserPlus } from 'lucide-react';

const activities = [
  {
    icon: CheckCircle2,
    title: "Passed 'React Native' Skill Test",
    description: "Top 1% score achieved. Badge added to profile.",
    time: "2 hours ago",
    color: 'bg-indigo-50 text-indigo-600',
    line: true,
  },
  {
    icon: MessageSquare,
    title: "New Message from Meta Recruiting",
    description: '"Hi Alex, we were impressed by your architecture case study..."',
    time: "Yesterday",
    color: 'bg-amber-50 text-amber-600',
    line: true,
  },
  {
    icon: UserPlus,
    title: "Profile Shortlisted",
    description: "Stripe added you to 'Senior Fullstack Pipeline'.",
    time: "2 days ago",
    color: 'bg-slate-50 text-slate-400',
    line: false,
  },
];

export default function RecentActivity() {
  return (
    <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl p-6 shadow-elite border border-slate-100 h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6 font-manrope">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${activity.color}`}>
                <activity.icon size={20} />
              </div>
              {activity.line && (
                <div className="absolute top-10 bottom-[-24px] left-1/2 w-0.5 bg-slate-100 -translate-x-1/2"></div>
              )}
            </div>
            <div className="pt-1">
              <p className="text-sm font-bold text-slate-900">{activity.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
              <span className="text-[10px] text-slate-400 uppercase font-bold mt-2 inline-block tracking-wider">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
