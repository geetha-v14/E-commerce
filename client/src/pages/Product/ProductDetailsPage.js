import React from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout/MainLayout";

import ProductGallery from "../../components/ProductDetails/ProductGallery";

import ProductInfo from "../../components/ProductDetails/ProductInfo";

import ProductAccordion from "../../components/ProductDetails/ProductAccordion";

import RelatedProducts from "../../components/ProductDetails/RelatedProducts";

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

    return (

      <MainLayout>

        <div className="product-loading">

          Loading product...

        </div>

      </MainLayout>

    );

  }


  if (!product) {

    return (

      <MainLayout>

        <div className="product-loading">

          Product not found

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

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

    </MainLayout>

  );

};

export default ProductDetailsPage;