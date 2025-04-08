"use client";
import { createContext, useContext, useState } from "react";

type SearchMode = "name" | "location" | null;

const SearchModeContext = createContext<{
  mode: SearchMode;
  setMode: (mode: SearchMode) => void;
}>({
  mode: null,
  setMode: () => {},
});

export const SearchModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<SearchMode>(null);

  return (
    <SearchModeContext.Provider value={{ mode, setMode }}>
      {children}
    </SearchModeContext.Provider>
  );
};

export const useSearchMode = () => useContext(SearchModeContext);
