import React from "react";

import {
    Link,
} from "react-router-dom";

import {
   
    FaHeart,
} from "react-icons/fa";

import "./ProductCard.css";
import CartButton from "../CartButton/CartButton";


const ProductCard = ({ product, }) => {

    if (!product) {

        return null;

    }


    const productImage = product.images?.[0]?.url || "https://placehold.co/600x600?text=No+Image";

    return (

        <div className="card product-card border-0 h-100">
            {/* Image */}
            <div className="product-image-wrapper position-relative">

                <Link
                    to={`/product/${product.slug}`}
                >

                    <img
                        src={productImage}
                        alt={product.title}
                        className="product-image"
                    />

                </Link>


                {/* Wishlist */}
                <button className="wishlist-btn">

                    <FaHeart />

                </button>

            </div>

            {/* Body */}
            <div className="card-body d-flex flex-column w-100">

                {/* Brand */}
                <p className="product-brand mb-1">

                    {product.brand}

                </p>

                {/* Title */}
                <Link
                    to={`/product/${product.slug}`}
                    className="text-decoration-none text-dark"
                >

                    <h6 className="product-title-card">

                        {product.title}

                    </h6>

                </Link>

                {/* Rating */}
                {/* <div className="d-flex align-items-center gap-1 mb-2">

                    <FaStar
                        className="text-warning"
                        size={14}
                    />

                    <small>
                        {product.ratings || 0}
                    </small>

                    <small className="text-muted">
                        ({product.numReviews || 0})
                    </small>

                </div> */}

                {/* Price */}
                <div className="d-flex align-items-center gap-2 mb-1 product-price">



                    {product.salePrice > 0 && (

                        <small className="text-muted text-decoration-line-through ">

                            ₹{product.price}

                        </small>

                    )}
                    <h6 className="mb-0 fw-bold">

                        ₹{product.salePrice || product.price}

                    </h6>

                      {/* Discount */}
                    {product.discountPercentage > 0 && (

                        <span className="discount-badge">

                            {product.discountPercentage}% off

                        </span>

                    )}



                </div>

                {/* Stock */}
                {product.stock > 0 ? (

                    <small className="text-success mb-3">

                        {/* In Stock */}

                    </small>

                ) : (

                    <small className="text-danger mb-3">

                        Out of Stock

                    </small>

                )}

                {/* Add To Cart */}
                <CartButton

                    product={product} />


            </div>

        </div>

    );

};

export default ProductCard;