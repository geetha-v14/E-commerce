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
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const total =
      await Category.countDocuments(query);

    return {
      categories,
      total,
    };

};

module.exports = {
  createCategoryService,
  getAllCategoriesService,
};