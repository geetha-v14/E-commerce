import React from "react";

import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  FiFilter,
} from "react-icons/fi";

import UserLayout from "../../layouts/User/UserLayout";

import SubcategorySlider from "../../components/Category/SubcategorySlider";

import FiltersSidebar from "../../components/Category/FiltersSidebar";

import ProductsTopbar from "../../components/Category/ProductsTopbar";

import ProductsGrid from "../../components/Category/ProductsGrid";

import Pagination from "../../components/Category/Pagination";

import useCategoryProducts from "../../hooks/useCategoryProducts";

import "./CategoryProductsPage.css";

const CategoryProductsPage = () => {

  const {
    categorySlug,
    subcategorySlug,
  } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const {
    products,
    subcategories,
    brands,
    loading,
    pagination,
    showFilters,
    setShowFilters,
    openFilters,
    toggleFilterSection,
    selectedBrands,
    stock,
    discount,
    sort,
    updateQuery,
    handlePageChange,
  } = useCategoryProducts({
    categorySlug,
    subcategorySlug,
    searchParams,
    setSearchParams,
    search,
  });

  return (

    <UserLayout>

      <div className="category-products-page container">

        <div className="breadcrumbs">

          Home / {
            search
              ? "Search"
              : categorySlug
          }

          {subcategorySlug &&
            ` / ${subcategorySlug}`}

        </div>

        <div className="category-header">

          <h1 className="category-title">

            {
              search
                ? `Search Results for "${search}"`
                : subcategorySlug || categorySlug
            }

          </h1>

        </div>

        <SubcategorySlider
          categorySlug={categorySlug}
          subcategories={subcategories}
          activeSubcategory={subcategorySlug}
        />

        <div className="mobile-actions">

          <button
            className="mobile-btn"
            onClick={() =>
              setShowFilters(true)
            }
          >

            <FiFilter />

            Filters

          </button>

        </div>

        <div className="category-layout">

          <FiltersSidebar
            showFilters={showFilters}
            setShowFilters={
              setShowFilters
            }
            openFilters={openFilters}
            toggleFilterSection={
              toggleFilterSection
            }
            brands={brands}
            selectedBrands={
              selectedBrands
            }
            updateQuery={updateQuery}
            stock={stock}
            discount={discount}
            setSearchParams={
              setSearchParams
            }
          />

          <section className="products-content">

            <ProductsTopbar
              pagination={pagination}
              sort={sort}
              updateQuery={updateQuery}
            />

            <ProductsGrid
              loading={loading}
              products={products}
            />

            <Pagination
              pagination={pagination}
              handlePageChange={
                handlePageChange
              }
            />

          </section>

        </div>

      </div>

    </UserLayout>

  );

};

export default CategoryProductsPage;