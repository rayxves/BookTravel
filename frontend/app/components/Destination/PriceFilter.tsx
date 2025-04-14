import { useState } from "react";

interface Props {
  handlePriceFilter: (price: number) => void;
}

const priceLevels = [
  { value: 0, label: "Economical" },
  { value: 1, label: "Cheap" },
  { value: 2, label: "Moderate" },
  { value: 3, label: "Expensive" },
  { value: 4, label: "Very Expensive" },
];

export default function PriceFilter({ handlePriceFilter }: Props) {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handlePriceSelect = (price: number) => {
    setSelectedPrice(price);
    handlePriceFilter(price); // Enviando como string, como no seu código anterior
  };

  return (
    <div className="flex w-[95%] rounded flex-col gap-3 bg-gray-100 p-3 ">
      <h2 className="font-semibold text-center mb-2">Select Price Range</h2>
      <div className="grid grid-cols-2 gap-3">
        {priceLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => handlePriceSelect(level.value)}
            className={`${
              selectedPrice === level.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } p-2 rounded-lg hover:bg-blue-400 transition cursor-pointer`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
