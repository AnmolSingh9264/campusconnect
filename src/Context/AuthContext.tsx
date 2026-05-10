import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../src/Supabase/Client";
import type { ReactNode } from "react";
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  checkIsVerified: () => Promise<boolean>;
  resendEmail: (email: string) => Promise<void>;
  sendResetLink: (email: string) => Promise<void>;
  updatePassword:(password: string) => Promise<void>;
  signInWithGoogle:() => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullname: string,
    gender: String,
    university: string,
    course: string,
    branch: string,
    year: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

   const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error(error.message)
    }
  }

  const checkIsVerified = async (): Promise<boolean> => {
   const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.log("no user");
    return false;
  }

  console.log("fresh email:", data.user.email);
  console.log("fresh confirmed:", data.user.email_confirmed_at);

  if (data.user.email_confirmed_at) {
    console.log("confirmed");
    return true;
  } else {
    console.log("not confirmed");
    return false;
  }
};

  const resendEmail = async (email: string) => {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }
};

const sendResetLink = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/updatepassword",
  });

  if (error) {
    console.log(error.message);
    throw error
  } else {
    console.log("Reset email sent");
  }
};

const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
   password: password
  });

  if (error) {
    console.log(error.message);
    throw error
  } else {
    console.log("Reset email sent");
  }
};

  const signUp = async (
    email: string,
    password: string,
    fullname: string,
    gender: String,
    university: string,
    course: string,
    branch: string,
    year: string,
  ) => {
    await supabase.auth.signOut();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:"http://localhost:5173/login",
        data: {
          full_name: fullname,
          gender,
          university,
          course,
          branch,
          year,
        },
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut, resendEmail, checkIsVerified, sendResetLink, updatePassword, signInWithGoogle}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
