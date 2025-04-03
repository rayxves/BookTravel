import { useState } from "react";
import { filterByLocation } from "@/api/filters";

export function useNearbySpots() {
  const [categoryNearbySpots, setCategoryNearbySpots] = useState<
    Record<string, any>
  >({});
  const [filterNearbySpots, setFilterNearbySpots] = useState([]);
  const [nearbyErrorMessage, setNearbyErrorMessage] = useState("");

  async function fetchTouristSpotsByLocation(
    latitude: number,
    longitude: number
  ) {
    try {
      const categories = ["restaurant", "bar", "park"];
      const results: Record<string, any> = {};

      for (const category of categories) {
        const response = await filterByLocation(latitude, longitude, category);
        results[category] = response.slice(0, 5);
      }

      setCategoryNearbySpots(results);
    } catch (error: any) {
      setNearbyErrorMessage(error.message);
    }
  }

  async function fetchTouristSpotsByFilterAndLocation(
    latitude: number,
    longitude: number,
    type?,
    rating?,
    minPrice?,
    maxPrice?
  ) {
    try {
      const response = await filterByLocation(
        latitude,
        longitude,
        type,
        rating,
        minPrice,
        maxPrice
      );

      if (response.length === 0) {
        setNearbyErrorMessage("No tourist spots found.");
        return;
      }

      setFilterNearbySpots(response);
    } catch (error: any) {
      setNearbyErrorMessage(error.message);
    }
  }

  return {
    filterNearbySpots,
    categoryNearbySpots,
    fetchTouristSpotsByLocation,
    fetchTouristSpotsByFilterAndLocation,
    nearbyErrorMessage,
  };
}
