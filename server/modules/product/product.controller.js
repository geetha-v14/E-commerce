const asyncHandler = require("../../utils/asyncHandler");

const ApiError = require("../../utils/ApiError");

const ApiResponse = require("../../utils/ApiResponse");

const Product = require("./product.model");

const Category = require("../category/category.model");

const { createProductService, getProductsService, getSingleProductService, getRelatedProductsService, } = require("./product.service");

const buildProductQuery = require("./product.query");

const uploadToCloudinary = require("../../utils/cloudinaryUpload");

const deleteFromCloudinary = require("../../utils/cloudinaryDelete");

const calculateDiscount = require("../../utils/calculateDiscount");



const createProduct = asyncHandler(async (req, res) => {

  const {
    title,
    description,
    category,
    price,
    stock,
    brand,
    salePrice,
    featured,
  } = req.body;

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {

    throw new ApiError(
      404,
      "Category not found"
    );

  }

  if (
    salePrice &&
    Number(salePrice) >= Number(price)
  ) {

    throw new ApiError(
      400,
      "Sale price must be less than price"
    );

  }


  const uploadedImages = [];

  if (req.files?.length > 0) {

    for (const file of req.files) {

      const uploaded =
        await uploadToCloudinary(
          file.buffer,
          "megamart/products"
        );

      uploadedImages.push({
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      });

    }

  }

  const discountPercentage =
    calculateDiscount(
      Number(price),
      Number(salePrice || 0)
    );


  const product = await createProductService({
    title,
    description,
    category,
    brand,
    price: Number(price),

    stock: Number(stock),

    salePrice: Number(salePrice || 0),

    discountPercentage,

    featured: featured === "true",

    images: uploadedImages,
  });


  return res.status(201).json(
    new ApiResponse(
      201,
      product,
      "Product created successfully"
    )
  );

});

const getProducts = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const sort = req.query.sort || "-createdAt";

  const filters = buildProductQuery(req.query);

  if (req.query.category) {

  const category =
    await Category.findOne({
      slug: req.query.category,
    });

  if (category) {

    filters.category =
      category._id;

  }

}

if (req.query.subcategory) {

  const subcategory =
    await Category.findOne({
      slug: req.query.subcategory,
    });

  if (subcategory) {

    filters.category =
      subcategory._id;

  }

}

  const data = await getProductsService({
    filters,
    page,
    limit,
    sort,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      data,
      "Products fetched"
    )
  );

});



const updateProduct = asyncHandler(async (req, res) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {

    throw new ApiError(
      404,
      "Product not found"
    );

  }



  let updatedImages = product.images;


  if (req.files?.length > 0) {

    // delete old cloudinary images
    for (const image of product.images) {

      await deleteFromCloudinary(
        image.public_id
      );

    }

    updatedImages = [];

    // upload new images
    for (const file of req.files) {

      const uploaded = await uploadToCloudinary(
        file.buffer,
        "megamart/products"
      );

      updatedImages.push({
        url: uploaded.secure_url,
        public_id:
          uploaded.public_id,
      });

    }

  }

  const updatedData = {
    ...req.body,
  };

  if (req.body.price) {
    updatedData.price =
      Number(req.body.price);
  }

  if (req.body.salePrice) {
    updatedData.salePrice =
      Number(req.body.salePrice);
  }

  if (req.body.stock) {
    updatedData.stock =
      Number(req.body.stock);
  }

  if (req.body.featured !== undefined) {
    updatedData.featured =
      req.body.featured === "true";
  }

  const finalPrice = updatedData.price || product.price;

  const finalSalePrice = updatedData.salePrice || product.salePrice;

  if (
    finalSalePrice &&
    finalSalePrice >= finalPrice
  ) {

    throw new ApiError(
      400,
      "Sale price must be less than price"
    );

  }

  updatedData.discountPercentage = calculateDiscount(
      finalPrice,
      finalSalePrice
    );

  const updatedProduct =
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...updatedData,
        images: updatedImages,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );



  return res.status(200).json(
    new ApiResponse(
      200,
      updatedProduct,
      "Product updated successfully"
    )
  );

});

const getSingleProduct = asyncHandler(async (req, res) => {

  const product = await getSingleProductService(
    req.params.slug
  );

  if (!product) {

    throw new ApiError(
      404,
      "Product not found"
    );

  }

  const relatedProducts = await getRelatedProductsService({

    categoryId: product.category._id,

    currentProductId: product._id,

  });

  return res.status(200).json(new ApiResponse(200,
    {
      product,
      relatedProducts,
    },
    "Product fetched successfully"
  )
  );

});

const addProductReview = asyncHandler(async (req, res) => {

  const {
    rating,
    comment,
  } = req.body;

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {

    throw new ApiError(
      404,
      "Product not found"
    );

  }

  const alreadyReviewed =
    product.reviews.find(
      (review) =>
        review.user.toString() ===
        req.user._id.toString()
    );

  // Update existing review
  if (alreadyReviewed) {

    alreadyReviewed.rating =
      Number(rating);

    alreadyReviewed.comment =
      comment;

  } else {

    // Add new review
    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });

  }

  // Calculate ratings
  product.numReviews = product.reviews.length;

  const avgRating = product.reviews.reduce(
    (acc, item) =>
      item.rating + acc,
    0
  ) / product.reviews.length;

  product.ratings = Number(avgRating.toFixed(1));

  await product.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Review added successfully"
    )
  );

});


const getHomepageProducts = asyncHandler(async (req, res) => {

  const featuredProducts = await Product.find({
    featured: true,
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  const topDeals = await Product.find({
    salePrice: { $gt: 0 },
    isPublished: true,
  })
    .sort({
      discountPercentage: -1,
    })
    .limit(10);

  const trendingProducts = await Product.find({
    isPublished: true,
  })
    .sort({
      soldCount: -1,
    })
    .limit(10);

  const newArrivals = await Product.find({
    isPublished: true,
  })
    .sort({
      createdAt: -1,
    })
    .limit(10);

  return res.status(200).json(

    new ApiResponse(
      200,
      {
        featuredProducts,
        topDeals,
        trendingProducts,
        newArrivals,
      },
      "Homepage products fetched"
    )

  );

});


module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  getSingleProduct,
  addProductReview,
  getHomepageProducts,
};