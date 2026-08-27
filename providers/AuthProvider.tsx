"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { User, LoginRequest, RegisterRequest, StaffRegisterRequest, UserRole } from "@/types/auth";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import {
  clearStoredAuth,
  getStoredAccessToken,
  getStoredUser,
  storeTokens,
  storeUser,
} from "@/lib/auth";
import { parseApiError } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  registerStaff: (data: StaffRegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string; faculty?: string; department_id?: string }) => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const token = getStoredAccessToken();
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const currentUser = await authService.getMe();
      setUser(currentUser);
      storeUser(currentUser);
    } catch {
      clearStoredAuth();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cachedUser = getStoredUser();
    if (cachedUser) {
      setUser(cachedUser);
    }
    refreshUser();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const tokenData = await authService.login(data);
      storeTokens(tokenData);
      const profile = await authService.getMe();
      setUser(profile);
      storeUser(profile);
      toast.success("Welcome back!", {
        description: `Signed in as ${profile.name}`,
      });
      if (profile.role === "admin" || profile.role === "super_admin") {
        router.push("/admin");
      } else if (profile.role === "staff") {
        router.push("/staff");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const msg = parseApiError(err);
      toast.error("Login Failed", { description: msg });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      await authService.register(data);
      toast.success("Account created successfully", {
        description: "You can now log in with your credentials.",
      });
      router.push("/login");
    } catch (err) {
      const msg = parseApiError(err);
      toast.error("Registration Failed", { description: msg });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerStaff = async (data: StaffRegisterRequest) => {
    try {
      setIsLoading(true);
      await authService.registerStaff(data);
      toast.success("Staff account created successfully", {
        description: "You can now log in with your credentials.",
      });
      router.push("/login");
    } catch (err) {
      const msg = parseApiError(err);
      toast.error("Staff Registration Failed", { description: msg });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network failure on logout
    } finally {
      clearStoredAuth();
      setUser(null);
      toast.info("Signed out");
      router.push("/login");
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string; faculty?: string; department_id?: string }) => {
    try {
      const updated = await userService.updateMe(data);
      setUser(updated);
      storeUser(updated);
      toast.success("Profile updated successfully");
    } catch (err) {
      const msg = parseApiError(err);
      toast.error("Profile update failed", { description: msg });
      throw err;
    }
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        registerStaff,
        logout,
        refreshUser,
        updateProfile,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
