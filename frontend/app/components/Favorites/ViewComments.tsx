import { getComments } from "@/api/comments";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";

interface Props {
  onCancel: () => void;
  touristSpotName: string;
}

interface Comments {
  id: number;
  content: string;
  createdOn: Date;
  createdBy: string;
}
export default function ViewComments({ onCancel, touristSpotName }: Props) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [response, setResponse] = useState("");

  async function handleGetComments() {
    try {
      const response = await getComments(touristSpotName);
      if (response.length === 1 && response[0].message) {
        setResponse(response[0].message);
        setComments([]);
      } else {
        setComments(
          response.map((comment) => ({
            id: comment.id,
            content: comment.content,
            createdOn: new Date(comment.createdOn),
            createdBy: comment.createdBy,
          }))
        );
        setResponse("");
      }
    } catch (error: any) {
      console.log("Error: ", error);
      setResponse(error.message);
    }
  }

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="fixed top-[20%] left-0 w-screen h-screen bg-opacity-50 z-40 flex items-center justify-center">

    <div className="p-5 font-inter flex flex-col items-center justify-center  w-[20rem] sm:w-[23rem] md:w-[25rem] max-h-[26rem] bg-gray-100 gap-2 shadow-2xl rounded-md z-20 absolute top-[42%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex items-end justify-end w-full">
        <svg
          onClick={onCancel}
          className="w-6 h-6 text-gray-900 cursor-pointer hover:text-gray-500"
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </div>
      <h1 className="font-semibold text-gray-900 flex items-start justify-start w-full h-fit border-b border-green-950 pb-2 font-roboto text-xl md:text-2xl ">
        Your comments
      </h1>

      <ul className="flex flex-col overflow-y-scroll box-border  text-gray-900 p-1 gap-3 w-full h-full">
        {comments.length > 0 ? (
          <>
            <p className="text-gray-700 font-medium py-2">
              Created by: {comments[0].createdBy}
            </p>
            {comments.map((comment) => {
              return <CommentList key={comment.id} comment={comment} />;
            })}
          </>
        ) : (
          <p className="h-24 w-full flex items-center justify-center">
            {response}
          </p>
        )}
      </ul>
    </div>
    </div>

  );
}
