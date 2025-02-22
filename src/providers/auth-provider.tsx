"use client";

import React, { createContext, useContext } from "react";

interface AuthProviderProps {
  userId: string | undefined;
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AuthContext = createContext({
  userId: undefined as string | undefined,
  isAuthenticated: false,
});

export default function AuthProvider({
  userId,
  isAuthenticated,
  children,
}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ userId, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
