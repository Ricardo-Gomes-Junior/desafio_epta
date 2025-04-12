import {
  createContext,
  useContext,
  useState,
  // useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import React from "react";

interface AuthContextData {
  token: string | null;
  // setToken: (token: string | null) => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isTokenValid: (token: string | null) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  const isTokenValid = (tokenToCheck: string | null): boolean => {
    if (!tokenToCheck) return false;

    try {
      const decoded = jwtDecode<{ exp: number }>(tokenToCheck);
      const currentTime = Date.now() / 1000;

      const tokenValid: boolean = decoded.exp > currentTime;

      if (tokenValid) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenToCheck}`;
        localStorage.setItem("token", tokenToCheck);
      } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
      }

      return tokenValid;
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
