"use client";
import { useNameSpotsContext } from "@/context/NameSpotsContext";
import Searchbar from "./components/Searchbar";
import TravelHighlight from "./components/TravelHighlight";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useNearbySpotsContext } from "@/context/NearbySpotsContext";

export default function Home() {
  const { handleInputChange, touristSpots } = useNameSpotsContext();
  const { categoryNearbySpots } = useNearbySpotsContext();
  const router = useRouter();

  useEffect(() => {
    if (
      touristSpots.length > 0 ||
      Object.keys(categoryNearbySpots).length > 0
    ) {
      router.replace("/destinations");
    }
  }, [touristSpots, router]);

  return (
    <div className="flex flex-col m-0 px-0 h-full w-full items-center justify-center gap-1 bg-gray-950">
      <Searchbar handleInputChange={handleInputChange} />

      <TravelHighlight />
    </div>
  );
}
