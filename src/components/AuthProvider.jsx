/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext({
  user: null,
  session: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: initializing");

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AuthProvider: auth state changed", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: got session", session ? "exists" : "none");
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    console.log("AuthProvider: signing out");
    await supabase.auth.signOut();
  };

  console.log("AuthProvider: rendering", { user: !!user, loading });

  // While loading, render a minimal placeholder so the app doesn't flash
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    /*
    <AuthContext.Provider value={{ user, session, signOut }}>
      {children}
    </AuthContext.Provider>*/
    <AuthContext.Provider value={{ user, session, signOut, loading }}>
    {children}
  </AuthContext.Provider>
  

  );
}