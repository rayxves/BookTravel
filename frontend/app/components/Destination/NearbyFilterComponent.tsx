"use client";
import { useNearbySpots } from "@/app/hooks/destination/useNearbySpots";
import { useState } from "react";

export default function NearbyFilterComponent() {
  const [error, setError] = useState<string | null>(null);
  const { fetchTouristSpotsByLocation } = useNearbySpots();

  function handleSetUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchTouristSpotsByLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("You have denied location access.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location is not available.");
              break;
            case err.TIMEOUT:
              setError("Request timed out.");
              break;
            default:
              setError("Unknown error.");
          }
        }
      );
    } else {
      setError("Your browser does not support geolocation.");
    }
  }

  return (
    <div className="w-full relative flex flex-col items-end gap-1">
      <button>
        <div
          onClick={handleSetUserLocation}
          className="flex items-center justify-center gap-1 bg-gray-600 text-gray-100 shadow-sm shadow-gray-300 px-2 py-1.5 rounded-md cursor-pointer hover:opacity-85"
        >
          <p className="font-inter text-sm md:text-md">Next to me</p>
          <svg
            className="w-4 h-4 text-gray-400 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
            />
          </svg>
        </div>
      </button>

      <p className="text-xs text-red-700 font-inter">{error}</p>
    </div>
  );
}
