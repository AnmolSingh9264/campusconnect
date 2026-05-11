/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import "../../src/css/EditProfile.css";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Settings,
  User,
  Rocket,
  Target,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Mail,
  School,
  Book,
  Calendar,
  Layers,
  Link,
  ChevronDown,
  X,
  Plus,
  Rocket as RocketIcon,
  Info,
  Briefcase,
  Globe,
  Building2,
  History,
  Zap,
  Users,
  Target as TargetIcon,
  Upload,
  CreditCard,
  Stethoscope,
  TreePine,
  Network as Hub,
  User as Wc,
  SpaceIcon,
} from "lucide-react";
import {
  useUniversities,
  useCourses,
  useBranches,
} from "../features/signup/signupHooks.ts";
import { useAuth } from "../../src/Context/AuthContext.tsx";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
type OnboardingStep = 1 | 2 | 3 | 4;

/*interface BasicInfo {
  fullName: string;
  email: string;
  gender: string;
  university: string;
  course: string;
  branch: string;
  graduationYear: string;
}*/

/*interface ProjectInfo {
  title: string;
  description: string;
  githubLink: string;
  technologies: string[];
  liveUrl: string;
  thumbnail: string | null;
}*/

/*interface CareerGoals {
  roles: string[];
  environment: "remote" | "hybrid" | "onsite";
  salaryRange: [number, number];
  vision: string;
}*/

/*interface SoftSkills {
  skills: string[];
  industries: string[];
  teamSize: number;
}*/

export default function EditProfile() {

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, 4) as OnboardingStep);
  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1) as OnboardingStep);

  const progressMap = {
    1: 25,
    2: 45,
    3: 75,
    4: 100,
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 hidden lg:flex h-screen w-[280px] bg-white border-r border-slate-200 flex-col p-8 z-40">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 font-headline">
            Hire Skills
          </span>
        </div>

        <nav className="flex-grow space-y-8">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Your Journey
          </div>
          <div className="space-y-6">
            <SidebarStep
              icon={<User className="w-5 h-5" />}
              label="Basic Information"
              active={currentStep === 1}
              completed={currentStep > 1}
              status={
                currentStep === 1
                  ? "Active Now"
                  : currentStep > 1
                    ? "Completed"
                    : "Upcoming"
              }
              onClick={() => setCurrentStep(1)}
            />
            <SidebarStep
              icon={<Rocket className="w-5 h-5" />}
              label="Featured Project"
              active={currentStep === 2}
              completed={currentStep > 2}
              status={
                currentStep === 2
                  ? "In Progress"
                  : currentStep > 2
                    ? "Completed"
                    : "Upcoming"
              }
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
            />
            <SidebarStep
              icon={<Target className="w-5 h-5" />}
              label="Career Goals"
              active={currentStep === 3}
              completed={currentStep > 3}
              status={
                currentStep === 3
                  ? "Refining"
                  : currentStep > 3
                    ? "Completed"
                    : "Next Step"
              }
              onClick={() => currentStep >= 3 && setCurrentStep(3)}
            />
            <SidebarStep
              icon={<BrainCircuit className="w-5 h-5" />}
              label="Skills & Interests"
              active={currentStep === 4}
              completed={currentStep > 4}
              status={currentStep === 4 ? "Personalizing" : "Final Step"}
              onClick={() => currentStep >= 4 && setCurrentStep(4)}
            />
          </div>
        </nav>

        <div className="mt-auto space-y-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                Need help?
              </p>
              <p className="text-[10px] text-slate-500">
                View Onboarding Guide
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                Progress
              </span>
              <span className="text-[10px] font-bold text-primary">
                {progressMap[currentStep]}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full primary-gradient transition-all duration-500 ease-out shadow-[0_0_8px_rgba(79,55,138,0.3)]"
                style={{ width: `${progressMap[currentStep]}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px]">
        {/* Header (Top Navigation) */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 h-16 w-full px-8 flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">
              Hire Skills
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="text-primary font-bold border-b-2 border-primary py-5">
              Challenges
            </button>
            <button className="text-slate-500 hover:text-primary transition-colors">
              Courses
            </button>
            <button className="text-slate-500 hover:text-primary transition-colors">
              Talent Pool
            </button>
            <button className="text-slate-500 hover:text-primary transition-colors">
              Pricing
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto min-h-[calc(100vh-64px)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentStep === 1 && <BasicInformation onNext={nextStep} />}
              {currentStep === 2 && (
                <FeaturedProject onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 3 && (
                <CareerGoalsView onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 4 && <SkillsInterests onPrev={prevStep} />}
            </motion.div>
          </AnimatePresence>

          {/* Decorative background gradients */}
          <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-200/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="fixed bottom-0 left-[280px] -z-10 w-[400px] h-[400px] bg-purple-200/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </main>
    </div>
  );
}

// --- Sub-components (Fragments) ---

function SidebarStep({
  icon,
  label,
  active,
  completed,
  status,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  completed: boolean;
  status: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 transition-all group ${!active && !completed ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div
        className={`
        relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
        ${
          active
            ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
            : completed
              ? "bg-primary-container text-on-primary-container"
              : "bg-slate-100 text-slate-400 border border-slate-200"
        }
      `}
      >
        {completed ? <CheckCircle2 className="w-5 h-5 fill-current" /> : icon}
        {active && (
          <motion.div
            layoutId="sidebar-accent"
            className="absolute -left-8 top-1/2 -translate-y-1/2 w-1.5 h-8 primary-gradient rounded-r-lg"
          />
        )}
      </div>
      <div className="text-left">
        <p
          className={`text-sm font-bold transition-colors ${active ? "text-primary" : "text-slate-600"}`}
        >
          {label}
        </p>
        <p
          className={`text-[10px] font-medium tracking-wide uppercase transition-colors 
          ${active ? "text-primary italic" : completed ? "text-slate-400" : "text-slate-300"}`}
        >
          {status}
        </p>
      </div>
    </button>
  );
}

function BasicInformation({ onNext }: { onNext: () => void }) {
     const { user } = useAuth();
    const [fullname, setFullName] = useState("");
      const [email, setEmail] = useState("");
      
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  const { universities } = useUniversities();

  const { courses } = useCourses(university);

  const { branches } = useBranches(course);

  const selectedCourse = courses.find((c) => c.id === Number(course));
  const yearOptions = selectedCourse
    ? Array.from({ length: selectedCourse.duration }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}${i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"} Year`,
      }))
    : [];

    // assigning data into ui

useEffect(() => {
  if (!user) return;

  setFullName(user.user_metadata.full_name || "");
  setEmail(user.email || "");
  setGender(user.user_metadata.gender || "");

  //setUniversity(user.university?.toString() || "");
  //setCourse(user.course?.toString() || "");
  //setBranch(user.branch?.toString() || "");
  //setYear(user.year?.toString() || "");
}, [user]);
    
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10">
        <span className="inline-block py-1.5 px-3.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-4 border border-indigo-200">
          Step 1 of 4
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Let's start with the basics
        </h1>
        <p className="text-slate-500 text-lg">
          Tell us a bit about yourself so we can personalize your career journey
          and connect you with the right opportunities.
        </p>
      </header>

      <div className="glass-panel rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
            <FormField
              label="Full Name"
              icon={<User className="w-5 h-5" />}
              placeholder="John Doe"
              value={fullname}
              onChange={setFullName}
            />
            <FormField
              label="Email Address"
              icon={<Mail className="w-5 h-5" />}
              placeholder="john.doe@example.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <SelectField
              label="Gender"
              icon={<Wc className="w-5 h-5" />}
              options={["Male", "Female", "Other"]}
              value={gender}
              onChange={setGender}
            />
            <SelectFieldUp
              id="university"
              label="University"
              icon={<School className="w-5 h-5" />}
              value={university}
              onChange={setUniversity}
              options={universities}
            />
            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="course"
              >
                COURSE
              </label>
              <div className="relative group">
                <Book className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  id="course"
                  className="w-full pl-11 pr-10 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="branch"
              >
                BRANCH
              </label>
              <div className="relative group">
                <Hub className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  id="branch"
                  className="w-full pl-11 pr-10 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="year"
              >
                GRADUATION YEAR
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Graduation Year
                  </option>
                  {yearOptions.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}

                  <option value="passout">PassOut</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end items-center gap-6 border-t border-slate-100">
            <button
              type="button"
              className="text-sm font-bold text-slate-500 hover:text-primary transition-colors px-4 py-2"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="primary-gradient px-12 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group"
            >
              Next Step
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 ring-1 ring-white">
        <Zap className="text-primary w-5 h-5 shrink-0" />
        <p className="text-xs text-indigo-700/80 leading-relaxed font-medium">
          Completing your profile increases your visibility to top-tier tech
          recruiters by up to <span className="font-bold text-primary">3x</span>
          . Ensure your university and graduation year are accurate to receive
          relevant internship and job alerts.
        </p>
      </div>
    </div>
  );
}

function FeaturedProject({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [tags] = useState(["React.js", "TypeScript", "Tailwind CSS"]);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Showcase your best work
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Highlight a project that demonstrates your technical proficiency and
            problem-solving skills. This is the first thing hiring managers will
            see on your profile.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={onPrev}
            className="flex-1 md:flex-none px-6 py-3 rounded-2xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            Skip for now
          </button>
          <button
            onClick={onNext}
            className="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
          >
            Save & Continue
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <div className="glass-panel p-8 md:p-10 rounded-[32px] border-slate-200 shadow-sm space-y-7">
            <FormField
              label="Project Title"
              placeholder="e.g. Distributed Ledger for FinTech"
            />
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Description
              </label>
              <textarea
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400 min-h-[140px] outline-none"
                placeholder="Briefly explain the problem you solved and the impact of your solution..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                GitHub Repository Link
              </label>
              <div className="relative group">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-800 outline-none"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Key Technologies
              </label>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-2 border border-indigo-100 transition-all hover:scale-105"
                  >
                    {tag}{" "}
                    <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" />
                  </span>
                ))}
                <button
                  className="px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-1.5"
                  type="button"
                >
                  <Plus className="w-4 h-4" /> Add Tag
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-[32px] border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <RocketIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Live Project URL</p>
                <p className="text-xs text-slate-500 font-medium">
                  Do you have a deployed version?
                </p>
              </div>
            </div>
            <div className="relative w-full md:w-80 group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-4 h-4" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="glass-panel overflow-hidden rounded-[32px] border-slate-200 shadow-sm flex flex-col h-full bg-white/50">
            <div className="p-7 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Project Thumbnail
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 font-medium italic">
                Recommended size: 1600x900px (16:9)
              </p>
            </div>
            <div className="flex-1 min-h-[300px] p-8">
              <div className="relative h-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 flex flex-col items-center justify-center group hover:border-primary transition-all cursor-pointer hover:bg-white shadow-inner">
                <div className="z-10 bg-white/90 backdrop-blur-sm p-5 rounded-full shadow-xl group-hover:scale-110 transition-transform ring-4 ring-primary-container/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="z-10 mt-5 font-bold text-slate-800 text-sm">
                  Click to upload or drag & drop
                </p>
                <p className="z-10 text-[11px] text-slate-400 mt-1 font-medium uppercase tracking-tight">
                  SVG, PNG, JPG (MAX. 5MB)
                </p>
              </div>
            </div>
            <div className="p-7 bg-indigo-50/30 border-t border-slate-50">
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-500 font-medium italic">
                  <span className="font-bold text-primary not-italic">
                    Pro Tip:
                  </span>{" "}
                  Projects with high-quality thumbnails receive up to{" "}
                  <span className="font-bold text-primary underline underline-offset-2">
                    40% more
                  </span>{" "}
                  engagement from technical recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerGoalsView({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Define your career vision.
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          We use your goals to match you with elite opportunities that align
          with your professional trajectory and financial expectations.
        </p>
      </header>

      <div className="space-y-10">
        <section className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.03)] ring-1 ring-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-slate-800">
              Desired Job Roles
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SelectionCard
              icon={<Layers className="w-5 h-5" />}
              title="Product Architect"
              subtitle="System design & strategy"
              selected
            />
            <SelectionCard
              icon={<History className="w-5 h-5" />}
              title="Lead Engineer"
              subtitle="Technical team leadership"
              selected
            />
            <SelectionCard
              icon={<TargetIcon className="w-5 h-5" />}
              title="Data Strategist"
              subtitle="Insight-driven growth"
            />
          </div>
          <button
            className="mt-8 text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            type="button"
          >
            <Plus className="w-4 h-4" /> Explore more roles
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-slate-800">
                Work Environment
              </h3>
            </div>
            <div className="space-y-5">
              <button className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-primary bg-indigo-50/50 shadow-sm group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-indigo-100 transition-transform group-hover:scale-105">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-900">
                      Remote First
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Global collaboration
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-primary fill-current" />
              </button>
              <button className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-200 transition-all hover:bg-slate-50 group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 transition-transform group-hover:scale-105">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-800 transition-colors group-hover:text-slate-900">
                      On-Site / Hybrid
                    </span>
                    <span className="text-xs text-slate-400 font-medium transition-colors group-hover:text-slate-500">
                      In-office presence
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </section>

          <section className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-slate-800">
                Annual Salary
              </h3>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-end justify-between mb-8">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Minimum
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900">
                    $140k
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Maximum
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900">
                    $210k+
                  </p>
                </div>
              </div>
              <div className="relative w-full h-8 flex items-center mb-6">
                <div className="w-full h-2.5 bg-slate-100 rounded-full relative overflow-hidden shadow-inner border border-slate-50">
                  <div className="absolute left-[30%] right-[20%] h-full primary-gradient rounded-full" />
                </div>
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-4 border-primary rounded-full shadow-[0_4px_12px_rgba(79,55,138,0.3)] cursor-pointer" />
                <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-4 border-primary rounded-full shadow-[0_4px_12px_rgba(79,55,138,0.3)] cursor-pointer" />
              </div>
              <p className="text-xs text-center text-slate-400 font-medium italic border-t border-slate-50 pt-4">
                Based on your experience, this is the{" "}
                <span className="text-primary font-bold">top 5%</span> of your
                peer group.
              </p>
            </div>
          </section>
        </div>

        <section className="glass-panel rounded-[32px] p-8 md:p-10 border border-primary/10 shadow-xl overflow-hidden relative group">
          <div className="relative z-10 w-full">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TargetIcon className="w-5 h-5 text-primary" /> Professional
              Ambition
            </h4>
            <div className="bg-white/50 p-1 rounded-2xl border border-slate-100 transition-all focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5">
              <textarea
                className="w-full bg-transparent border-none p-4 min-h-[120px] outline-none text-slate-800 placeholder:text-slate-400 italic"
                placeholder="Briefly describe your 5-year vision..."
              />
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between pt-12">
          <button
            onClick={onPrev}
            className="px-8 py-3.5 rounded-full text-slate-500 font-bold hover:bg-slate-100 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={onNext}
            className="primary-gradient px-12 py-4 rounded-full text-white font-extrabold shadow-2xl transition-all flex items-center gap-3 group"
          >
            Continue Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}

function SkillsInterests({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="max-w-[1000px] mx-auto pb-20">
      <header className="mb-14">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-5 border border-primary/10">
          <Zap className="w-4 h-4 fill-current" /> Personalization Engine
        </div>
        <h2 className="text-5xl font-extrabold text-slate-900 mb-5 tracking-tighter">
          Tell us what drives you.
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          We use these insights to match you with teams that share your values
          and challenges that test your unique strengths.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 glass-panel border border-slate-200 p-10 rounded-[40px] shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Soft Skills & Power Skills
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Interpersonal strengths you bring to every project.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <SkillBadge active label="Strategic Thinking" />
            <SkillBadge active label="Crisis Management" />
            <SkillBadge label="Adaptive Leadership" />
            <SkillBadge label="Public Speaking" />
            <SkillBadge label="Empathy-Driven Design" />
            <SkillBadge label="Cross-Functional Liaison" />
            <SkillBadge label="Negotiation" />
            <SkillBadge label="Rapid Prototyping" />
          </div>
        </section>

        <section className="col-span-12 lg:col-span-7 glass-panel border border-slate-200 p-10 rounded-[40px] shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Industry Interests
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Which sectors excite you most?
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <IndustryItem
              icon={<CreditCard className="w-6 h-6" />}
              label="FinTech"
              selected
            />
            <IndustryItem
              icon={<BrainCircuit className="w-6 h-6" />}
              label="AI & ML"
              selected
            />
            <IndustryItem
              icon={<School className="w-6 h-6" />}
              label="EdTech"
            />
            <IndustryItem
              icon={<Stethoscope className="w-6 h-6" />}
              label="HealthTech"
            />
            <IndustryItem
              icon={<TreePine className="w-6 h-6" />}
              label="ClimateTech"
            />
            <IndustryItem
              icon={<SpaceIcon className="w-6 h-6" />}
              label="SpaceTech"
            />
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5 glass-panel border border-slate-200 p-10 rounded-[40px] shadow-sm flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <TargetIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Preferred Team Size
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Where do you perform best?
              </p>
            </div>
          </div>
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Agile Squad</span>
                <span>Enterprise</span>
              </div>
              <input
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                type="range"
                min="0"
                max="100"
                defaultValue="40"
              />
            </div>
            <div className="mt-6 flex-1 flex flex-col justify-center">
              <div className="p-5 rounded-3xl bg-white border-2 border-primary shadow-sm flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary font-bold text-lg">
                    10-50
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900">Scale-up</p>
                    <p className="text-[11px] text-slate-400 font-bold italic uppercase tracking-tighter">
                      Fast-paced growth phase
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              </div>
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between opacity-50 grayscale">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-lg">
                    500+
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-400">Enterprise</p>
                    <p className="text-[11px] text-slate-400 font-bold italic uppercase tracking-tighter">
                      Established processes
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <button
          onClick={onPrev}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all w-full md:w-auto"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Goals
        </button>
        <button className="flex items-center justify-center gap-3 px-12 py-5 rounded-3xl font-extrabold text-lg primary-gradient text-white shadow-2xl transition-all w-full md:w-auto">
          Complete Journey
          <ArrowRight className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
}

function FormField({
  label,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-bold text-slate-700 ml-1">
        {label}
      </label>

      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full ${
            icon ? "pl-12" : "pl-5"
          } pr-5 py-4 rounded-2xl border border-slate-200 bg-white/60 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400 outline-none shadow-sm`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none">
          {icon}
        </div>
        <select onChange={(e) => onChange(e.target.value)} value={value} className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white/60 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-800 appearance-none outline-none shadow-sm font-medium">
          <option value="" disabled selected>
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}
type OptionType = {
  id: number;
  name: string;
};
function SelectFieldUp({
  label,
  icon,
  value,
  onChange,
  options,
  id,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  options: OptionType[];
}) {
  return (
    <div className="space-y-2.5">
      <label htmlFor={id} className="text-sm font-bold text-slate-700 ml-1">
        {label}
      </label>

      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none">
          {icon}
        </div>

        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white/60 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-800 appearance-none outline-none shadow-sm font-medium cursor-pointer"
        >
          <option value="" disabled>
            Select {label}
          </option>

          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}

function SelectionCard({
  icon,
  title,
  subtitle,
  selected,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  selected?: boolean;
}) {
  return (
    <label className="relative cursor-pointer group">
      <input
        type="checkbox"
        defaultChecked={selected}
        className="peer sr-only"
      />
      <div className="h-full p-5 border-2 border-slate-100 rounded-3xl transition-all peer-checked:border-primary peer-checked:bg-indigo-50/50 group-hover:bg-slate-50/80 group-hover:border-slate-200 flex flex-col gap-3 shadow-sm">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selected ? "bg-white text-primary shadow-sm border border-indigo-100" : "bg-slate-100 text-slate-400"}`}
        >
          {icon}
        </div>
        <div>
          <p className="font-extrabold text-slate-900 leading-tight">{title}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight italic mt-0.5">
            {subtitle}
          </p>
        </div>
        {selected && (
          <div className="absolute top-4 right-4 text-primary">
            <CheckCircle2 className="w-5 h-5 fill-current" />
          </div>
        )}
      </div>
    </label>
  );
}

function SkillBadge({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-6 py-3.5 rounded-3xl text-sm font-extrabold flex items-center gap-3 transition-all active:scale-95 shadow-sm ${active ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"}`}
    >
      {label}
      {active && (
        <X className="w-4 h-4 text-primary-container bg-white rounded-full p-0.5" />
      )}
    </button>
  );
}

function IndustryItem({
  icon,
  label,
  selected,
}: {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
}) {
  return (
    <label className="relative flex items-center p-5 rounded-3xl border border-slate-200 bg-white cursor-pointer transition-all hover:shadow-lg group overflow-hidden">
      <input
        type="checkbox"
        defaultChecked={selected}
        className="hidden peer"
      />
      <div className="peer-checked:bg-primary/5 absolute inset-0 transition-all opacity-0 peer-checked:opacity-100" />
      <div
        className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all mr-4 ${selected ? "bg-white text-primary shadow-sm border border-indigo-100" : "bg-slate-50 text-slate-400"}`}
      >
        {icon}
      </div>
      <span
        className={`relative z-10 font-extrabold text-base transition-all ${selected ? "text-slate-900" : "text-slate-400"}`}
      >
        {label}
      </span>
      {selected && (
        <CheckCircle2 className="relative z-10 ml-auto w-6 h-6 text-primary" />
      )}
    </label>
  );
}
