"use client"
import { useEffect,useContext,createContext,useState } from "react";
import { refreshAccessToken } from "@/lib/api/auth";


interface AuthContextProps {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
  
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function initAuth() {
      try {
        await refreshAccessToken(); 
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsAuthReady(true);
      }
    }

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthReady, isAuthenticated,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
