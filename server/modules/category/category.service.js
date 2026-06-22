const Category = require("./category.model");

const createCategoryService = async (data) => {

  const category = await Category.create(data);

  return category;

};

const getAllCategoriesService =
  async ({
    page,
    limit,
    search,
    sort,
  }) => {

    const query = {};

    if (search) {

      query.name = {
        $regex: search,
        $options: "i",
      };

    }

    const categories =
      await Category.find(query)
        .populate("parentCategory", "name")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const total =
      await Category.countDocuments(query);

    const mainCategories =
      await Category.countDocuments({
        parentCategory: null,
      });

    const subcategories =
      await Category.countDocuments({
        parentCategory: {
          $ne: null,
        },
      });


    return {
      categories,
      total,
      mainCategories,
      subcategories,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };


    

  };

module.exports = {
  createCategoryService,
  getAllCategoriesService,
};