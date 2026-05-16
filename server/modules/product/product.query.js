const buildProductQuery = (query) => {

  const filters = {};

  // if (query.category) {

  //   filters.category = query.category;

  // }

  

  if (query.brand) {

    filters.brand = {
      $regex: query.brand,
      $options: "i",
    };

  }

  if (query.search) {

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
        $elemMatch: {
          $regex: query.search,
          $options: "i",
        },
      },
    },

  ];

}

  }

  if (query.minPrice || query.maxPrice) {

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

  if (query.featured === "true") {

    filters.featured = true;

  }

  return filters;

};

module.exports = buildProductQuery;