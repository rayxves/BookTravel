"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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
  const pathname = usePathname();

  useEffect(() => {
    setMode(null);
  }, [pathname]);

  return (
    <SearchModeContext.Provider value={{ mode, setMode }}>
      {children}
    </SearchModeContext.Provider>
  );
};

export const useSearchMode = () => useContext(SearchModeContext);
