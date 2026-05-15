import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Book,
  GitBranch,
  Calendar,
  Star,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/Context/AuthContext.tsx";
//import { useUpdateUser } from "../features/user/userHooks";
import "../../src/css/SignUp2.css";
import {
  useUniversities,
  useCourses,
  useBranches,
} from "../features/signup/signupHooks.ts";

export default function SignUP2() {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullname, setFullName] = useState("");
  const [isTermsAccepted, setTermsAccepted] = useState(false);

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

  // const { mutateAsync } = useUpdateUser();

  /*const saveUser = async () => {

  if (!validateForm()) return;

  try {
    await mutateAsync({
        id:user?.id ?? "",
        updates:{
      full_name:fullname,
      university,
      course,
      branch,
      year,
      role:"candidate"
        }
    });
    console.log("user saved" + user?.id)
  } catch (err: any) {
    setError(err.message);
  }
};*/
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const { signUp } = useAuth();

  const validateForm = () => {
    if (!fullname.trim()) {
      setError("Full name is required");
      return false;
    }

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

    if (!gender.trim()) {
      setError("Gender is required");
      return false;
    }

    if (!university.trim()) {
      setError("University is required");
      return false;
    }

    if (!course.trim()) {
      setError("Course is required");
      return false;
    }

    if (!branch.trim()) {
      setError("Branch is required");
      return false;
    }

    if (!year.trim()) {
      setError("Year is required");
      return false;
    }

    if (!isTermsAccepted) {
      setError("You must accept the terms and conditions");
      return false;
    }

    setError(""); // clear errors
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await signUp(
        email,
        password,
        fullname,
        gender,
        university,
        course,
        branch,
        year,
        50
      );
      console.log("SignUp successful");
      navigate("/signup3", {
        state: {
          useremail: email,
        },
      });
    } catch (error: any) {
      console.error(error.message);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Password strength logic (simple for demo purposes)
  const strength =
    password.length === 0
      ? 0
      : password.length < 4
        ? 1
        : password.length < 6
          ? 2
          : password.length >= 8
            ? 4
            : 3;
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      {/* Left Column: Branding and Testimonial */}
      <section className="hidden md:flex md:w-5/12 bg-primary relative overflow-hidden flex-col justify-between p-12 lg:p-20 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container opacity-20 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-container opacity-10 rounded-full -ml-40 -mb-40 blur-2xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <Sparkles className="text-primary w-6 h-6 fill-primary/20" />
            </div>
            <span className="font-headline font-extrabold text-2xl tracking-tight">
              Hire Skills
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-headline font-extrabold text-5xl lg:text-7xl leading-tight mb-8"
          >
            Build your <br />
            <span className="text-on-primary-container">future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-on-primary-container text-lg max-w-sm font-medium opacity-90 leading-relaxed"
          >
            Join the next generation of talent acquisition powered by
            elite-level technical assessment and predictive intelligence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 shadow-2xl">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-tertiary-fixed fill-tertiary-fixed"
                />
              ))}
            </div>
            <p className="text-white text-lg font-medium italic mb-6 leading-relaxed">
              &quot;Hire Skills completely transformed our technical hiring
              pipeline. We reduced time-to-hire by 40% while doubling the
              quality of candidates.&quot;
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Elena Rodriguez"
                className="w-12 h-12 rounded-full border-2 border-primary-container object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-sm">Elena Rodriguez</p>
                <p className="text-on-primary-container text-[10px] sm:text-xs opacity-70 uppercase tracking-widest font-semibold">
                  Head of Talent at Nexus AI
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Right Column: Signup Form */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-surface-container-lowest overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-10 justify-center">
            <Sparkles className="text-primary w-8 h-8" />
            <span className="font-headline font-extrabold text-2xl text-on-surface tracking-tight">
              Hire Skills
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                Step 2 of 3
              </span>
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Account Setup
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "66%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-full bg-primary rounded-full shadow-sm"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-headline font-bold text-3xl text-on-surface mb-2">
              Basic Details
            </h2>
            <p className="text-on-surface-variant text-sm font-medium">
              Let&apos;s set up your professional credentials.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="fullname"
              >
                FULL NAME
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="email"
              >
                WORK EMAIL
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium placeholder:text-outline-variant/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="px-1 space-y-2">
                <div className="flex gap-1.5 h-1">
                  <div
                    className={`flex-1 rounded-full transition-colors duration-300 ${strength >= 1 ? "bg-tertiary" : "bg-surface-container-high"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-300 ${strength >= 2 ? "bg-tertiary" : "bg-surface-container-high"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-300 ${strength >= 3 ? "bg-primary" : "bg-surface-container-high"}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors duration-300 ${strength >= 4 ? "bg-primary" : "bg-surface-container-high"}`}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold text-tertiary tracking-wide">
                    {strength === 0
                      ? "Enter password"
                      : strength === 1
                        ? "Weak"
                        : strength === 2
                          ? "Moderate strength"
                          : "Strong Password"}
                  </p>
                  <p className="text-[10px] font-medium text-on-surface-variant">
                    Min. 8 characters
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold text-on-surface-variant px-1"
                htmlFor="gender"
              >
                GENDER
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
              </div>
            </div>

            {/* University Details */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-bold text-on-surface-variant px-1"
                  htmlFor="university"
                >
                  COLLEGE / UNIVERSITY
                </label>
                <div className="relative group">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                  <select
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-white border border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    <GitBranch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
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

            <div className="flex items-start gap-3 px-1 py-2">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer accent-primary"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-xs font-medium text-on-surface-variant leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a href="#" className="text-primary font-bold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-primary/20 transition-all duration-200 mt-2"
              type="submit"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating Account..." : " Create Account"}
            </motion.button>
            {error && (
              <p
                style={{
                  color: "#ff4d4f",
                  background: "rgba(255,77,79,0.08)",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  marginTop: "10px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {error}
              </p>
            )}
          </form>

          <div className="mt-10 text-center">
            <Link
              to="/signup1"
              replace
              className="inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-all group tracking-wide uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to path selection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
