import Image from "next/image";
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
  const imageUrl = photoUrls
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoUrls}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    : null;
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
        <div className="w-fit max-w-[18.7rem] max-h-[11rem]">
          {" "}
          <p className="font-inter text-md">Image unavailable</p>
        </div>
      )}

      <p className="flex items-center justify-center text-center leading-tight h-fit text-sm font-medium">
        {address}
      </p>
      {rating > 0 && (
        <p className="text-md font-semibold mt-2 pl-2">Rating: {rating}</p>
      )}
      <button className="bg-[var(--hunter-green)] py-2 px-3 rounded shadow font-semibold text-gray-200 text-sm cursor-pointer hover:bg-green-800">
        Add Favorite
      </button>
    </div>
  );
}
