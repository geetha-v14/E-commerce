const express = require("express");

const router = express.Router();

const { createProduct, getProducts, updateProduct, getSingleProduct, addProductReview,
  getHomepageProducts, getRelatedProducts, getProductById,deleteProduct,
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

router.get(
  "/related/:categoryId/:productId",
  getRelatedProducts
);

router.post("/:id/reviews", authMiddleware, addProductReview);

router.get("/homepage", getHomepageProducts);

router.get("/:slug", getSingleProduct);

router.get(
  "/admin/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getProductById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteProduct
);



module.exports = router;