import React, {
    useEffect,
    useState,
} from "react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";
import { getCategories } from "../services/categoryServices";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container-fluid px-lg-5 px-3 mt-5">

            {/* Top */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="fw-bold">
                    Shop by Categories
                </h3>

                <button className="btn btn-outline-dark">
                    View All
                </button>

            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },

                    768: {
                        slidesPerView: 3,
                    },

                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >

                {categories.map((category) => (
                    <SwiperSlide
                        key={category._id}
                    >

                        <div className="card border-0 shadow-sm rounded-4">

                            <img
                                src={category.image}
                                alt={category.name}
                                className="card-img-top rounded-top-4"
                                style={{
                                    height: "180px",
                                    objectFit: "cover",
                                }}
                            />

                            <div className="card-body text-center">

                                <h6 className="fw-semibold mb-0">
                                    {category.name}
                                </h6>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default Categories;