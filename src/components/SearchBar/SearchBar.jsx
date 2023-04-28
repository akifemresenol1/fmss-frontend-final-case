import React from "react";
import { ImSearch } from "react-icons/im";

import "./SearchBar.css";

export default function SearchBar({ value, onInputhange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };
  const handleClick = () => {
    onSearch(value);
  };
  return (
    <div className="search-bar">
      <input
        value={value}
        onChange={onInputhange}
        placeholder="Search by name or model"
        onKeyDown={handleKeyDown}
      />
      <ImSearch className="search-icon" onClick={handleClick} />
    </div>
  );
}
