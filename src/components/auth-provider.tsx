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

        if (sessionError)
          throw new Error(`Error fetching session: ${sessionError?.message}`);

        if (sessionData.session) {
          const session = sessionData.session;
          const user = session.user;

          setState({ user, session, isLoading: loading });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        try {
          setLoading(true);
          if (session) {
            setState({ user: session.user, session, isLoading: loading });
          } else {
            setState({ user: null, session: null, isLoading: loading });
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const value = useMemo(() => state, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
