import React from "react";

import {
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import { IoCloseOutline } from "react-icons/io5";

const FiltersSidebar = ({
  showFilters,
  setShowFilters,
  openFilters,
  toggleFilterSection,
  brands,
  selectedBrands,
  updateQuery,
  stock,
  setSearchParams,
}) => {

  return (

    <aside
      className={`filters-sidebar ${
        showFilters
          ? "show-filters"
          : ""
      }`}
    >

      {/* ======================
          MOBILE HEADER
      ====================== */}

      <div className="mobile-filter-header">

        <h3>Filters</h3>

        <button
          onClick={() =>
            setShowFilters(false)
          }
        >

          <IoCloseOutline />

        </button>

      </div>

      {/* ======================
          BRANDS
      ====================== */}

      <div className="filter-section">

        <div
          className="filter-title"
          onClick={() =>
            toggleFilterSection(
              "brand"
            )
          }
        >

          <h4>Brands</h4>

          {openFilters.brand ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}

        </div>

        {openFilters.brand && (

          <div className="filter-options">

            {brands.map((item) => (

              <label
                key={item}
                className="filter-checkbox"
              >

                <input
                  type="checkbox"
                  checked={selectedBrands.includes(
                    item
                  )}
                  onChange={() =>
                    updateQuery(
                      "brand",
                      item,
                      true
                    )
                  }
                />

                <span>{item}</span>

              </label>

            ))}

          </div>

        )}

      </div>

      {/* ======================
          PRICE
      ====================== */}

      <div className="filter-section">

        <div
          className="filter-title"
          onClick={() =>
            toggleFilterSection(
              "price"
            )
          }
        >

          <h4>Price</h4>

          {openFilters.price ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}

        </div>

        {openFilters.price && (

          <div className="filter-options column">

            <button
              onClick={() => {

                updateQuery(
                  "minPrice",
                  0
                );

                updateQuery(
                  "maxPrice",
                  500
                );

              }}
            >

              Under ₹500

            </button>

            <button
              onClick={() => {

                updateQuery(
                  "minPrice",
                  500
                );

                updateQuery(
                  "maxPrice",
                  2000
                );

              }}
            >

              ₹500 - ₹2000

            </button>

            <button
              onClick={() => {

                updateQuery(
                  "minPrice",
                  2000
                );

                updateQuery(
                  "maxPrice",
                  5000
                );

              }}
            >

              ₹2000 - ₹5000

            </button>

          </div>

        )}

      </div>

      {/* ======================
          AVAILABILITY
      ====================== */}

      <div className="filter-section">

        <div
          className="filter-title"
          onClick={() =>
            toggleFilterSection(
              "availability"
            )
          }
        >

          <h4>Availability</h4>

          {openFilters.availability ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}

        </div>

        {openFilters.availability && (

          <div className="filter-options">

            <label className="filter-checkbox">

              <input
                type="radio"
                checked={
                  stock ===
                  "inStock"
                }
                onChange={() =>
                  updateQuery(
                    "stock",
                    "inStock"
                  )
                }
              />

              <span>
                In Stock
              </span>

            </label>

          </div>

        )}

      </div>

      {/* ======================
          DISCOUNT
      ====================== */}

      <div className="filter-section">

        <div
          className="filter-title"
          onClick={() =>
            toggleFilterSection(
              "discount"
            )
          }
        >

          <h4>Discount</h4>

          {openFilters.discount ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}

        </div>

        {openFilters.discount && (

          <div className="filter-options column">

            <button
              onClick={() =>
                updateQuery(
                  "discount",
                  70
                )
              }
            >

              70% or more

            </button>

            <button
              onClick={() =>
                updateQuery(
                  "discount",
                  50
                )
              }
            >

              50% or more

            </button>

            <button
              onClick={() =>
                updateQuery(
                  "discount",
                  30
                )
              }
            >

              30% or more

            </button>

            <button
              onClick={() =>
                updateQuery(
                  "discount",
                  10
                )
              }
            >

              10% or more

            </button>

          </div>

        )}

      </div>

      {/* ======================
          CLEAR BUTTON
      ====================== */}

      <button
        className="clear-btn"
        onClick={() =>
          setSearchParams({})
        }
      >

        Clear All

      </button>

    </aside>

  );

};

export default FiltersSidebar;