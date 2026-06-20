import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Spinner from "../../components/Loader/Spinner";

import {
  getMainCategories,
  getSubcategories,
} from "../../services/categoryServices";

import "./AllCategoriesPage.css";

const AllCategoriesPage = () => {

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      const mainCategories =
        await getMainCategories();

      const categoriesWithSubs =
        await Promise.all(

          mainCategories.map(
            async (category) => {

              const subcategories =
                await getSubcategories(
                  category._id
                );

              return {
                ...category,
                subcategories,
              };

            }
          )

        );

      setCategories(
        categoriesWithSubs
      );

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

    <div className="all-categories-page">

      <div className="container">

        <h2 className="category-page-title">
          Categories
        </h2>

        {categories.map((category) => (

          <section
            key={category._id}
            className="category-group-section"
          >

            <h3 className="main-category-title">
              {category.name}
            </h3>

            <div className="subcategory-grid">

              {category.subcategories.map(
                (subcategory) => (

                  <Link
                    key={subcategory._id}
                    to={`/category/${category.slug}/${subcategory.slug}`}
                    className="subcategory-link"
                  >

                    <div className="subcategory-card">

                      <img
                        src={subcategory.image?.url}
                        alt={subcategory.name}
                        className="subcategory-image"
                      />

                      <h6 className="subcategory-name">
                        {subcategory.name}
                      </h6>

                    </div>

                  </Link>

                )
              )}

            </div>

          </section>

        ))}

      </div>

    </div>

  );

};

export default AllCategoriesPage;