const { body } = require("express-validator");

const createProductValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title required"),

  body("description")
    .notEmpty()
    .withMessage("Description required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be number"),

  body("category")
    .notEmpty()
    .withMessage("Category required"),

];

module.exports = {
  createProductValidation,
};