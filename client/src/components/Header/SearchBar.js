import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaSearch,
} from "react-icons/fa";

 import "./Search.css";

const SearchBar = () => {

  const navigate =
    useNavigate();

  const [keyword, setKeyword] =
    useState("");

  const handleSearch =
    (e) => {

      e.preventDefault();

      if (keyword.trim()) {

        navigate(
          `/products?search=${keyword.trim()}`
        );

      }

    };

  return (

    <form
      className="flex-grow-1 search-form"
      onSubmit={handleSearch}
    >

      <input
        type="text"
        className="form-control search-input rounded-pill "
        
        placeholder="Search products..."
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
        className="search-btn"
      >

        <FaSearch />

      </button>

    </form>

  );

};

export default SearchBar;