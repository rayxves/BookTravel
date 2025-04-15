import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  handleRatingFilter: (rating: number) => void;
}

export default function RatingFilter({ handleRatingFilter }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const maxStars = 5;

  function handleRating(rating: number){
    handleRatingFilter(rating);
    setRating(rating);
  }
  
  return (
    <div className="flex flex-col gap-2 w-full bg-gray-100 p-2 rounded items-center justify-center">
      <div className="flex">
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <StarIcon
              key={starValue}
              className={`h-6 w-6 cursor-pointer transition-colors  ${
                starValue <= (hover || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>
      <p className="font-inter text-sm text-gray-500">
        Rating greater than {rating}{" "}
      </p>
    </div>
  );
}
