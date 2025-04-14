import { useState, useCallback, useMemo, useEffect } from "react";
import { filterByLocation } from "@/api/filters";
import { useSearchMode } from "@/context/SearchModeContext";
import { usePathname } from "next/navigation";

interface FilterLocationResult {
  name: string;
  formatted_address?: string;
  rating?: number;
  photos: {
    width: number;
    height: number;
    photoReference: string;
  }[];
}

export function useNearbySpots() {
  const { setMode } = useSearchMode();
  const [categoryNearbySpots, setCategoryNearbySpots] = useState<
    Record<string, FilterLocationResult[]>
  >({});
  const [filterNearbySpots, setFilterNearbySpots] = useState([]);
  const [nearbyErrorMessage, setNearbyErrorMessage] = useState("");
  const [location, setLocation] = useState<
    { lat: number; lon: number } | { lat: 0; lon: 0 }
  >({ lat: 0, lon: 0 });
  const [locationError, setLocationError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/destinations")) {
      setCategoryNearbySpots({});
      setFilterNearbySpots([]);
      setNearbyErrorMessage("");
    }
  }, [pathname]);

  const handleSetUserLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setLocationError("You have denied location access.");
              break;
            case err.POSITION_UNAVAILABLE:
              setLocationError("Location is not available.");
              break;
            case err.TIMEOUT:
              setLocationError("Request timed out.");
              break;
            default:
              setLocationError("Unknown error.");
          }
        }
      );
    } else {
      setLocationError("Your browser does not support geolocation.");
    }
  }, []);

  const fetchTouristSpotsByLocation = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const categories = ["restaurant", "bar", "park"];
        const results: Record<string, FilterLocationResult[]> = {};

        for (const category of categories) {
          const response = await filterByLocation(
            latitude,
            longitude,
            category
          );
          results[category] = response.slice(0, 5);
        }

        setMode("location");
        setCategoryNearbySpots(results);
        setNearbyErrorMessage("");
      } catch (error: any) {
        setNearbyErrorMessage(error.message);
      }
    },
    []
  );

  const fetchTouristSpotsByFilterAndLocation = useCallback(
    async (
      latitude: number,
      longitude: number,
      type: string,
      rating?: number,
      priceLevel?: number,

    ) => {
      try {
        const response = await filterByLocation(
          latitude,
          longitude,
          type,
          rating,
          priceLevel,
        );

        if (response.length === 0) {
          setNearbyErrorMessage("No tourist spots found.");
          return;
        }

        setMode("location");
        setFilterNearbySpots(response);
        setNearbyErrorMessage("");
      } catch (error: any) {
        setNearbyErrorMessage(error.message);
      }
    },
    []
  );

  return useMemo(() => {
    return {
      filterNearbySpots,
      categoryNearbySpots,
      fetchTouristSpotsByLocation,
      fetchTouristSpotsByFilterAndLocation,
      nearbyErrorMessage,
      location,
      locationError,
      handleSetUserLocation,
    };
  }, [
    filterNearbySpots,
    categoryNearbySpots,
    fetchTouristSpotsByLocation,
    fetchTouristSpotsByFilterAndLocation,
    nearbyErrorMessage,
    location,
    locationError,
    handleSetUserLocation,
  ]);
}
