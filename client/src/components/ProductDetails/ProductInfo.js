import React from "react";

import CartButton from "../CartButton/CartButton";

import DeliveryCheck from "./DeliveryCheck";

import ProductHighlights from "./ProductHighlights";

const ProductInfo = ({
  product,
}) => {

  return (

    <div className="product-info">


      <div className="d-flex align-center gap-3">

        <p className="product-brand">

          {product.brand}

        </p>

        <div
          className={`stock-badge ${
            product.stock > 0
              ? "in-stock"
              : "out-stock"
          }`}
        >

          {product.stock > 0
            ? "In Stock"
            : "Out of Stock"}

        </div>

      </div>


      <h1 className="product-title">

        {product.title}

      </h1>

     
      {/* <div className="product-rating">

        ⭐ {product.ratings || 4.5}

        <span>

          ({product.numReviews || 0}
          reviews)

        </span>

      </div> */}

      <div className="price-section">

        <h2 className="sale-price">

          ₹{product.salePrice}

        </h2>

        <p className="original-price">

          ₹{product.price}

        </p>

        {product.discountPercentage >
          0 && (

          <span className="discount-badge-box">

            {
              product.discountPercentage
            }
            % off

          </span>

        )}

      </div>


      <div className="product-actions">

        <CartButton
          product={product}
        />

        <button className="buy-now-btn">

          Buy Now

        </button>

      </div>



      <DeliveryCheck />


      <ProductHighlights />

    </div>

  );

};

export default ProductInfo;