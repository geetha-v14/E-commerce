import React from "react";

const ProductAccordion = ({
  product,
  openAccordion,
  setOpenAccordion,
}) => {

  return (

    <div className="product-accordion-wrapper">

     

      <div className="accordion-item">

        <div
          className="accordion-header"
          onClick={() =>
            setOpenAccordion(
              openAccordion ===
                "description"
                ? ""
                : "description"
            )
          }
        >

          <h4>Description</h4>

          <span>

            {openAccordion ===
            "description"
              ? "-"
              : "+"}

          </span>

        </div>

        {openAccordion ===
          "description" && (

          <div className="accordion-body">

            <p>

              {product.description}

            </p>

          </div>

        )}

      </div>

      {/* SPECIFICATIONS */}

      <div className="accordion-item">

        <div
          className="accordion-header"
          onClick={() =>
            setOpenAccordion(
              openAccordion ===
                "specifications"
                ? ""
                : "specifications"
            )
          }
        >

          <h4>Specifications</h4>

          <span>

            {openAccordion ===
            "specifications"
              ? "-"
              : "+"}

          </span>

        </div>

        {openAccordion ===
          "specifications" && (

          <div className="accordion-body">

            <p>
              Brand:
              {" "}
              {product.brand}
            </p>

            <p>
              Category:
              {" "}
              {
                product.category
                  ?.name
              }
            </p>

            <p>
              Stock:
              {" "}
              {product.stock}
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default ProductAccordion;