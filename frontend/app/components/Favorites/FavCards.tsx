import Image from "next/image";
import { useState } from "react";
import { removeFavorite } from "@/api/touristSpotFavorites";
import CreateComment from "./CreateComment";
import ViewComments from "./ViewComments";

interface TouristSpot {
  name: string;
  description: string;
  rating: number;
  photoUrls: string[];
}
export default function FavCards({
  name,
  description,
  rating,
  photoUrls,
}: TouristSpot) {
  const [deleteResponse, setDeleteResponse] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [showViewComments, setShowViewComments] = useState(false);

  const imageUrl =
    photoUrls.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoUrls[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
      : null;

  async function handleFavoriteDelete(touristSpotName: string) {
    try {
      await removeFavorite(touristSpotName);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } catch (error: any) {
      setDeleteResponse(error.message);
    }
  }

  function handleCreateComment() {
    setShowCreateComment(true);
  }
  function handleViewComment() {
    setShowViewComments(true);
  }
  function handleViewCommentCancel() {
    setShowViewComments(false);
  }
  const handleCreateCommentCancel = () => {
    setShowCreateComment(false);
  };

  if (!isVisible) return null;
  return (
    <>
      {showCreateComment && (
        <CreateComment
          onCancel={handleCreateCommentCancel}
          touristSpotName={name}
        />
      )}
      {showViewComments && (
        <ViewComments
          onCancel={handleViewCommentCancel}
          touristSpotName={name}
        />
      )}

      <div
        className={
          showCreateComment || showViewComments || showViewComments
            ? " font-inter transition-all duration-300 ease-in-out flex flex-col items-center justify-between gap-8 w-[90%] max-w-[24rem] h-[30rem] p-4 bg-gray-300 bg-opacity-25 rounded-lg shadow-lg hover:shadow-lg relative opacity-55"
            : " font-inter transition-all duration-300 ease-in-out flex flex-col items-center justify-between gap-8 w-[90%] max-w-[24rem] h-[30rem] p-4 bg-gray-300 bg-opacity-25 rounded-lg shadow-lg hover:scale-105 hover:shadow-lg relative"
        }
      >
        <div className="w-full flex justify-between items-center px-2">
          <svg
            onClick={handleCreateComment}
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            onClick={handleViewComment}
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <h1 className=" flex items-center justify-center h-fit p-1 text-2xl font-semibold">
          {name}
        </h1>
        <div className="w-fit max-w-[18.7rem] max-h-[11rem] overflow-hidden rounded-lg shadow-md shadow-cyan-950/55">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={300}
              height={200}
              className="w-full h-full object-contain rounded-lg "
            />
          ) : (
            <p className="font-inter text-md">Image unavailable</p>
          )}
        </div>

        <p className="flex items-center justify-center text-center leading-tight p-2 h-fit text-sm font-medium">
          {description}
        </p>
        {rating > 0 && (
          <p className="text-lg font-semibold mt-2 pl-2">Rating: {rating}</p>
        )}
        <button
          onClick={() => {
            handleFavoriteDelete(name);
          }}
          disabled={showCreateComment || showViewComments}
          className={
            showCreateComment || showViewComments
              ? "z-10 cursor-not-allowed pointer-events-auto border-none bg-[var(--hunter-green)] p-3 rounded-md w-fit h-fit font-semibold text-white transition duration-200 ease-in-out"
              : "z-10 cursor-pointer pointer-events-auto border-none bg-[var(--hunter-green)] p-3 rounded-md w-fit h-fit font-semibold text-white transition duration-200 ease-in-out hover:bg-green-700"
          }
        >
          Remove Favorite
        </button>
        {deleteResponse && (
          <p className=" text-red-700 font-semibold text-sm h-fit">
            {deleteResponse}
          </p>
        )}
      </div>
    </>
  );
}
