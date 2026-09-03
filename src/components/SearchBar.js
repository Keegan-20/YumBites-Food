// SearchBar.js
import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const isFirstRender = useRef(true);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Debounced live search: filter as the user types (300ms after the last keystroke)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const debounceTimer = setTimeout(() => {
      onSearch(searchText);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  return (
    <div className="search-container w-full flex items-center">
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
          size={18}
          aria-hidden="true"
        />
        <input
          data-testid="search-input"
          type="search"
          id="#searchbar"
          placeholder="Search for restaurants"
          aria-label="Search for restaurants"
          className="search-input w-full h-11 pl-11 pr-4 bg-white border border-cream-300 rounded-full text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-colors duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
