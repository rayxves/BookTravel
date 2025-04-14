"use client";
import { useAuth } from "@/authContext";
import animationDataNoAuth from "@/public/NoAuth.json";
import animationDataNoContent from "@/public/NoContent.json";
import { getFavorites } from "@/api/touristSpotFavorites";
import { useEffect, useState } from "react";
import FavContent from "../components/Favorites/FavContent";
import FavError from "../components/Favorites/FavError";
import FavCards from "../components/Favorites/FavCards";

interface TouristSpot {
  id: number;
  name: string;
  description: string;
  rating: number;
  photoUrls: string[];
}

export default function FavoritePage() {
  const { isAuthenticated } = useAuth();
  const [favTouristSpots, setFavTouristSpots] = useState<TouristSpot[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavTouristSpots = async () => {
      try {
        const data = await getFavorites();
        const formattedData = data.map((ts) => {
          const tsData = ts.touristSpot;
          return {
            id: tsData.id,
            name: tsData.name,
            description: tsData.description,
            rating: tsData.rating,
            photoUrls: tsData.photoUrls.length > 0 ? tsData.photoUrls : [],
          };
        });
        setFavTouristSpots(formattedData);
      } catch (error: any) {
        console.log(error);
        setError(
          error.response?.message?.data || "Error trying to fetch favorites."
        );
      }
    };
    fetchFavTouristSpots();
  }, [isAuthenticated]);

  return (
    <div className="w-full  min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center ">
      {isAuthenticated ? (
        error !== "" ? (
          <FavError error={error} />
        ) : favTouristSpots.length > 0 ? (
          <div className="w-full h-full flex flex-col items-center">
            <h1 className="flex font-poppins items-center justify-center bg-darkGray text-lightGray font-semibold text-2xl w-full py-4 pt-10 border-b-3 border-[var(--sapphire)] flex flex-col">
              Your Favorite Places ✈️
              <p className="text-gray-500 text-center text-sm lg:text-md mt-2">
              Here&apos;s a list of places you’ve marked to revisit or explore.
            </p>
            </h1>
        

            <div className="w-full h-auto p-2 bg-darkGray px-4 pt-6 flex-grow relative">
              <div className="w-full h-full overflow-y-auto grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12 p-5 bg-darkGray place-items-center ">
                {favTouristSpots.map((ts) => {
                  return (
                    <FavCards
                      key={ts.id}
                      name={ts.name}
                      description={ts.description}
                      rating={ts.rating}
                      photoUrls={ts.photoUrls}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <FavContent
            tittle=" Nothing here..."
            paragraph="How about exploring and adding your favorite places?"
            href="/destinations"
            linkText="Search for destinations"
            animationData={animationDataNoContent}
          />
        )
      ) : (
        <FavContent
          tittle="You are not authenticated."
          paragraph=" How about logging in to access your favorites?"
          href="/login"
          linkText="Login"
          animationData={animationDataNoAuth}
        />
      )}
    </div>
  );
}
