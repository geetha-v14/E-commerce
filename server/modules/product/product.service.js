const Product = require("./product.model");

const createProductService = async (data) => {

    return await Product.create(data);

};

const getProductsService = async ({
    filters,
    page,
    limit,
    sort,
  }) => {

    const products = await Product.find(filters)
        .populate("category", "name slug")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const total =await Product.countDocuments(
        filters
      );

    return {
      products,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
      currentPage: page,
    };

};

const getSingleProductService = async (slug) => {

    return await Product.findOne({
      slug,
      isPublished: true,
    })
      .populate(
        "category",
        "name slug"
      );

};

const getRelatedProductsService =  async ({
    categoryId,
    currentProductId,
  }) => {

    return await Product.find({
      category: categoryId,

      _id: {
        $ne: currentProductId,
      },

      isPublished: true,
    })
      .limit(8)
      .sort("-createdAt");

};





module.exports = {
  createProductService,
  getProductsService,
  getSingleProductService,
  getRelatedProductsService,
};