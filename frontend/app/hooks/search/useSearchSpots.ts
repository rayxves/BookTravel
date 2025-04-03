import { useState } from "react";

export function useSearchSpots() {
    const [searchText, setSearchText] = useState<string>("");
    
      function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
      }
    
      return {
        searchText, handleInputChange
      }
}