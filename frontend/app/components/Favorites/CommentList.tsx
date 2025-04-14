import { deleteComment, updateComment } from "@/api/comments";
import { useState } from "react";

interface Comment {
  id: number;
  content: string;
  createdOn: Date;
  createdBy: string;
}

export default function CommentList({ comment }: { comment: Comment }) {
  const [response, setResponse] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [query, setQuery] = useState("");

  async function handleDeleteComment(id: number) {
    try {
      console.log(id);
      await deleteComment(id);
      setResponse("Deleted  successfully.");
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } catch (error: any) {
      setResponse(error.message);
    }
  }

  function toggleIsUpdating() {
    setIsUpdating(!isUpdating);
  }

  async function handleUpdateComments(content: string, id: number) {
    try {
      await updateComment(content, id);
      setResponse("Updated successfully.");
      setTimeout(() => {
        comment.content = content;
        setIsUpdating(false);
        setResponse("");
      }, 1000);
    } catch (error: any) {
      setResponse(error.message);
    }
  }

  if (!isVisible) {
    return;
  }

  return (
    <li className="w-full h-full flex flex-col  bg-blue-100 p-2 rounded">
      <div className="flex flex-col gap-1 w-full">
        <div className="bg-[rgba(255,255,255,0.5)] p-2 flex justify-between w-full h-full">
          {isUpdating ? (
            <input
              type="text"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Input your new comment here..."
              className="w-[90%] pl-2 outline-0 focus:outline-0 placeholder:text-xs md:placeholder:text-sm"
            />
          ) : (
            <span className="flex w-[90%] text-sm sm:text-md">
              {comment.content}{" "}
            </span>
          )}
          <div className="flex flex-col items-end justify-between gap-3">
            <svg
              onClick={toggleIsUpdating}
              className="w-5 h-5 text-gray-900 hover:text-gray-600 cursor-pointer"
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
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
            <svg
              onClick={
                isUpdating
                  ? undefined
                  : () => {
                      handleDeleteComment(comment.id);
                    }
              }
              className={
                isUpdating
                  ? "w-5 h-5 text-gray-900 cursor-not-allowed"
                  : "w-5 h-5 text-gray-900 hover:text-gray-600 cursor-pointer"
              }
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </div>
        </div>{" "}
        <div className="flex justify-between items-center p-1">
          <p className="text-xs md:text-sm">
            {comment.createdOn.toUTCString()}
          </p>
          {isUpdating && (
            <button
              onClick={() => handleUpdateComments(query, comment.id)}
              className=" cursor-pointer hover:bg-blue-600 text-xs md:text-sm bg-blue-500 flex items-center justify-center w-fit h-fit px-2.5 py-1 text-white font-semibold rounded"
            >
              Save
            </button>
          )}
        </div>
      </div>
      {response != "" && (
        <p className="text-sm text-gray-900 font-semibold flex items-center w-full justify-center h-fit">
          {response}
        </p>
      )}
    </li>
  );
}
