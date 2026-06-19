import React from "react";

const ProductGallery = ({
  product,
  selectedImage,
  setSelectedImage,
}) => {

  return (

    <div className="product-gallery">


      <div className="main-image-wrapper">

        <img
          src={selectedImage}
          alt={product.title}
          className="main-product-image"
        />

      </div>

     
          {/* THUMBNAILS */}
     

      <div className="thumbnail-list">

        {product.images?.map(
          (image, index) => (

            <div
              key={index}
              className={`thumbnail-item ${
                selectedImage ===
                image.url
                  ? "active-thumbnail"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(
                  image.url
                )
              }
            >

              <img
                src={image.url}
                alt={product.title}
              />

            </div>

          )
        )}

      </div>

    </div>

  );

};

export default ProductGallery;