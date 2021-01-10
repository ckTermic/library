import React from "react";
import "../styles/search.css";

export const Search = () => {
  return (
    <div className="searchComponent">
      <form className="searchBox">
        <div className="search">
          <input className="searchBar" />
          <button className="submitButton" type="submit">
            search
          </button>
        </div>
      </form>
    </div>
  );
};
