import { useState } from "react";
import { types } from "../../data/types";

interface Props {
  handleTypeFilter: (type: string) => void;
}

export default function TypeFilter({ handleTypeFilter }: Props) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
    handleTypeFilter(type);
  };

  return (
    <div className="bg-gray-100 w-full grid grid-cols-2 p-2">
      {types.map((type) => (
        <div
          key={type}
          className="flex flex-row items-center mb-4 w-fit gap-2 justify-start"
        >
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={selectedType === type}
              onChange={() => handleSelect(type)}
              className="w-4 h-4 cursor-pointer text-blue-600 rounded-sm bg-gray-700 border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900">
              {type}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
