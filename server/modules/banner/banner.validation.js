const {
  body,
} = require(
  "express-validator"
);


const createBannerValidation = [

  body("title")
    .notEmpty()
    .withMessage(
      "Title is required"
    ),

];

module.exports={createBannerValidation};