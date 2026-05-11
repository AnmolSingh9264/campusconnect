import { useState, useEffect } from "react";
import { motion } from "motion/react";
import githubIcon from "@/assets/ic_github.png";
import { Sparkles, Brain, Search, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/Context/AuthContext.tsx";

import "../../src/css/SignUp1.css";
import { Alert } from "./Login.tsx";

type Role = "candidate" | "recruiter";

export default function SignUP1() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

   const handleGithubSignin = async () => {
    try {
      console.log("github signing in started");
      await signInWithGithub();
      console.log("Signin successful");
      setSuccess("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      console.log("google signing in started");
      await signInWithGoogle();
      console.log("Signin successful");
      setSuccess("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const [selectedRole, setSelectedRole] = useState<Role>("recruiter");
  return (
    <main className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Side: Brand Section */}
      <section className="hidden md:flex md:w-5/12 primary-gradient relative flex-col justify-between p-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary-light/30 rounded-full -ml-40 -mb-40 blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-brand-primary w-6 h-6" />
            </div>
            <span className="text-white text-2xl font-headline font-extrabold tracking-tight">
              Hire Skills
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-white leading-tight mb-6">
            Connect with the <br />
            <span className="text-brand-tertiary">future of talent.</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed font-medium">
            Our AI-driven platform bridges the gap between skill and
            opportunity. Join the elite network of developers and visionaries
            today.
          </p>

          <div className="mt-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCri_Vd-6KvhWh-m7tPDSKvzpOc9vNV1KSzbmVVCzc1vHuzqjlvFuILLX7n-4mSIoasPFKDHkS0pwb-w6Qewffs2WoKgrvCfJ_zsvyDCPtRc6USlGEgoWLyyjlJEGmMy1e_7PhPSL_Y9yILdd7i79mBx9oauu9BwOByyV7QWyCtzxm-f3OcpAX_vnfq1NQvjdeyqj_uv3ORAce0iuMIfKANax17DCEFh1CnEikTeLwvyvES_YNkvS6584n0EM1hkV0kGl4mTFFoFak"
                  alt="Sarah Jenkins"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  "Found my dream CTO role in 2 weeks."
                </p>
                <p className="text-white/60 text-xs">
                  — Sarah Jenkins, Tech Lead
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex gap-6 text-white/50 text-xs">
          <span>© 2024 Hire Skills Inc.</span>
          <a className="hover:text-white transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-white transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </section>

      {/* Right Side: Form Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 bg-brand-surface">
        <div className="w-full max-w-[500px]">
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                Step 1 of 3
              </span>
              <a
                className="text-sm font-medium text-brand-outline hover:text-brand-primary transition-colors flex items-center gap-1"
                href="#"
              >
                Already have an account?{" "}
                <span
                  className="text-brand-primary font-bold"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Sign In
                </span>
              </a>
            </div>
            <div className="w-full h-1.5 bg-brand-outline-variant/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "33.33%" }}
                className="h-full primary-gradient rounded-full"
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-headline font-extrabold text-brand-on-surface mb-3">
              Choose your path
            </h2>
            <p className="text-brand-on-surface-variant font-medium leading-relaxed">
              To get started, please tell us how you plan to use Hire Skills.
              You can always change this later.
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4 mb-10">
            {/* Candidate Option */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedRole("candidate")}
              className={`w-full group relative flex items-start gap-5 p-6 rounded-2xl border-2 transition-all text-left focus:outline-none focus:ring-4 focus:ring-brand-primary/10 ${
                selectedRole === "candidate"
                  ? "border-brand-primary bg-brand-primary/5 shadow-md"
                  : "border-brand-outline-variant bg-white shadow-sm hover:border-brand-primary/50"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedRole === "candidate"
                    ? "bg-brand-primary-light text-white"
                    : "bg-brand-surface text-brand-primary group-hover:bg-brand-primary/10"
                }`}
              >
                <Brain className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-brand-on-surface mb-1">
                  I'm a Candidate
                </h3>
                <p className="text-sm text-brand-on-surface-variant leading-snug">
                  Showcase your skills, take challenges, and get hired by
                  world-class companies.
                </p>
              </div>
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedRole === "candidate"
                    ? "border-brand-primary bg-brand-primary"
                    : "border-brand-outline-variant group-hover:border-brand-primary"
                }`}
              >
                {selectedRole === "candidate" && (
                  <motion.div
                    layoutId="selectionCircle"
                    className="w-2 h-2 rounded-full bg-white"
                  />
                )}
              </div>
            </motion.button>

            {/* Recruiter Option */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedRole("recruiter")}
              className={`w-full group relative flex items-start gap-5 p-6 rounded-2xl border-2 transition-all text-left focus:outline-none focus:ring-4 focus:ring-brand-primary/10 ${
                selectedRole === "recruiter"
                  ? "border-brand-primary bg-brand-primary/5 shadow-md"
                  : "border-brand-outline-variant bg-white shadow-sm hover:border-brand-primary/50"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedRole === "recruiter"
                    ? "bg-brand-primary-light text-white"
                    : "bg-brand-surface text-brand-primary group-hover:bg-brand-primary/10"
                }`}
              >
                <Search className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-brand-on-surface mb-1">
                  I'm a Recruiter
                </h3>
                <p className="text-sm text-brand-on-surface-variant leading-snug">
                  Find pre-vetted technical talent, launch challenges, and
                  streamline your hiring flow.
                </p>
              </div>
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedRole === "recruiter"
                    ? "border-brand-primary bg-brand-primary"
                    : "border-brand-outline-variant group-hover:border-brand-primary"
                }`}
              >
                {selectedRole === "recruiter" && (
                  <motion.div
                    layoutId="selectionCircle"
                    className="w-2 h-2 rounded-full bg-white"
                  />
                )}
              </div>
            </motion.button>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/signup2")}
              className="w-full h-14 primary-gradient text-white font-headline font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue to Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-brand-outline-variant" />
              <span className="text-xs font-bold text-brand-outline uppercase tracking-widest whitespace-nowrap">
                Or social sign up
              </span>
              <div className="flex-1 h-px bg-brand-outline-variant" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleGoogleSignin} className="flex items-center justify-center gap-2 h-12 rounded-xl border border-brand-outline-variant bg-white text-sm font-bold text-brand-on-surface-variant hover:bg-brand-surface transition-all active:scale-[0.98]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button onClick={handleGithubSignin} className="flex items-center justify-center gap-2 h-12 rounded-xl border border-brand-outline-variant bg-white text-sm font-bold text-brand-on-surface-variant hover:bg-brand-surface transition-all active:scale-[0.98]">
                <img src={githubIcon} className="w-5 h-5" alt="GitHub" />
                GitHub
              </button>
            </div>
          </div>
          {error || success ? (
            <div style={{ padding: "20px" }}></div>
          ) : (
            <div></div>
          )}

          {error && <Alert message={error} />}

          {success && <Alert message={success} isSuccess />}

          {/* Back Action */}
          <div className="mt-8 text-center md:text-left">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-bold text-brand-outline hover:text-brand-primary transition-colors inline-flex items-center gap-1 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
