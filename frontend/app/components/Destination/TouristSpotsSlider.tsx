"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FilterLocationResult {
  name: string;
  formatted_address?: string;
  rating?: number;
  photos: {
    width?: number;
    height?: number;
    photoReference: string;
  }[];
}

export default function TouristSpotsSlider({
  touristSpots,
}: Readonly<{
  touristSpots: FilterLocationResult[];
}>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(3);
  const totalSpots = touristSpots.length;
  useEffect(() => {
    function updateImagesPerView() {
      if (window.innerWidth < 680) {
        setImagesPerView(1);
      } else if (window.innerWidth < 840 && window.innerHeight > 680) {
        setImagesPerView(2);
      } else {
        setImagesPerView(3);
      }
    }

    updateImagesPerView();
    window.addEventListener("resize", updateImagesPerView);
    return () => window.removeEventListener("resize", updateImagesPerView);
  }, []);

  function handleNextIndex() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSpots);
  }

  function handleLastIndex() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSpots - 1 : prevIndex - 1
    );
  }

  function getSafeIndex(offset: number) {
    return (currentIndex + offset) % totalSpots;
  }

  return (
    <div className="flex w-full max-h-[500px] flex-col items-center justify-center bg-gray-50 relative">
      <div className="w-fit max-w-[95%] h-fit">
        <div className="flex items-center w-full justify-center gap-5">
          <svg
            onClick={handleLastIndex}
            className="w-10 h-10 text-gray-950 cursor-pointer"
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
              d="m17 16-4-4 4-4m-6 8-4-4 4-4"
            />
          </svg>
          {[...Array(imagesPerView)].map((_, offset) => {
            const index = getSafeIndex(offset);
            return (
              <div
                key={index}
                className="w-[90vw] md:w-[300px] h-[350px] md:h-[300px] overflow-hidden flex flex-col items-start justify-start gap-3"
              >
                {touristSpots[index].photos.length &&
                touristSpots[index].photos[0].photoReference ? (
                  <Image
                    className="rounded shadow-md object-cover w-full h-full max-h-[300px] md:max-h-[200px] hover:opacity-85 cursor-pointer"
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${touristSpots[index].photos[0].photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
                    alt={touristSpots[index].name}
                    width={400}
                    height={400}
                    quality={100}
                  />
                ) : (
                  <div className="rounded shadow-md object-cover w-full h-full max-h-[300px] md:max-h-[200px] hover:opacity-85 flex flex-col justify-center items-center">
                    <svg
                      className="w-100 h-100 text-gray-100"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                )}
                <p className="font-inter text-center text-lg md:text-md">
                  {touristSpots[index].name}
                </p>
              </div>
            );
          })}
          <svg
            onClick={handleNextIndex}
            className="w-10 h-10 text-gray-950 cursor-pointer"
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
              d="m7 16 4-4-4-4m6 8 4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
