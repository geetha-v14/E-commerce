import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  getProducts,
} from "../services/productService";

import {
  getCategoryBySlug,
  getSubcategories,
} from "../services/categoryServices";

const useCategoryProducts = ({
  categorySlug,
  subcategorySlug,
  searchParams,
  setSearchParams,
  search,
}) => {

  /* =========================
      STATES
  ========================= */

  const [products, setProducts] =
    useState([]);

  const [subcategories, setSubcategories] =
    useState([]);

  const [brands, setBrands] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [showFilters, setShowFilters] =
    useState(false);

  const [pagination, setPagination] =
    useState({
      totalPages: 1,
      currentPage: 1,
      total: 0,
    });

  const [openFilters, setOpenFilters] =
    useState({
      brand: true,
      price: true,
      availability: true,
      discount: true,
    });

  /* =========================
      URL VALUES
  ========================= */

  const page =
    searchParams.get("page") || 1;

  const sort =
    searchParams.get("sort") || "newest";

  const selectedBrands =
    searchParams.getAll("brand");

  const minPrice =
    searchParams.get("minPrice") || "";

  const maxPrice =
    searchParams.get("maxPrice") || "";

  const stock =
    searchParams.get("stock") || "";

  const discount =
    searchParams.get("discount") || "";

  /* =========================
      TOGGLE FILTER
  ========================= */

  const toggleFilterSection = (key) => {

    setOpenFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  };

  /* =========================
      FETCH PRODUCTS
  ========================= */

  const fetchProducts = useCallback(async () => {

    try {

      setLoading(true);

      const query = {

        page,
        sort,

      };

      if (categorySlug) {

        query.category = categorySlug;

      }

      if (subcategorySlug) {

        query.subcategory =
          subcategorySlug;

      }

      if (search) {

        query.search = search;

      }

      if (
        selectedBrands.length > 0
      ) {

        query.brand =
          selectedBrands;

      }

      if (minPrice) {

        query.minPrice =
          minPrice;

      }

      if (maxPrice) {

        query.maxPrice =
          maxPrice;

      }

      if (stock) {

        query.stock = stock;

      }

      if (discount) {

        query.discount =
          discount;

      }

      const data =
        await getProducts(query);

      setProducts(data.products);

      setPagination({
        totalPages:
          data.totalPages,
        currentPage:
          data.currentPage,
        total: data.total,
      });

      /* =========================
          FETCH BRANDS
      ========================= */

      const allBrandsQuery = {};

      if (categorySlug) {

        allBrandsQuery.category =
          categorySlug;

      }

      if (subcategorySlug) {

        allBrandsQuery.subcategory =
          subcategorySlug;

      }

      const allProducts =
        await getProducts(
          allBrandsQuery
        );

      const uniqueBrands = [

        ...new Set(

          allProducts.products
            .map(
              (item) =>
                item.brand
            )
            .filter(Boolean)

        ),

      ];

      setBrands(uniqueBrands);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }, [
    categorySlug,
    subcategorySlug,
    page,
    sort,
    search,
    searchParams.toString(),
  ]);

  /* =========================
      FETCH SUBCATEGORIES
  ========================= */

  const fetchSubcategories = useCallback(async () => {

    try {

      if (!categorySlug) {

        setSubcategories([]);

        return;

      }

      const category =
        await getCategoryBySlug(
          categorySlug
        );

      const data =
        await getSubcategories(
          category._id
        );

      setSubcategories(data);

    } catch (error) {

      console.log(error);

    }

  }, [categorySlug]);

  /* =========================
      EFFECTS
  ========================= */

  useEffect(() => {

    fetchProducts();

  }, [fetchProducts]);

  useEffect(() => {

    fetchSubcategories();

  }, [fetchSubcategories]);

  /* =========================
      UPDATE QUERY
  ========================= */

  const updateQuery = (
    key,
    value,
    isMulti = false
  ) => {

    const params =
      new URLSearchParams(
        searchParams
      );

    if (isMulti) {

      const existing =
        params.getAll(key);

      if (
        existing.includes(value)
      ) {

        const updated =
          existing.filter(
            (item) =>
              item !== value
          );

        params.delete(key);

        updated.forEach((item) =>
          params.append(
            key,
            item
          )
        );

      } else {

        params.append(
          key,
          value
        );

      }

    } else {

      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {

        params.delete(key);

      } else {

        params.set(key, value);

      }

    }

    params.set("page", 1);

    setSearchParams(params);

  };

  /* =========================
      PAGINATION
  ========================= */

  const handlePageChange =
    (newPage) => {

      const params =
        new URLSearchParams(
          searchParams
        );

      params.set(
        "page",
        newPage
      );

      setSearchParams(params);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };

  return {

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

  };

};

export default useCategoryProducts;