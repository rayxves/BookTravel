import { useEffect, useState } from "react";
import { travelHighlights } from "../data/travelHighlights";
import Image from "next/image";
import "../styles/components-styles.css";

export default function TravelHighlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        handleNextIndex();
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  function handleNextIndex() {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= travelHighlights.length ? 0 : nextIndex;
    });
  }

  function handleLastIndex() {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex >= 0 ? nextIndex : 0;
    });
  }

  const currentTh = travelHighlights[currentIndex];

  return (
    <div className="flex w-full h-full items-center p-6 justify-center gap-5 travel-highlights-container ">
      <svg
        className="w-8 h-8 text-[var(--lavender-blush)] cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onClick={handleLastIndex}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m17 16-4-4 4-4m-6 8-4-4 4-4"
        />
      </svg>

      <div className="flex flex-col items-center justify-center gap-2 bg-[rgba(0,0,0,0.6)] p-5 rounded-lg">
        <div className="relative w-[250px] md:w-[350px] h-[250px] md:h-[300px] overflow-hidden">
          <Image
            className="object-cover rounded-lg shadow-2xl border-b-2 border-gray-900"
            alt={currentTh.name}
            src={
              currentTh.photos[0].photoReference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${currentTh.photos[0].photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
                : ""
            }
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            priority
          />
        </div>

        <h1 className="font-poppins text-2xl text-[var(--lavender-blush)]">
          {currentTh.name}
        </h1>
      </div>
      <svg
        className="w-8 h-8 text-[var(--lavender-blush)] cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onClick={handleNextIndex}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m7 16 4-4-4-4m6 8 4-4-4-4"
        />
      </svg>
    </div>
  );
}
