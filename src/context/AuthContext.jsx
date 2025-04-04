import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../Backend/SupaBase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo usuario:", error);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();

    // Escuchar cambios en la sesión
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    // Cancelar la suscripción al desmontar el componente
    return () => {
      subscription?.subscription?.unsubscribe(); // Cambiar a subscription.subscription.unsubscribe()
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);