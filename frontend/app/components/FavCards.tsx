import Image from "next/image";
interface TouristSpot {
  name: string;
  description: string;
  rating: number;
  photoUrls: string;
}
export default function FavCards({
  name,
  description,
  rating,
  photoUrls,
}: TouristSpot) {
  return (
    <div className="w-fit h-fit bg-amber-500 flex flex-col">
      <h1>{name}</h1>
      <Image src={photoUrls} alt={name} />
      <p>{description}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}
