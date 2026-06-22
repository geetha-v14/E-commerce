const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const Category = require("./category.model");

const cloudinary = require("../../config/cloudinary");

const {
  createCategoryService,
  getAllCategoriesService,
} = require("./category.service");


const createCategory = asyncHandler(async (req, res) => {

  const {
    name,
    description,
    position,
    parentCategory,
  } = req.body;


  if (!req.file) {

    throw new ApiError(
      400,
      "Category image is required"
    );

  }


  const existingCategory =
    await Category.findOne({ name });


  if (existingCategory) {

    throw new ApiError(
      400,
      "Category already exists"
    );

  }


  const uploadedImage =
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "megamart/categories",
      }
    );


  const category = await createCategoryService({

    name,

    description,

    position,

    parentCategory,

    image: {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    },

  });


  return res.status(201).json(

    new ApiResponse(
      201,
      category,
      "Category created successfully"
    )

  );

});


const getAllCategories = asyncHandler(async (req, res) => {

  const page =
    Number(req.query.page) || 1;

  const limit =
    Number(req.query.limit) || 10;

  const search =
    req.query.search || "";

  const sort =
    req.query.sort || "-createdAt";


  const data =
    await getAllCategoriesService({

      page,
      limit,
      search,
      sort,

    });


  return res.status(200).json(

    new ApiResponse(
      200,
      data,
      "Categories fetched"
    )

  );

});

const getCategoryById = asyncHandler(
  async (req, res) => {

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category fetched"
      )
    );
  });

const updateCategory = asyncHandler(async (req, res) => {

  const category =
    await Category.findById(
      req.params.id
    );

  if (!category) {

    throw new ApiError(
      404,
      "Category not found"
    );

  }

  const {
    name,
    description,
    position,
    isActive,
    parentCategory,
  } = req.body;


  // replace image

  if (req.file) {

    // delete old image

    await cloudinary.uploader.destroy(
      category.image.public_id
    );


    // upload new image

    const uploadedImage =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder:
            "megamart/categories",
        }
      );


    category.image = {
      url:
        uploadedImage.secure_url,

      public_id:
        uploadedImage.public_id,
    };

  }


  if (name !== undefined) {
    category.name = name;
  }

  if (description !== undefined) {
    category.description =
      description;
  }

  if (position !== undefined) {
    category.position = position;
  }

  if (parentCategory !== undefined) {
    category.parentCategory =
      parentCategory || null;
  }

  if (isActive !== undefined) {
    category.isActive = isActive === "true";
  }


  await category.save();


  return res.status(200).json(

    new ApiResponse(
      200,
      category,
      "Category updated successfully"
    )

  );

});

const deleteCategory = asyncHandler(async (req, res) => {

  const category =
    await Category.findById(
      req.params.id
    );

  if (!category) {

    throw new ApiError(
      404,
      "Category not found"
    );

  }


  // delete cloudinary image

  await cloudinary.uploader.destroy(
    category.image.public_id
  );


  await category.deleteOne();


  return res.status(200).json(

    new ApiResponse(
      200,
      null,
      "Category deleted successfully"
    )

  );

});

const toggleCategoryStatus = asyncHandler(async (req, res) => {

  const category =
    await Category.findById(
      req.params.id
    );

  if (!category) {

    throw new ApiError(
      404,
      "Category not found"
    );

  }


  category.isActive =
    !category.isActive;

  await category.save();


  return res.status(200).json(

    new ApiResponse(
      200,
      category,
      "Category status updated"
    )

  );

});

const getMainCategories = asyncHandler(async (req, res) => {

  const categories = await Category.find({

    parentCategory: null,

    isActive: true,

  }).sort({
    position: 1,
  });

  return res.status(200).json(

    new ApiResponse(
      200,
      categories,
      "Main categories fetched"
    )

  );

});


const getSubcategories = asyncHandler(async (req, res) => {

  const subcategories =
    await Category.find({

      parentCategory:
        req.params.parentId,

      isActive: true,

    }).sort({
      position: 1,
    });

  return res.status(200).json(

    new ApiResponse(
      200,
      subcategories,
      "Subcategories fetched"
    )

  );

});

const getCategoryBySlug =
  asyncHandler(async (req, res) => {

    const category =
      await Category.findOne({
        slug: req.params.slug,
      });

    if (!category) {

      throw new ApiError(
        404,
        "Category not found"
      );

    }

    return res.status(200).json(

      new ApiResponse(
        200,
        category,
        "Category fetched"
      )

    );

  });



module.exports = {
  createCategory,
  getCategoryBySlug,
  getMainCategories,
  getSubcategories,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  
};