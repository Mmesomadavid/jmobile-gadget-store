import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // --------------------------
  // Login (set token and fetch user)
  // --------------------------
  const login = async (jwtToken: string) => {
    localStorage.setItem("authToken", jwtToken);
    setToken(jwtToken);

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  // --------------------------
  // Logout
  // --------------------------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  // --------------------------
  // Load user on app start
  // --------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) login(savedToken);
    else setLoading(false);
  }, []);

  // Once user is loaded, set loading to false
  useEffect(() => {
    if (user || !token) setLoading(false);
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --------------------------
// Hook to use auth context
// --------------------------
export const useAuth = () => useContext(AuthContext);
