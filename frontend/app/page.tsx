"use client";
import Searchbar from "./components/Searchbar";
import TravelHighlight from "./components/TravelHighlight";
import { useSearchSpots } from "./hooks/search/useSearchSpots";

export default function Home() {
    const { handleInputChange } = useSearchSpots();
  
  return (
    <div className="flex flex-col m-0 px-0 h-full w-full items-center justify-center gap-1 bg-gray-950">
     <Searchbar
             handleInputChange={handleInputChange}
           />
      <TravelHighlight />
    </div>
  );
}
