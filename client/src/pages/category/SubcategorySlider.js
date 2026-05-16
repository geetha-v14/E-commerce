import React from "react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { FreeMode } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";

import "swiper/css/free-mode";

import "./CategoryProductsPage.css";

const SubcategorySlider = ({
  categorySlug,
  subcategories,
  activeSubcategory,
}) => {

  return (

    <section className="subcategory-section">

      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={16}
        slidesPerView="auto"
        className="subcategory-swiper"
      >

        {subcategories.map((subcategory) => (

          <SwiperSlide
            key={subcategory._id}
            className="subcategory-slide"
          >

            <Link
              to={`/category/${categorySlug}/${subcategory.slug}`}
              className="text-decoration-none"
            >

              <div
                className={`subcategory-card ${
                  activeSubcategory ===
                  subcategory.slug
                    ? "active-subcategory"
                    : ""
                }`}
              >

                <img
                  src={subcategory.image?.url}
                  alt={subcategory.name}
                  className="subcategory-image"
                />

                <h6 className="subcategory-name">
                  {subcategory.name}
                </h6>

              </div>

            </Link>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>

  );

};

export default SubcategorySlider;