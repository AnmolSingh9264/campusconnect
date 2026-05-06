/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  MailCheck,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  Shield,
} from "lucide-react";
import "../../src/css/SignUp3.css";
import { useAuth } from "../../src/Context/AuthContext.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SignUP3() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resendEmail } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifing, setVerified] = useState(false);
  const { checkIsVerified } = useAuth();
  const email = location.state.useremail;

  const handleVerifyClick = () => {
    window.location.href = "https://mail.google.com/";
  };

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

  const handleResend = async () => {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      await resendEmail(email);
      console.log("resend successful");
      setSuccess("Verification email resend");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const IsVerified = async () => {
    setVerified(true);
    const isVerified = await checkIsVerified();

    if (isVerified) {
      console.log("confirmed");
      setSuccess("You’re all set! Your email has been verified.");
      navigate("/login")
    } else {
      console.log("not confirmed");
      setError(
        "We’ve sent you a verification email. Check your inbox (and spam folder).",
      );
    }
    setVerified(false);
  };

  type AlertProps = {
    message: string;
    isSuccess?: boolean;
    className?: string;
  };

  const Alert = ({
    message,
    isSuccess = false,
    className = "",
  }: AlertProps) => {
    return (
      <div
        className={`p-3 rounded-lg text-sm font-medium transition-all ${className}`}
        style={{
          margin: 10,
          color: isSuccess ? "#52c41a" : "#ff4d4f",
          background: isSuccess
            ? "rgba(82,196,26,0.08)"
            : "rgba(255,77,79,0.08)",
          border: `1px solid ${isSuccess ? "#b7eb8f" : "#ffa39e"}`,
        }}
      >
        {isSuccess ? "✅ " : "❌ "} {message}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen bg-background overflow-x-hidden">
      {/* LEFT PANEL: Brand Messaging & Illustration */}
      <section className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-primary px-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed-dim blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-tertiary-fixed-dim blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 inline-flex items-center gap-3"
          >
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <span className="text-white text-2xl font-extrabold tracking-tight">
              Hire Skills
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold text-white leading-tight mb-6 font-display"
          >
            Almost there!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-primary-fixed-dim text-xl font-medium leading-relaxed mb-12"
          >
            {
              "We're preparing your intelligence-driven workspace. Just one more step to unlock a new era of talent acquisition."
            }
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
              stiffness: 50,
            }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-90 group-hover:scale-100 transition-transform duration-500"></div>
            <img
              alt="Onboarding Illustration"
              className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgBZxf-vJlmc-ankVvgDoRofhpCWok4t5Fz7BP0i5dNnhFqNWAATF09ChyzSG6UOL-I4FIgbav8LeC2k_etfB2z_FExtC-0Sv9PENyeWMA2juUHi0aIIRNNJ_XqwRKYxGz_LeQIwN15zbHdHn8C935JXfB-8PayPQvFOQJvhr4M8HNG_gnXKM4yFhWWtamOW6LudxoHzrWATjLT5nb21zuGWYe5uvHEvKjw5Z5XUdD4ehbkd7yLaTYT66vK3aDb3fMJ941cK0xyBY"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* RIGHT PANEL: Verification Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mb-12 flex justify-center"
          >
            <span className="text-primary text-2xl font-extrabold tracking-tight">
              Hire Skills
            </span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Step 3 of 3
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Final Stage
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-outline-variant p-8 md:p-10 rounded-3xl shadow-glass text-center"
          >
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/10">
              <MailCheck className="text-primary w-10 h-10 fill-primary/20" />
            </div>
            <h2 className="text-2xl font-extrabold text-on-surface mb-4 font-display">
              Check your inbox
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-10">
              {"We've sent a secure verification link to "}
              <span className="font-bold text-on-surface">{email}</span>
              {". Please click the link to activate your account."}
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={IsVerified}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md group"
              >
               {verifing ? "Verifying..." : "Verify Now"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <div className="pt-6 border-t border-outline-variant/50">
                <p className="text-sm text-on-surface-variant mb-4">
                  {"Didn't receive the email?"}
                </p>
                <motion.button
                  onClick={handleResend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border border-outline-variant text-primary font-semibold rounded-lg hover:bg-surface-container-low transition-all duration-200"
                >
                  {loading ? "Resending..." : "Resend Email"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {error && <Alert message={error} />}

          {success && <Alert message={success} isSuccess />}

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/signup2"
              replace
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-medium transition-colors group"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to details
            </Link>
          </motion.div>

          {/* Trust Footer */}
          <div className="mt-16 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-tighter">
                Secure Auth
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-tighter">
                Data Privacy
              </span>
            </div>
          </div>
        </div>

        {/* Background Decoration for Right Panel */}
        <div className="fixed top-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
          <svg
            fill="none"
            height="600"
            viewBox="0 0 600 600"
            width="600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="300"
              cy="300"
              fill="url(#paint0_radial_hire_skills)"
              r="300"
            ></circle>
            <defs>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="translate(300 300) rotate(90) scale(300)"
                gradientUnits="userSpaceOnUse"
                id="paint0_radial_hire_skills"
                r="1"
              >
                <stop stopColor="#4f378a"></stop>
                <stop offset="1" stopColor="#4f378a" stopOpacity="0"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </main>
  );
}
