import { useState } from "react";

export default function PriceFilter() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [response, setResponse] = useState("");

  const handleFilter = () => {
    const fromValue = parseFloat(from);
    const toValue = parseFloat(to);

    if (isNaN(fromValue) || isNaN(toValue)) {
      setResponse("Values must be numbers.");
    } else if (fromValue < 0) {
      setResponse("Minimum price cannot be less than zero.");
    } else if (fromValue > toValue) {
      setResponse("Minimum price cannot be greater than the maximum.");
    } else {
      setResponse(`Filter prices from $${fromValue} to $${toValue}`);
    }
  };

  function handleClearResponse(){
    setResponse("");
  }

  return (
    <div className="flex flex-col gap-2 p-2 rounded-lg w-full bg-gray-200 ">
      <div className="flex gap-2">
        {" "}
        <div className="flex flex-col w-1/2">
          <label className="font-semibold">Minimum Price:</label>
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onClick={handleClearResponse}
            className=" border-2 border-gray-400 p-2 rounded-md  w-[90%] hover:outline-0 focus:outline-0"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="font-semibold">Maximum Price:</label>
          <input
            type="number"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onClick={handleClearResponse}
            className=" border-2 border-gray-400 p-2 rounded-md w-[90%] hover:outline-0 focus:outline-0"
          />
        </div>
      </div>
      {response && <p className="text-center text-sm">{response}</p>}

      <button
        onClick={handleFilter}
        className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Set Price
      </button>
    </div>
  );
}
