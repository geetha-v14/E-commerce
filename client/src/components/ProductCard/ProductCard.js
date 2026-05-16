import React from "react";

import {
    Link,
} from "react-router-dom";

import {
    FaStar,
    FaShoppingCart,
    FaHeart,
} from "react-icons/fa";

import "./ProductCard.css";


const ProductCard = ({product,}) => {

    if (!product) {

        return null;

    }


    const productImage = product.images?.[0]?.url || "https://placehold.co/600x600?text=No+Image";

    return (

        <div className="card product-card border-0 shadow-sm rounded-4 h-100">

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

                {/* Discount */}
                {product.discountPercentage > 0 && (

                    <span className="discount-badge">

                        {product.discountPercentage}% OFF

                    </span>

                )}

                {/* Wishlist */}
                <button className="wishlist-btn">

                    <FaHeart />

                </button>

            </div>

            {/* Body */}
            <div className="card-body d-flex flex-column">

                {/* Brand */}
                <p className="product-brand mb-1">

                    {product.brand}

                </p>

                {/* Title */}
                <Link
                    to={`/product/${product.slug}`}
                    className="text-decoration-none text-dark"
                >

                    <h6 className="product-title">

                        {product.title}

                    </h6>

                </Link>

                {/* Rating */}
                <div className="d-flex align-items-center gap-1 mb-2">

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

                </div>

                {/* Price */}
                <div className="d-flex align-items-center gap-2 mb-3">

                    <h6 className="mb-0 fw-bold text-primary">

                        ₹{product.salePrice || product.price}

                    </h6>

                    {product.salePrice > 0 && (

                        <small className="text-muted text-decoration-line-through">

                            ₹{product.price}

                        </small>

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
                <button
                    className="btn btn-primary mt-auto rounded-pill"
                    disabled={product.stock <= 0}
                >

                    <FaShoppingCart className="me-2" />

                    Add to Cart

                </button>

            </div>

        </div>

    );

};

export default ProductCard;