const buildProductQuery = (query) => {

  const filters = {
    isPublished: true,
  };


  if (query.category) {

    filters.categorySlug = query.category;

  }


  if (query.subcategory) {

    filters.subcategorySlug =
      query.subcategory;

  }

  if (query.brand) {

    let brands = query.brand;

    // convert comma string to array
    if (
      typeof brands === "string"
    ) {

      brands = brands.split(",");

    }

    if (Array.isArray(brands)) {

      filters.brand = {
        $in: brands,
      };

    }

  }

  if (query.search) {

    filters.$or = [

      {
        title: {
          $regex: query.search,
          $options: "i",
        },
      },

      {
        description: {
          $regex: query.search,
          $options: "i",
        },
      },

      {
        brand: {
          $regex: query.search,
          $options: "i",
        },
      },

      {
        tags: {
          $regex: query.search,
          $options: "i",
        },
      },

      {
        categorySlug: {
          $regex: query.search,
          $options: "i",
        },
      },

      {
        subcategorySlug: {
          $regex: query.search,
          $options: "i",
        },
      },

    ];

  }

  if (
    query.minPrice ||
    query.maxPrice
  ) {

    filters.price = {};

    if (query.minPrice) {

      filters.price.$gte =
        Number(query.minPrice);

    }

    if (query.maxPrice) {

      filters.price.$lte =
        Number(query.maxPrice);

    }

  }


  if (query.discount) {

    filters.discountPercentage = {
      $gte: Number(query.discount),
    };

  }



  if (
    query.stock === "inStock"
  ) {

    filters.stock = {
      $gt: 0,
    };

  }

  return filters;

};

module.exports = buildProductQuery;