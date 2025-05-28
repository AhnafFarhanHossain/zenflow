"use client";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react"; // Renamed to avoid conflict if Search component is imported

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative flex items-center">
      <SearchIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
        size={18} // Slightly smaller icon
      />
      <input
        type="text"
        className="
          w-full // Ensure input takes available width if container is sized
          pl-10 pr-4 py-2 
          rounded-md
          bg-neutral-800/60
          text-neutral-200
          placeholder-neutral-400
          border border-neutral-700/50
          focus:bg-neutral-700/70
          focus:border-neutral-500
          focus:ring-0
          focus:outline-none
          transition-all duration-150 ease-in-out
        "
        value={query}
        placeholder={placeholder || "Search..."} // Default placeholder if none provided
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
