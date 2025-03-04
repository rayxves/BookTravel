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
        {" "}
        <Image
          className="md:h-full shadow-2xl border-b-2 border-gray-900"
          src="data:image/jpeg;base64,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"
          alt={currentTh.name}
          width={350}
          height={300}
          style={{
            borderRadius: "1%",
          }}
          priority
        />
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
