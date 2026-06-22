import React, {
    useEffect,
    useState,
} from "react";

import UserLayout from "../../layouts/User/UserLayout";

import HeroBanner from "../../components/Home/HeroBanner/HeroBanner";

import CategoriesSlider from "../../components/Home/Categories/CategoriesSlider";

import ProductSection from "../../components/Home/ProductSection/ProductSection";

import Spinner from "../../components/Loader/Spinner";

import { getHomepageProducts } from "../../services/homepageService";


const HomePage = () => {

    const [
        homepageData,
        setHomepageData,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);


    useEffect(() => {

        fetchHomepageProducts();

    }, []);


    const fetchHomepageProducts = async () => {

        try {

            const data =
                await getHomepageProducts();

            setHomepageData(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {
        return <Spinner />;
    }


    return (

        <UserLayout>

            <HeroBanner />

            <CategoriesSlider />
           

            {/* Featured */}
            <ProductSection
                title="Featured Products"
                products={
                    homepageData?.featuredProducts
                }
            />

            {/* Top Deals */}
            <ProductSection
                title="Top Deals"
                products={
                    homepageData?.topDeals
                }
            />

            {/* Trending */}
            <ProductSection
                title="Trending Products"
                products={
                    homepageData?.trendingProducts
                }
            />

            {/* New Arrivals */}
            <ProductSection
                title="New Arrivals"
                products={
                    homepageData?.newArrivals
                }
            />

        </UserLayout>

    );

};

export default HomePage;