import { filterByName } from "@/api/filters";
import { getTouristSpotsByName } from "@/api/touristSpots";
import { useState } from "react";

export function useFilterSpots(){
    const [touristSpots, setTouristSpots] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

     async function fetchTouristSpotsByName(name: string) {
        try {
          const response = await getTouristSpotsByName(name);
    
          if (response.length === 0) {
            setErrorMessage("No tourist spots found.");
            return;
          }
    
          setTouristSpots(response);
        } catch (error: any) {
          setErrorMessage(error.message);
        }
      }
    
      async function fetchTouristSpotsByFilterAndName(
        name,
        type?,
        rating?,
        minPrice?,
        maxPrice?
      ) {
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
    
          setTouristSpots(response);
        } catch (error: any) {
          setErrorMessage(error.message);
        }
      }

      return {
        touristSpots,
        errorMessage,
        fetchTouristSpotsByFilterAndName,
        fetchTouristSpotsByName
      }
    }