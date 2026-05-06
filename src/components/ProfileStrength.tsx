export default function ProfileStrength() {
  const percentage = 75;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-elite border border-slate-100 flex flex-col items-center text-center">
      <h3 className="text-slate-900 font-bold mb-6 self-start font-manrope">Profile Strength</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-slate-100"
            cx="80"
            cy="80"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
          />
          <circle
            className="text-indigo-600"
            cx="80"
            cy="80"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900">{percentage}%</span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Master</span>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-slate-500 px-4">
        Complete your 'Cloud Architecture' certification to reach 90% and unlock Elite badges.
      </p>
      
      <button className="mt-6 w-full py-2.5 text-indigo-600 bg-indigo-50 font-semibold rounded-xl hover:bg-indigo-100 transition-colors">
        Complete Profile
      </button>
    </div>
  );
}
