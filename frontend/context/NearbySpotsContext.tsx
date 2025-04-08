"use client";

import { createContext, useContext } from "react";
import { useNearbySpots } from "../app/hooks/destination/useNearbySpots";

const NearbySpotsContext = createContext<ReturnType<
  typeof useNearbySpots
> | null>(null);

export function NearbySpotsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useNearbySpots();

  return (
    <NearbySpotsContext.Provider value={value}>
      {children}
    </NearbySpotsContext.Provider>
  );
}

export function useNearbySpotsContext() {
  const context = useContext(NearbySpotsContext);
  if (!context) {
    throw new Error(
      "useNearbySpotsContext must be used within a NearbySpotsProvider"
    );
  }
  return context;
}
