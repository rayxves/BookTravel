"use client";
import { useCallback, useMemo, useState } from "react";
import { filterByName } from "@/api/filters";
import { getTouristSpotsByName } from "@/api/touristSpots";
import { useSearchMode } from "@/context/SearchModeContext";

export function useNameSpots() {
  const [touristSpots, setTouristSpots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const { setMode } = useSearchMode();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
      setMode("name");
    },
    []
  );

  const fetchTouristSpotsByName = useCallback(async (name: string) => {
    try {
      const response = await getTouristSpotsByName(name);

      if (response.length === 0) {
        setErrorMessage("No tourist spots found.");
        return;
      }

      setMode("name");
      console.log(response)
      setTouristSpots(response);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchTouristSpotsByFilterAndName = useCallback(
    async (
      name: string,
      type: string,
      rating?: number,
      minPrice?: number,
      maxPrice?: number
    ) => {
      try {
        const response = await filterByName(
          name,
          type,
          rating,
          minPrice,
          maxPrice
        );

        if (response.length === 0) {
          setErrorMessage("No tourist spots found.");
          return;
        }

        setMode("name");
        setTouristSpots(response);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
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
