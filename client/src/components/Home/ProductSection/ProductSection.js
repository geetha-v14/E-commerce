import React from "react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Navigation,
} from "swiper/modules";

import {
    Link,
} from "react-router-dom";

import ProductCard from "../../ProductCard/ProductCard";

import "swiper/css";

import "swiper/css/navigation";

import "./ProductSection.css";


const ProductSection = ({
    title,
    products = [],
}) => {

    if (!products || products.length === 0) {

        return null;

    }

    return (

        <section className="product-section">

            {/* Top */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="fw-bold mb-0">
                    {title}
                </h3>

                <Link
                    to="/products"
                    className="text-decoration-none fw-semibold "
                    style={{color:"black"}}
                >
                    View All
                </Link>

            </div>

            {/* Slider */}
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={15}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 18,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >

                {products.map((product) => (

                    <SwiperSlide
                        key={product._id}
                    >

                        <ProductCard
                            product={product}
                        />

                    </SwiperSlide>

                ))}

            </Swiper>

        </section>

    );

};

export default ProductSection;