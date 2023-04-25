import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onInputhange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };
  return (
    <div className="search">
      <div className="search-bar">
        <input
          value={value}
          onChange={onInputhange}
          type="search"
          placeholder="Search by name or model"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
