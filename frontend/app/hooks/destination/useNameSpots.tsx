"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterByName } from "@/api/filters";
import { getTouristSpotsByName } from "@/api/touristSpots";
import { useSearchMode } from "@/context/SearchModeContext";
import { usePathname } from "next/navigation";

export function useNameSpots() {
  const [touristSpots, setTouristSpots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const { setMode } = useSearchMode();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/destinations")) {
      setTouristSpots([]);
      setSearchText("");
      setErrorMessage("");
    }
  }, [pathname]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
      setMode("name");
    },
    [setMode]
  );

  const fetchTouristSpotsByName = useCallback(async (name: string) => {
    try {
      const response = await getTouristSpotsByName(name);

      if (response.length === 0) {
        setErrorMessage("No tourist spots found.");
        setTouristSpots([]);
        return;
      }

      setMode("name");
      setTouristSpots(response);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
      setTouristSpots([]);
    }
  }, []);

  const fetchTouristSpotsByFilterAndName = useCallback(
    async (
      name: string,
      type: string,
      rating?: number,
      priceLevel?: number
    ) => {
      try {
        const response = await filterByName(name, type, rating, priceLevel);

        if (response.length === 0) {
          setErrorMessage("No tourist spots found.");
          setTouristSpots([]);
          return;
        }
        setMode("name");
        setTouristSpots(response);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
        setTouristSpots([]);
      }
    },
    []
  );

  return useMemo(() => {
    return {
      touristSpots,
      errorMessage,
      fetchTouristSpotsByName,
      fetchTouristSpotsByFilterAndName,
      searchText,
      handleInputChange,
    };
  }, [
    touristSpots,
    errorMessage,
    fetchTouristSpotsByName,
    fetchTouristSpotsByFilterAndName,
    searchText,
    handleInputChange,
  ]);
}
