import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    phone: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!actor) return;
    try {
      const profile = await actor.getCallerUserProfile();
      setUser(profile);
    } catch {
      setUser(null);
    }
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    setIsLoading(true);
    refreshProfile().finally(() => setIsLoading(false));
  }, [actor, isFetching, refreshProfile]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!actor) return false;
    const ok = await actor.loginWithEmail(email, password);
    if (ok) await refreshProfile();
    return ok;
  };

  const loginWithPhone = async (
    phone: string,
    password: string,
  ): Promise<boolean> => {
    if (!actor) return false;
    const ok = await actor.loginWithPhone(phone, password);
    if (ok) await refreshProfile();
    return ok;
  };

  const register = async (
    name: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<void> => {
    if (!actor) throw new Error("Not connected");
    await actor.register(name, phone, email, password);
    await refreshProfile();
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        isLoading,
        login,
        loginWithPhone,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
