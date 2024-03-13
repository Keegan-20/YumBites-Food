// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText);
  };

  return (
    <div className="search-container my-3 w-full flex justify-center align-middle md:text-sm ">
      <input
        data-testid="search-input"
        type="text"
        id="#searchbar"
        placeholder="Search for restaurants"
        className="search-input min-w-[80%] border-solid p-2 border-2 border-black-500 rounded-lg 
       focus:bg-[#f7f4c7]"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        data-testid="search-btn"
        className="search-button bg-amber-200 text-md font-medium  p-2  my-2 rounded-lg text-[#333] ml-2"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
