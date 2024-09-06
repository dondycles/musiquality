"use client";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, useMemo } from "react";

type InitialState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  session: null,
  user: null,
  isLoading: false,
};

export const AuthContext = createContext<InitialState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) return;

    const getSessionAndUser = async () => {
      try {
        setLoading(true);
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError || !sessionData?.session) {
          console.error("Error fetching session:", sessionError);
          return;
        }

        const session = sessionData.session;
        const user = session.user;

        setState({ user, session, isLoading: loading });
      } catch (error) {
        console.error("Unexpected error fetching session/user:", error);
      } finally {
        setLoading(false);
      }
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setState({ user: session.user, session, isLoading: loading });
        } else {
          setState({ user: null, session: null, isLoading: loading });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => state, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
