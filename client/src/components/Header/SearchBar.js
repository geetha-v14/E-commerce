import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaSearch,
} from "react-icons/fa";


const SearchBar = () => {

  const navigate =
    useNavigate();

  const [keyword,
    setKeyword]
      = useState("");


  const handleSearch =
    (e) => {

      e.preventDefault();

      if (
        keyword.trim()
      ) {

        navigate(
          `/products?search=${keyword}`
        );

      }

  };


  return (

    <div className="bg-white py-3 border-bottom">

      <div className="container-fluid px-lg-5 px-3">

        <form
          onSubmit={handleSearch}
        >

          <div className="input-group">

             <button
              className="btn btn-dark px-4"
            >

              <FaSearch />

            </button>

            <input
              type="text"

              placeholder="Search products..."

              className="form-control form-control-lg"

              value={keyword}

              onChange={(e) =>
                setKeyword(
                  e.target.value
                )
              }
            />

           

          </div>

        </form>

      </div>

    </div>
  );
};

export default SearchBar;