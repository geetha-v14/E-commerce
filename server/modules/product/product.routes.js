const express = require("express");

const router = express.Router();

const { createProduct, getProducts, updateProduct, getSingleProduct, addProductReview,
  getHomepageProducts,
} = require("./product.controller");

const authMiddleware = require("../../middleware/authMiddleware");

const authorizeRoles = require("../../middleware/roleMiddleware");

const validate = require("../../middleware/validateMiddleware");

const { createProductValidation, } = require("./product.validation");

const upload = require("../../middleware/uploadMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("images", 5),
  createProductValidation,
  validate,
  createProduct,


);

router.get("/", getProducts);

router.post("/:id/reviews", authMiddleware, addProductReview);

router.get("/homepage",getHomepageProducts);

router.get("/:slug", getSingleProduct);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("images", 5),
  updateProduct
);



module.exports = router;