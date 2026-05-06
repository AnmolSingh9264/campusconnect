/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import challengeIcon from "@/assets/ic_challenges.png"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/Context/AuthContext.tsx";

import { 
  Search, 
  Bell, 
  Settings, 
  ArrowRight, 
  BrainCircuit, 
  ShieldCheck,  
  Bot, 
  Video, 
   
  Quote, 
  Globe, 
  Share2, 
  Users, 
  
  CheckCircle2,
  Sparkles
} from 'lucide-react';

import { motion } from 'motion/react';

const Navbar = () => {
  const navigate = useNavigate();
   const { user } = useAuth();
  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-ambient h-16 flex items-center">
      <nav className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto font-headline antialiased">
        <div className="flex items-center gap-8">
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Hire Skills</span>
          <div className="hidden md:flex gap-6">
            <a className="text-primary font-semibold border-b-2 border-primary px-1" href="#find-jobs">Find Jobs</a>
            <a className="text-on-surface-variant hover:text-primary transition-all duration-200 px-1" href="#assessments">Assessments</a>
            <a className="text-on-surface-variant hover:text-primary transition-all duration-200 px-1" href="#talent-pool">Talent Pool</a>
            <a className="text-on-surface-variant hover:text-primary transition-all duration-200 px-1" href="#pricing">Pricing</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant">
            <Search className="text-outline w-4 h-4" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-32 ml-2 placeholder:text-outline" 
              placeholder="Search skills..." 
              type="text"
            />
          </div>
          <button className="text-primary font-semibold px-4 py-2 hover:bg-gray-200 transition-all rounded-lg" onClick={() => user ? navigate("/dashboard") : navigate("/login")}>{user ? "Dashboard" : "Sign In"}</button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-gray-200 rounded-full transition-all active:scale-95">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-gray-200 rounded-full transition-all active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative px-8 pt-20 pb-32 overflow-hidden max-w-7xl mx-auto">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-full h-full rounded-full bg-primary blur-[120px]"></div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            AI-POWERED SKILL VALIDATION
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold font-headline tracking-tight text-on-surface leading-[1.1]">
            Hire Skills, <br/><span className="text-primary">Not Resumes</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            The world's first predictive hiring platform that uses real-world challenges to measure candidate potential. Forget the PDF—hire based on what people can actually build.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="primary-gradient text-white px-8 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform flex items-center gap-2">
              Get Started 
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-slate-50 active:scale-95 transition-transform">
              For Recruiters
            </button>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                  alt="Candidate avatar"
                />
              ))}
            </div>
            <p className="text-sm text-on-surface-variant font-medium">
              <span className="text-primary font-bold">12k+</span> professionals hired this month
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-6 rounded-[2rem] border border-white shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-headline">Skill Profile: Senior React Dev</h4>
                  <p className="text-xs text-on-surface-variant">Validated 2 hours ago</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold font-sans">TOP 1%</span>
            </div>
            
            <div className="space-y-6">
              <SkillBar label="System Architecture" value={98} />
              <SkillBar label="TypeScript Performance" value={92} />
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Code Quality</p>
                <p className="text-lg font-extrabold text-primary font-headline">A++</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Peer Review</p>
                <p className="text-lg font-extrabold text-primary font-headline">Elite</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillBar = ({ label, value }: { label: string, value: number }) => {
  const segments = 10;
  const activeSegments = Math.round((value / 100) * segments);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-semibold text-on-surface">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-sm transition-all duration-500 ${
              i < activeSegments ? 'bg-primary' : 'bg-slate-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="px-8 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-on-surface font-headline mb-4">Precision Hiring Infrastructure</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Skip the sorting process. Our platform automatically ranks candidates based on their performance in specialized environments.</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          <FeatureCard 
            colSpan="md:col-span-7"
            icon={<ShieldCheck className="text-primary w-6 h-6" />}
            title="Skill Profiles"
            description="Dynamic, verified skill graphs that replace static resumes. We track over 450 distinct technical and soft skill metrics for every candidate."
            content={
              <div className="relative h-48 bg-white/50 rounded-2xl border border-dashed border-outline-variant p-4 overflow-hidden flex gap-4 items-end">
                {[40, 70, 100, 60, 85, 45, 90].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-full rounded-t-lg ${i === 2 ? 'primary-gradient' : 'bg-primary/20'}`}
                  />
                ))}
              </div>
            }
          />
          
          <FeatureChallengeCard 
            colSpan="md:col-span-5"
            bg="bg-primary-container text-white"
            icon={<img src={challengeIcon} className="w-6 h-6 invert" alt="icon" />}
            title="Challenges"
            description="Replace interviews with 'Work-Sims'—real-world sandbox challenges that mimic your company's actual daily tasks."
            content={
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary-fixed" />
                  Auto-graded coding tasks
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary-fixed" />
                  System design whiteboards
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary-fixed" />
                  Leadership simulation playbooks
                </li>
              </ul>
            }
          />
          
          <FeatureCard 
            colSpan="md:col-span-5"
            icon={<Bot className="text-primary w-6 h-6" />}
            title="Smart Hiring"
            description="Our AI Matcher analyzes your team's existing skill DNA to find the missing puzzle piece in your talent pipeline."
          />
          
          <FeatureCard 
            colSpan="md:col-span-7"
            bg="bg-surface-container-highest"
            title="Built-in Interviews"
            description="Full-featured video conferencing with integrated IDEs, collaboration tools, and real-time skill tagging."
            content={
              <div className="flex items-center gap-8 h-full">
                <div className="hidden lg:flex w-1/3 aspect-square rounded-2xl bg-white shadow-inner border border-outline-variant items-center justify-center">
                  <Video className="w-12 h-12 text-primary/40" />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
const FeatureChallengeCard = ({ colSpan, bg = "bg-surface-container-low", icon, title, description, content }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${colSpan} ${bg} p-8 rounded-3xl border border-outline-variant transition-all group overflow-hidden`}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          {icon && (
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-bold font-headline mb-4">{title}</h3>
          <p className="text-white mb-6 leading-relaxed">{description}</p>
        </div>
        {content && <div className="mt-auto">{content}</div>}
      </div>
    </motion.div>
  );
};
const FeatureCard = ({ colSpan, bg = "bg-surface-container-low", icon, title, description, content }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${colSpan} ${bg} p-8 rounded-3xl border border-outline-variant transition-all group overflow-hidden`}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          {icon && (
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-bold font-headline mb-4">{title}</h3>
          <p className="text-on-surface-variant mb-6 leading-relaxed">{description}</p>
        </div>
        {content && <div className="mt-auto">{content}</div>}
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Define Your Skill DNA",
      description: "Tell us what skills matter, not what job title you're looking for. Our engine maps your needs to specific measurable outcomes."
    },
    {
      number: 2,
      title: "Deploy Adaptive Challenges",
      description: "Candidates enter a customized environment where they solve problems relevant to your stack. No more generic brain teasers."
    },
    {
      number: 3,
      title: "Hire with Pure Confidence",
      description: "Review data-backed skill reports and performance playback. Make hiring decisions based on objective truth, not interview charm."
    }
  ];

  return (
    <section className="px-8 py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-on-surface font-headline mb-4">The Talent Pipeline of 2025</h2>
          <p className="text-on-surface-variant">Three simple steps to build a high-performance team without the resume noise.</p>
        </div>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-8 relative">
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-outline-variant"></div>
              )}
              <div className="w-12 h-12 rounded-full primary-gradient text-white flex items-center justify-center font-bold text-xl shrink-0 z-10 shadow-lg">
                {step.number}
              </div>
              <div className="pt-2">
                <h4 className="text-xl font-bold font-headline mb-2">{step.title}</h4>
                <p className="text-on-surface-variant leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      quote: "We reduced our time-to-hire by 65% while increasing the quality of engineering talent. The skill profiles are scarily accurate.",
      author: "David Chen",
      role: "CTO at FluxAI",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
    },
    {
      quote: "The challenge-first approach finally levels the playing field for self-taught developers. It's the most fair hiring tool we've used.",
      author: "Sarah Jenkins",
      role: "Head of Talent at Nexa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    {
      quote: "Hire Skills is the intelligence layer our HR department was missing. We now hire for the future, not just for a list of bullet points.",
      author: "Marcus Thorne",
      role: "CEO at VentureOne",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus"
    }
  ];

  return (
    <section className="px-8 py-24 bg-white max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {reviews.map((rev, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant italic relative flex flex-col justify-between"
          >
            <Quote className="text-primary/20 absolute top-4 right-4 w-10 h-10" />
            <p className="text-on-surface mb-8 text-lg leading-relaxed font-medium">"{rev.quote}"</p>
            <div className="flex items-center gap-4 not-italic">
              <img className="w-12 h-12 rounded-full object-cover" src={rev.avatar} alt={rev.author} />
              <div>
                <h5 className="font-bold text-on-surface font-headline">{rev.author}</h5>
                <p className="text-xs text-on-surface-variant font-semibold">{rev.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="px-8 pb-24 max-w-7xl mx-auto">
      <div className="primary-gradient rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg height="100%" width="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold font-headline mb-6 leading-tight">
            Ready to find your <br/>next elite performer?
          </h2>
          <p className="text-on-primary-container text-lg mb-10 opacity-90">
            Join 5,000+ forward-thinking companies already hiring based on actual capability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-transform">
              Create Your Account
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-bold backdrop-blur-md hover:bg-white/20 transition-all">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 block font-headline">Hire Skills</span>
            <p className="text-on-surface-variant max-w-xs leading-relaxed">
              Redefining talent acquisition through objective skill validation and data-driven insights. Built for the future of work.
            </p>
            <div className="flex gap-4 mt-8">
              <FooterSocialIcon icon={<Globe />} />
              <FooterSocialIcon icon={<Share2 />} />
              <FooterSocialIcon icon={<Users />} />
            </div>
          </div>
          <div className="md:col-span-2">
            <h6 className="font-bold mb-6 font-headline">Product</h6>
            <ul className="space-y-4 text-on-surface-variant text-sm font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">For Candidates</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">For Recruiters</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Assessments</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h6 className="font-bold mb-6 font-headline">Company</h6>
            <ul className="space-y-4 text-on-surface-variant text-sm font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h6 className="font-bold mb-6 font-headline">Stay Updated</h6>
            <p className="text-sm text-on-surface-variant mb-4 font-medium">Get the latest insights on skill-based hiring.</p>
            <form className="flex gap-2">
              <input 
                className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-primary focus:border-primary focus:outline-none" 
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">Join</button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-semibold">
          <p>© 2024 Hire Skills Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/*const FooterSocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a className="p-2 bg-surface-container-low rounded-lg text-primary hover:bg-primary-fixed transition-colors" href="#">
    {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
  </a>
);*/
const FooterSocialIcon = ({ icon }: { icon: React.ReactElement<{ className?: string }> }) => (
  <a className="p-2 bg-surface-container-low rounded-lg text-primary hover:bg-primary-fixed transition-colors" href="#">
    {React.cloneElement(icon, { className: 'w-5 h-5' })}
  </a>
);
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
