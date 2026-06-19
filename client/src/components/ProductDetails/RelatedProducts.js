import React from "react";

import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({
  relatedProducts,
}) => {

  if (
    relatedProducts.length === 0
  ) {

    return null;

  }

  return (

    <div className="related-products-section">

      <h2>

        Related Products

      </h2>

      <div className="related-products-grid">

        {relatedProducts.map(
          (item) => (

            <ProductCard
              key={item._id}
              product={item}
            />

          )
        )}

      </div>

    </div>

  );

};

export default RelatedProducts;