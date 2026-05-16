import React,
{
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

import {
  getBanners,
} from "../../../services/bannerService";


const HeroBanner = () => {

  const [ banners,
    setBanners,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    fetchBanners();

  }, []);


  const fetchBanners = async () => {

      try {

        const data =   await getBanners();

        setBanners(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };


  if (loading) {

    return (

      <div
        className="bg-light rounded-4 mb-5"

        style={{
          height: "450px",
        }}
      />

    );

  }


  return (

    <div className="mb-5">

      <Swiper

        modules={[
          Autoplay,
          Pagination,
          Navigation,
        ]}

        autoplay={{
          delay: 3000,
        }}

        pagination={{
          clickable: true,
        }}

        navigation

        loop

      >

        {
          banners.map(
            (banner) => (

            <SwiperSlide
              key={banner._id}
            >

              <div
                className="position-relative overflow-hidden rounded-4"

                style={{
                  height: "450px",
                }}
              >

                <img
                  src={banner.image?.url}
                  alt={banner.title}
                  className="w-100 h-100 object-fit-cover"
                />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"

                  style={{
                    background:
                      "rgba(0,0,0,0.4)",
                  }}
                />

                <div
                  className="position-absolute top-50 start-0 translate-middle-y text-white px-5"
                >

                  <h1 className="fw-bold display-4">

                    {banner.title}

                  </h1>

                  <p className="fs-4">

                    {
                      banner.subtitle
                    }

                  </p>

                  <button
                    className="btn btn-light btn-lg"
                  >

                    Shop Now

                  </button>

                </div>

              </div>

            </SwiperSlide>

          ))
        }

      </Swiper>

    </div>
  );
};

export default HeroBanner;