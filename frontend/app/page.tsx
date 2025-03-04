"use client";
import Searchbar from "./components/Searchbar";
import TravelHighlight from "./components/TravelHighlight";

export default function Home() {
  return (
    <div className="flex flex-col m-0 px-0 h-full w-full items-center justify-center gap-1 bg-gray-950">
      <Searchbar />
      <TravelHighlight />
    </div>
  );
}
