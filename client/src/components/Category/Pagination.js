import React from "react";

import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Pagination = ({
  pagination,
  handlePageChange,
}) => {

  return (

    <div className="pagination">

      <button
        disabled={
          pagination.currentPage === 1
        }
        onClick={() =>
          handlePageChange(
            pagination.currentPage -
              1
          )
        }
      >

        <FiChevronLeft />

      </button>

      {[
        ...Array(
          pagination.totalPages
        ),
      ].map((_, index) => (

        <button
          key={index}
          className={
            pagination.currentPage ===
            index + 1
              ? "active-page"
              : ""
          }
          onClick={() =>
            handlePageChange(
              index + 1
            )
          }
        >

          {index + 1}

        </button>

      ))}

      <button
        disabled={
          pagination.currentPage ===
          pagination.totalPages
        }
        onClick={() =>
          handlePageChange(
            pagination.currentPage +
              1
          )
        }
      >

        <FiChevronRight />

      </button>

    </div>

  );

};

export default Pagination;