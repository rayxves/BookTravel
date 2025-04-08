"use client";

import { createContext, useContext } from "react";
import { useNameSpots } from "../app/hooks/destination/useNameSpots";

const NameSpotsContext = createContext<ReturnType<
  typeof useNameSpots
> | null>(null);

export function NameSpotsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useNameSpots();

  return (
    <NameSpotsContext.Provider value={value}>
      {children}
    </NameSpotsContext.Provider>
  );
}

export function useNameSpotsContext() {
  const context = useContext(NameSpotsContext);
  if (!context) {
    throw new Error(
      "useNameSpotsContext must be used within a NameSpotsProvider"
    );
  }
  return context;
}
