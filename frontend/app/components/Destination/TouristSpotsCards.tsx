import { addFavorite } from "@/api/touristSpotFavorites";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface TouristSpot {
  name: string;
  photoUrls: string[];
  rating: number;
  address: string;
}
export default function TouristSpotsCards({
  name,
  photoUrls,
  rating,
  address,
}: TouristSpot) {
  const { isAuthenticated } = useAuth();
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const imageUrl = photoUrls
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoUrls}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    : null;

  const handleAddFavorite = async (touristSpotName: string) => {
    if (!isAuthenticated) {
      setError("Please, login to add a favorite");
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
      return;
    }
    try {
      const apiResponse = await addFavorite(touristSpotName);
      setError("");
      setResponse(apiResponse.message);
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="bg-[rgba(255,255,255,0.5)] shadow-lg  font-inter transition-all duration-300 ease-in-out flex flex-col items-center justify-between gap-4 w-[20rem] sm:w-[22rem]  max-w-[30rem] h-[28rem] p-5 bg-opacity-25 rounded-lg hover:scale-103 hover:shadow-xl">
      <h1 className=" flex text-center items-center justify-center h-fit p-1 text-xl font-semibold border-b-2 border-gray-800 w-full py-3">
        {name}
      </h1>

      {imageUrl ? (
        <div className="w-fit max-w-[20rem] max-h-[13rem] overflow-hidden rounded-lg shadow-md shadow-cyan-950/55">
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={200}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : (
        <div className="w-fit max-w-[20rem] max-h-[13rem] overflow-hidden rounded-lg ">
          <svg
            className="w-50 h-50 text-gray-300"
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
      <p className="flex items-center justify-center text-center leading-tight h-fit text-sm font-medium">
        {address}
      </p>
      {rating > 0 && (
        <p className="text-md font-semibold mt-2 pl-2">Rating: {rating}</p>
      )}
      <button
        onClick={() => handleAddFavorite(name)}
        className="bg-[var(--hunter-green)] py-2 px-3 rounded shadow font-semibold text-gray-200 text-sm cursor-pointer hover:bg-green-800"
      >
        Add Favorite
      </button>
      {response !== "" && (
        <p className="font-inter text-xs font-semibold text-center text-[var(--hunter-green)]">
          {response}
        </p>
      )}
      {error !== "" && (
        <p className="font-inter text-xs font-semibold text-center text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
