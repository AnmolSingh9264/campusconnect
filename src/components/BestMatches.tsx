const matches = [
  {
    title: 'Lead Design Systems Engineer',
    company: 'Figma • San Francisco (Remote)',
    match: '98% Match',
    color: 'text-emerald-600',
  },
  {
    title: 'Senior UX Architect',
    company: 'Adobe • New York',
    match: '92% Match',
    color: 'text-indigo-600',
  },
  {
    title: 'Product Manager, AI Tools',
    company: 'OpenAI • San Francisco',
    match: '89% Match',
    color: 'text-indigo-600',
  },
];

export default function BestMatches() {
  return (
    <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl p-6 shadow-elite border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 font-manrope">Best Matches</h3>
        <a href="#" className="text-sm text-indigo-600 font-bold hover:underline">View All</a>
      </div>
      <div className="space-y-4">
        {matches.map((item, index) => (
          <div 
            key={index} 
            className="p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h5>
                <p className="text-xs text-slate-500 mt-1">{item.company}</p>
              </div>
              <span className={`text-xs font-bold ${item.color}`}>{item.match}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
