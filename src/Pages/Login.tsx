import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
import githubIcon from "@/assets/ic_github.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../src/Context/AuthContext.tsx";
import "../../src/css/Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, sendResetLink, signInWithGoogle, signInWithGithub } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const sendPasswordReset = async () => {
    try {
       if (!email.trim()) {
      setError("Email is required");
      return false;
    }
      setResetting(true);
      console.log("signing in started");
      await sendResetLink(email);
      setResetting(false);
      console.log("password reset link send");
      setSuccess("Password Reset Link Sent to Your Email");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setResetting(false);
    }
  };
  const handleGithubSignin = async () => {
    try {
      setLoading(true);
      console.log("github signing in started");
      await signInWithGithub();
      setLoading(false);
      console.log("Signin successful");
      setSuccess("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      console.log("google signing in started");
      await signInWithGoogle();
      setLoading(false);
      console.log("Signin successful");
      setSuccess("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      console.log("signing in started");
      await signIn(email, password);
      setLoading(false);
      console.log("Signin successful");
      setSuccess("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <main className="min-h-screen flex items-stretch font-sans bg-background-custom text-on-background antialiased selection:bg-primary-fixed selection:text-primary">
      {/* Left Side: Branding & Illustration */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col px-16 overflow-hidden bg-primary-container">
        {/* Background Texture */}
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyiV88Tjc1KL95VLpiOjlcckZVFAd13l59mkVaOTQ3PXh4bi4tcjFD5AE-7p_YNN4OKsRT_-uYllhHgtWyKqPMy5KoJ8FyQsOXNjT3Sf_7fPEpF71W-jxewU53QPc85MO4Nk6z-XE2J-64OckvDqCZB69d-HA2PT7PEh00skUOsWcKE1NNMBmjSy8r0EYmIFQ9r5THW9UIs0hR4hMc-nw-vQH4GKbC_ZwV_BMSO9AMvCKXxRbRmHZL-DgF5on7vgSLfjBI8m2fD6Y')",
          }}
        />

        <div className="relative z-10 space-y-8">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl primary-gradient flex items-center justify-center shadow-lg">
              <Brain className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-white font-headline">
              Hire Skills
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold text-white font-headline leading-tight tracking-tight">
              Hire Skills,
              <br />
              <span className="text-primary-fixed-dim">Not Resumes.</span>
            </h1>
            <p className="mt-6 text-xl text-primary-fixed leading-relaxed opacity-90">
              The elite intelligence layer for modern hiring teams. Discover
              technical excellence through data-driven insights rather than
              paper credentials.
            </p>
          </div>

          {/* Bento-style Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 glass-card border border-white/20 rounded-2xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  alt="Alex Rivera - Senior Backend Engineer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-xtw51HBBXihIapzzSJR3bg2-dfKFWkt9s8-SAyIwXejRFrc_4_1vGSbZSFkn__ZFz53_qjVpyyY089mhRdFh-8qu6DcBkyW2ccyHgN_PfaTW6c0eVWXOa5vLA29C4o44j1KHTeYgYKIpDFPUla6_YSfjM_N2tBNzJTB_91P24bdLt2tVl9uRuipx2nr4kok35a--gmaeyVkdLyhIztJjF2Bsr05VuI1XxTc042QGaKjbEWzuWK3d5Jt4SRSiVYxH-CXudF79IGk"
                />
              </div>
              <div>
                <p className="text-on-surface font-bold">Alex Rivera</p>
                <p className="text-xs text-on-surface-variant font-medium">
                  Senior Backend Engineer
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Skill Score
                </span>
                <span className="text-lg font-bold text-primary">98/100</span>
              </div>
              <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full primary-gradient rounded-full shadow-[0_0_8px_rgba(79,55,138,0.5)]"
                />
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase">
                  Distributed Systems
                </span>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase">
                  Go
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="flex-1 flex flex-col px-6 sm:px-12 md:px-24 bg-surface-custom lg:bg-background-custom min-h-screen py-12">
        <div className="max-w-md w-full mx-auto space-y-10">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Brain className="text-primary w-8 h-8" />
            <span className="text-2xl font-extrabold tracking-tight text-on-surface font-headline">
              Hire Skills
            </span>
          </div>

          <header>
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">
              Sign In
            </h2>
            <p className="mt-2 text-on-surface-variant font-medium">
              Welcome back to the future of hiring.
            </p>
          </header>

          {/* Social Login */}
          <div className="space-y-4">
            <button onClick={handleGoogleSignin} className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-outline-variant bg-surface-container-lowest rounded-xl font-semibold text-on-surface-variant hover:bg-surface-container hover:border-outline transition-all duration-200 active:scale-[0.98]">
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
              Continue with Google
            </button>
            <button onClick={handleGithubSignin} className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-outline-variant bg-surface-container-lowest rounded-xl font-semibold text-on-surface-variant hover:bg-surface-container hover:border-outline transition-all duration-200 active:scale-[0.98]">
              <img src={githubIcon} className="w-5 h-5" alt="GitHub" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-outline uppercase tracking-widest">
              or email
            </span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Manual Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                className="block text-sm font-bold text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Work Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-medium"
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label
                  className="block text-sm font-bold text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                to={'#'}
                onClick={sendPasswordReset}
                  className="text-xs font-bold text-primary hover:text-surface-tint transition-colors"
                 
                >
                 {resetting ? "Sending Reset Link.." : "Forgot password?"}
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-medium"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-sm font-medium text-on-surface-variant cursor-pointer"
                htmlFor="remember"
              >
                Remember this device
              </label>
            </div>

            <button
              className="w-full py-4 primary-gradient text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              type="submit"
              onClick={handleSignin}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {error && <Alert message={error} />}

          {success && <Alert message={success} isSuccess />}

          <div className="max-w-md w-full mx-auto space-y-10 flex flex-col min-h-2">
            <footer className="mt-auto pt-1 text-center z-10">
              <p className="text-sm font-medium text-on-surface-variant">
                New to Hire Skills?
                <Link
                  to="/signup1"
                  replace
                  className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
                  
                >
                  Create an account
                </Link>
              </p>
            </footer>
          </div>
        </div>

        {/* Floating Footer Links */}
        <div className="mt-auto pt-10 pb-6 text-xs font-bold text-outline uppercase tracking-widest flex justify-between">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>

          <p>© 2024 Elite Hiring</p>

          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </section>
    </main>
  );
}
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type AlertProps = {
  message: string;
  isSuccess?: boolean;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
};

export const Alert = ({
  message,
  isSuccess,
  type,
  className = "",
}: AlertProps) => {
  const finalType = isSuccess ? "success" : type || "error";

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      styles: {
        background: "rgba(34, 197, 94, 0.08)",
        border: "1px solid rgba(34, 197, 94, 0.25)",
        color: "#16a34a",
      },
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      styles: {
        background: "rgba(239, 68, 68, 0.08)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
        color: "#dc2626",
      },
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      styles: {
        background: "rgba(245, 158, 11, 0.08)",
        border: "1px solid rgba(245, 158, 11, 0.25)",
        color: "#d97706",
      },
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      styles: {
        background: "rgba(59, 130, 246, 0.08)",
        border: "1px solid rgba(59, 130, 246, 0.25)",
        color: "#2563eb",
      },
    },
  };

  const current = config[finalType];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-200 ${className}`}
      style={{
        background: current.styles.background,
        border: current.styles.border,
        color: current.styles.color,
      }}
    >
      <div className="mt-0.5">{current.icon}</div>

      <p className="leading-relaxed flex-1">{message}</p>
    </div>
  );
};
