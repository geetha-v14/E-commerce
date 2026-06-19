import React from "react";

import ProductCard from "../ProductCard/ProductCard";

const ProductsGrid = ({
  loading,
  products,
}) => {

  return (

    <div className="products-grid">

      {loading ? (

        <p>
          Loading...
        </p>

      ) : products.length === 0 ? (

        <p>
          No products found
        </p>

      ) : (

        products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))

      )}

    </div>

  );

};

export default ProductsGrid;