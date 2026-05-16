import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";




import SubcategorySlider from "./SubcategorySlider";

import {
  getCategoryBySlug,
  getSubcategories,
} from "../../services/categoryServices";


import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

const CategoryProductsPage = () => {

  const {
    categorySlug,
    subcategorySlug,
  } = useParams();

  const [
    category,
    setCategory,
  ] = useState(null);

  const [
    subcategories,
    setSubcategories,
  ] = useState([]);

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    fetchPageData();

  }, [categorySlug, subcategorySlug]);

  const fetchPageData = async () => {

    try {

      setLoading(true);

      // category details
      const categoryData =
        await getCategoryBySlug(
          categorySlug
        );

      setCategory(categoryData);

      // subcategories
      const subcategoryData =
        await getSubcategories(
          categoryData._id
        );

      setSubcategories(
        subcategoryData
      );

      // products
      const params =
        subcategorySlug
          ? {
              subcategory:
                subcategorySlug,
            }
          : {
              category:
                categorySlug,
            };

      const productsData =
        await getProducts(params);

      setProducts(
        productsData.products
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      
        <div className="container py-5">

          <h4>
            Loading products...
          </h4>

        </div>

     

    );

  }

  return (

   

      <div className="container py-4">

        <h2 className="fw-bold text-center mb-4">

          {category?.name}

        </h2>

        <SubcategorySlider
          categorySlug={categorySlug}
          subcategories={subcategories}
          activeSubcategory={
            subcategorySlug
          }
        />

        <div className="row g-4 mt-3">

          {products.map((product) => (

            <div
              key={product._id}
              className="
                col-6
                col-md-4
                col-lg-3
              "
            >

              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>

      </div>

   

  );

};

export default CategoryProductsPage;