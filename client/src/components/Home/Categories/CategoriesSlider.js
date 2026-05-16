import React, {
  useEffect,
  useState,
} from "react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

// import {
//   Navigation,
// } from "swiper/modules";

import {
  Link,
} from "react-router-dom";

import {
  getMainCategories,
} from "../../../services/categoryServices";

import "swiper/css";
import "swiper/css/navigation";

import "./CategoriesSlider.css";


const CategoriesSlider = () => {

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchCategories();

  }, []);


  const fetchCategories =
    async () => {

      try {

        const data = await getMainCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };


  if (loading) {

    return (
      <h5>
        Loading categories...
      </h5>
    );

  }


  return (

    <section className="categories-section">

      {/* Top */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3 className="fw-bold category-title">
          Shop by Categories
        </h3>

        <Link
          to="/category"
          className="
            text-decoration-none
            fw-semibold
            view-all-btn
          "
        >
          View All
        </Link>

      </div>


      {/* Swiper */}

      <Swiper

        // modules={[Navigation]}

        

        spaceBetween={20}

        breakpoints={{

          320: {
            slidesPerView: 2.2,
          },

          576: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 4,
          },

          1024: {
            slidesPerView: 5,
          },

        }}

      >

        {
          categories.map((category) => (

            <SwiperSlide
              key={category._id}
            >

              <Link

                to={`/category/${category.slug}`}

                className="
                  text-decoration-none
                  text-dark
                "

              >

                <div className="category-card">

                  <img
                    src={category.image?.url}
                    alt={category.name}
                    className="category-img"
                  />

                  <div className="card-body text-center p-2">

                    <h6 className="fw-semibold mb-0 category-name">
                      {category.name}
                    </h6>

                  </div>

                </div>

              </Link>

            </SwiperSlide>

          ))
        }

      </Swiper>

    </section>

  );

};

export default CategoriesSlider;