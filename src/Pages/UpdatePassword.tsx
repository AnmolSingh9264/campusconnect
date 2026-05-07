import { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import "../../src/css/SignUp3.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/Context/AuthContext.tsx";
import { Alert } from "./Login.tsx";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const validateForm = () => {
    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("New password and updated password should be same");
      return false;
    }
    return true;
  };

  const ResetPassword = async () => {
    try {
      if (!validateForm()) {
        return false;
      }
      setLoading(true);
      await updatePassword(password);
      setLoading(false);
      console.log("password reset successfully");
      setSuccess("Password reset successfully");
      navigate("/login", { replace: true });
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordMetrics = useMemo(() => {
    const metrics = {
      length: password.length >= 8,
      case: /[a-z]/.test(password) && /[A-Z]/.test(password),
      symbols: /[0-9!@#$%^&*]/.test(password),
    };

    let strength = 0;
    if (password.length > 0) {
      if (metrics.length) strength += 55;
      if (metrics.case) strength += 25;
      if (metrics.symbols) strength += 20;
    }

    return { ...metrics, strength };
  }, [password]);

  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary/20">
      {/* Left Side: Visual/Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 primary-gradient relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Patterns */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl"
        />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12 group cursor-pointer w-fit">
            <div className="w-10 h-10 bg-on-primary rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Sparkles className="text-primary size-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-on-primary font-headline">
              Hire Skills
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-on-primary leading-tight mb-6 max-w-md font-headline">
            Secure your account.
          </h1>
          <p className="text-on-primary-container/80 text-lg max-w-sm leading-relaxed">
            Our multi-layered intelligence platform ensures your data remains
            protected while you focus on scaling your team.
          </p>
        </motion.div>

        {/* Contextual Card: Security Tip */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 mt-auto"
        >
          <div className="glass-panel rounded-2xl p-6 shadow-2xl max-w-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-on-primary/30">
                <img
                  className="w-full h-full object-cover"
                  alt="Security Expert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyDw4z9AIbvJ1IpkhTuKUc6VEi3Z5-wANfMY6S3SJjEM21L3xu6vrj49l3FN2i56AabD9npzPcZN7Tcrqdjp0yDXqPr6448e94fsbtP4maoG3bKTUA9n4iF89BmEn86d7DihjWjfAMyFof0AtrVPXTpXtppIZUJSBkMmo6zF1M6MVZt88u24vA1joUrnEuvprn_m_0zqSIIIDQ3GldS5eho5BDDoLBgvw4p_wZSOjA5-AjIQSXs4u4YhR-tVREKe4eorXC1v2ysYo"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-on-primary font-semibold text-sm">
                  Security Tip
                </p>
                <p className="text-on-primary/60 text-xs">
                  AI-Verification Active
                </p>
              </div>
            </div>
            <p className="text-on-primary/90 text-sm italic leading-relaxed">
              "Enabling two-factor authentication and rotating your credentials
              regularly is the hallmark of a high-performance hiring strategy."
            </p>
            <div className="mt-4 flex gap-1.5">
              <div className="h-1.5 w-8 bg-on-primary rounded-full" />
              <div className="h-1.5 w-1.5 bg-on-primary/30 rounded-full" />
              <div className="h-1.5 w-1.5 bg-on-primary/30 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Password Update Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white p-8 md:p-16 relative">
        <div className="w-full max-w-md mx-auto">
          {/* Brand Mobile View Only */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="text-on-primary size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-on-surface font-headline">
              Hire Skills
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-extrabold text-on-surface mb-2 font-headline tracking-tight">
              Update Password
            </h2>
            <p className="text-on-surface-variant">
              Please enter your new credentials below.
            </p>
          </motion.div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* New Password Input */}
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface-variant"
                htmlFor="new_password"
              >
                New Password
              </label>
              <div className="relative group">
                <input
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline-variant/60"
                  id="new_password"
                  name="new_password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                password.length > 0
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              className="overflow-hidden"
            >
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Security Level:{" "}
                    {passwordMetrics.strength >= 85
                      ? "Strong"
                      : passwordMetrics.strength >= 40
                        ? "Fair"
                        : "Weak"}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {passwordMetrics.strength}%
                  </span>
                </div>
                <div className="flex gap-1.5 h-1.5 mb-4">
                  <div
                    className={`flex-1 rounded-full transition-colors duration-500 ${passwordMetrics.strength >= 20 ? "bg-primary" : "bg-surface-variant"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-500 ${passwordMetrics.strength >= 40 ? "bg-primary" : "bg-surface-variant"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-500 ${passwordMetrics.strength >= 65 ? "bg-primary" : "bg-surface-variant"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-500 ${passwordMetrics.strength >= 85 ? "bg-primary" : "bg-surface-variant"}`}
                  />
                </div>

                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${passwordMetrics.length ? "text-on-secondary-container" : "text-on-surface-variant opacity-50"}`}
                  >
                    {passwordMetrics.length ? (
                      <CheckCircle2 className="size-4 fill-on-secondary-container text-white" />
                    ) : (
                      <Circle className="size-4" />
                    )}
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${passwordMetrics.case ? "text-on-secondary-container" : "text-on-surface-variant opacity-50"}`}
                  >
                    {passwordMetrics.case ? (
                      <CheckCircle2 className="size-4 fill-on-secondary-container text-white" />
                    ) : (
                      <Circle className="size-4" />
                    )}
                    <span>Uppercase & lowercase letters</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${passwordMetrics.symbols ? "text-on-secondary-container" : "text-on-surface-variant opacity-50"}`}
                  >
                    {passwordMetrics.symbols ? (
                      <CheckCircle2 className="size-4 fill-on-secondary-container text-white" />
                    ) : (
                      <Circle className="size-4" />
                    )}
                    <span>Numbers & special symbols</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface-variant"
                htmlFor="update_password_confirm"
              >
                Update Password
              </label>
              <div className="relative group">
                <input
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline-variant/60"
                  id="update_password_confirm"
                  name="update_password_confirm"
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={ResetPassword}
              className="w-full h-12 primary-gradient text-on-primary font-bold rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              <span>
                {loading ? "Updating password..." : "Update Password"}
              </span>
              <Lock className="size-4" />
            </motion.button>
          </form>
        {error||success ? <div style={{ padding: "20px" }}></div> : <div></div>}

          {error && <Alert message={error} />}

          {success && <Alert message={success} isSuccess />}

          {/* Footer Links */}
          <div className="mt-10 text-center">
            <Link
              to={"/login"}
              replace
              className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Sign In
            </Link>
          </div>

          {/* Footer Legal (Minimalist) */}
          <div className="mt-20 pt-8 border-t border-outline-variant/30 flex justify-between items-center text-[10px] uppercase tracking-widest text-outline font-bold">
            <span>© 2024 Hire Skills</span>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
