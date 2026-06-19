import React, {
    useEffect,
    useState,
} from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";

import HeroBanner from "../../components/Home/HeroBanner/HeroBanner";

import CategoriesSlider from "../../components/Home/Categories/CategoriesSlider";

import ProductSection from "../../components/Home/ProductSection/ProductSection";

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

        return (
            <MainLayout>

                <h4>
                    Loading...
                </h4>

            </MainLayout>
        );

    }


    return (

        <MainLayout>

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

        </MainLayout>

    );

};

export default HomePage;