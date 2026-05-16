const { body } =
  require("express-validator");

const createCategoryValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name required"),

];

module.exports = {
  createCategoryValidation,
};