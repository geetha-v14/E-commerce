import React, {
    useEffect,
    useState,
} from "react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Autoplay,
    Pagination,
    Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getBanners } from "../../services/bannerService";

const HomeBanner = () => {
    const [banners, setBanners] = useState([]);

    const fetchBanners = async () => {
        try {
            const res = await getBanners();
            setBanners(res.data);
        } catch (err) {
            console.error("Error fetching banners:", err);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <div className="container-fluid px-lg-5 px-3 mt-4">

            <Swiper
                modules={[
                    Autoplay,
                    Pagination,
                    Navigation,
                ]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                }}
                pagination={{ clickable: true }}
                navigation
                loop={true}
            >

                {banners.map((banner) => (
                    <SwiperSlide key={banner._id}>
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="img-fluid rounded-4 w-100"
                            style={{
                                height: "350px",
                                objectFit: "cover",
                            }}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default HomeBanner;