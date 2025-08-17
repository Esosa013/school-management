"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define User Type
interface User {
  id: string;
  email: string;
  // Add more fields as needed, e.g., name, role, etc.
}

// Define context type for user
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create UserContext using createContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    // Use UserContext.Provider to make user and setUser available to children components
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
