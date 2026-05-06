import { Clock, BarChart } from 'lucide-react';
import { motion } from 'motion/react';

const courses = [
  {
    title: 'Microservices Architecture with Node.js',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9RMAJM1HcKBhhYe2KCld4V7YQbIPJaUKNFdtC6UieBCIl2qYhV1-Oj5X6IpJnwd0mti4bj4wiRAOtCTUOOA7L1YUzi01jSmdFN2K4Th4muQsPQCWX1QA3NOo0qAw9QyHJZ1xtUbXcuOznUxkvR30WA01S1heyMG6uMt3KV1DuCr18VvAKN-8nKB9lVYLETfp8mZTS7U1MkGEutGAU8z05z18i1wRJJ2Ie7RNPHGHo9rjq69GhJAeRPbIyc_MkC23fSZOx3Dzyv_o',
    tag: 'Development',
    duration: '12h 30m',
    level: 'Advanced',
    action: 'Start Learning',
    primary: true,
  },
  {
    title: 'Advanced Data Visualization with Python',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTRhIqGL3QVc-_CQxsgNfzHLwmmJlOjCJUpGWliFhK9YAtJbLoWMiCPAZYOpJZXoAUWDDMapfLo_WG3WTX6k96vYfT9fZqXE9pZ3hlnMc7mF6BMZW70KydxAk86jfnCejbWrFhK5rITKKXtvEmfh7zvMs2ESBZWbPdG44es2MUU56Ur1wg4l03CDz8HzdE5AwgHbC3CDhIqRk6PyNbys9giVgniaoLCkYpeCbPIUWA50d-KqaHOKXZDsUWNL6rFcbJUBnuhO3ICn4',
    tag: 'Data Science',
    duration: '8h 15m',
    level: 'Intermediate',
    action: 'Continue: 45% Done',
    primary: false,
  },
  {
    title: 'Psychology of User Behavior in Fintech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRVoEft-xjmaY9cEGjRiPdTbs0VH7p40wbeDBHG0HW2-AT46i0ysW19Ve_i9WXRV-cOXMAsm0u7zVHUw_JpDAvdzNeXTS_cfVkHDIhdxhF4jgKfbyfBtsIqlQ93QO8Iv_ydaKGiX5IzaBpRMQziUos5o8pvLgBm1MF0xiD5-PF4pX8Qb0O0IDHzKyX8tq06f-sBuI0sSnYqLmMTrsaSie0E1y06gKPI8BwVmXauzkigeF7-obdXSuRJ7RLjdsd3G8qXOd6XtAmxAo',
    tag: 'Design',
    duration: '15h 45m',
    level: 'Expert',
    action: 'Start Learning',
    primary: true,
  },
];

export default function TopCourses() {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-6 font-manrope">Top Courses for Your Career Path</h3>
      <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 snap-x hide-scrollbar">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[320px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col snap-start"
          >
            <div className="h-40 w-full relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                {course.tag}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-slate-900 mb-2 font-manrope leading-tight">{course.title}</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={14} /> {course.duration}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <BarChart size={14} /> {course.level}
                </div>
              </div>
              <button 
                className={`mt-auto w-full py-2.5 font-semibold rounded-xl transition-colors ${
                  course.primary 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {course.action}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
