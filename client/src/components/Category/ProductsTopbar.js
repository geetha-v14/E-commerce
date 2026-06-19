import React from "react";

const ProductsTopbar = ({
  pagination,
  sort,
  updateQuery,
}) => {

  return (

    <div className="products-topbar">

      <p>

        Showing {pagination.total} Products

      </p>

      <select
        className="sort-select"
        value={sort}
        onChange={(e) =>
          updateQuery(
            "sort",
            e.target.value
          )
        }
      >

        <option value="newest">
          Newest
        </option>

        <option value="priceLow">
          Price Low to High
        </option>

        <option value="priceHigh">
          Price High to Low
        </option>

      </select>

    </div>

  );

};

export default ProductsTopbar;