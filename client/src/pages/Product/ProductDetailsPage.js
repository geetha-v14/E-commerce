import React from "react";

import { useParams } from "react-router-dom";

import UserLayout from "../../layouts/User/UserLayout";

import ProductGallery from "../../components/ProductDetails/ProductGallery";

import ProductInfo from "../../components/ProductDetails/ProductInfo";

import ProductAccordion from "../../components/ProductDetails/ProductAccordion";

import RelatedProducts from "../../components/ProductDetails/RelatedProducts";

import Spinner from "../../components/Loader/Spinner";

import useProductDetails from "../../hooks/useProductDetails";

import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {

  const { slug } = useParams();

  const {
    product,
    loading,
    selectedImage,
    setSelectedImage,
    relatedProducts,
    openAccordion,
    setOpenAccordion,
  } = useProductDetails(slug);


  if (loading) {
    return <Spinner />;
  }


  if (!product) {

    return (

      <UserLayout>

        <div className="product-loading">

          Product not found

        </div>

      </UserLayout>

    );

  }

  return (

    <UserLayout>

      <div className="product-details-page container">

        <div className="product-details-wrapper">

          <ProductGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={
              setSelectedImage
            }
          />

          <ProductInfo
            product={product}
          />

        </div>

        <ProductAccordion
          product={product}
          openAccordion={
            openAccordion
          }
          setOpenAccordion={
            setOpenAccordion
          }
        />

        <RelatedProducts
          relatedProducts={
            relatedProducts
          }
        />

      </div>

    </UserLayout>

  );

};

export default ProductDetailsPage;