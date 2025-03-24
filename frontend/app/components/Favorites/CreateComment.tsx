import { createComment } from "@/api/comments";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  touristSpotName: string;
}

export default function CreateComment({ onCancel, touristSpotName }: Props) {
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");
  async function handleCreateComment(content: string) {
    if (content.length < 5) {
      setResponse("Your note must have at least 5 characters.");
      return
    }
    try {
      await createComment(content, touristSpotName);
   
      setResponse("Created successfully");
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error: any) {
      setResponse(error.message);
    }
  }

  return (
    <div className="p-5 font-inter flex flex-col items-center justify-center w-[20rem] sm:w-[23rem] md:w-[25rem] h-auto bg-gray-300 gap-2 shadow-2xl rounded-md z-20 absolute top-[42%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
      {" "}
      <div className="flex items-start justify-start w-full">
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
      <h1 className="font-semibold text-gray-800 flex items-center justify-center w-full h-fit border-b border-green-950 pb-1 font-roboto text-2xl lg:text-3xl">
        Comments
      </h1>
      <div className="flex w-full items-end justify-start pt-4 pl-3">
        <p className="text-gray-800 w-fit h-fit flex items-end text-md lg:text-lg">
          Enter a new note:
        </p>
      </div>
      <textarea
        className="p-4 text-md placeholder:text-sm w-full border-none resize-none rounded bg-blue-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-300/55 focus:ring-opacity-50 placeholder-font-inter"
        placeholder="Type your notes here..."
        rows={4}
        maxLength={250}
        minLength={5}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="flex justify-end items-end text-xs text-gray-600 py-1">
        Max width: 250 characters.
      </p>
      <div className="flex justify-between w-full px-2 py-1">
        <button
          onClick={onCancel}
          className="text-gray-50 w-fit h-fit px-6 py-2 bg-red-700 rounded cursor-pointer hover:bg-red-800 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleCreateComment(query);
          }}
          className="text-gray-50 w-fit h-fit px-7 py-2 bg-[var(--hunter-green)] rounded cursor-pointer hover:bg-green-800 font-semibold"
        >
          Save
        </button>
      </div>
      {response !== "" && <p className={response === "Created successfully" ? "text-sm text-green-800" : "text-sm text-red-800"}>{response}</p>}
    </div>
  );
}
