import React from "react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" placeholder="Search by name or model" />
        <button type="submit">Search</button>
      </div>
    </div>
  );
}
