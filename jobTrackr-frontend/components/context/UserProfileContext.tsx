"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/lib/api/user";
import { useAuth } from "./AuthContext";

interface User {
  username: string;
  email: string;
  profilePic: string | null;
}

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
  error: unknown;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const {isAuthenticated,isAuthReady} = useAuth()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user",isAuthenticated],
    queryFn: UserProfile,
    staleTime: 1000 * 60 * 5, // prevents unnecessary refetches
    enabled:isAuthReady && isAuthenticated, 
  });

  // memoized user value
  const user = useMemo(() => {
    return data?.data ?? null;
  }, [data]);

  // memoized refetch function
  const refetchUser = useMemo(() => refetch, [refetch]);

  // memoized context value (THIS is the key part)
  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      refetchUser,
    }),
    [user, isLoading, error, refetchUser]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserContextProvider");
  }
  return context;
};
