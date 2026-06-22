const express = require("express");

const router = express.Router();

const { createCategory, getAllCategories, updateCategory, deleteCategory, toggleCategoryStatus,
  getMainCategories, getSubcategories, getCategoryBySlug, getCategoryById,
} = require("./category.controller");

const authMiddleware = require("../../middleware/authMiddleware");

const authorizeRoles = require("../../middleware/roleMiddleware");

const validate = require("../../middleware/validateMiddleware");

const { createCategoryValidation, } = require("./category.validation");

const upload = require("../../middleware/uploadMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("image"),
  createCategoryValidation,
  validate,
  createCategory
);

router.get(
  "/slug/:slug",
  getCategoryBySlug
);



router.get(
  "/main",
  getMainCategories
);

router.get(
  "/subcategories/:parentId",
  getSubcategories
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getCategoryById
);

router.get(
  "/",
  getAllCategories
);


router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("image"),
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteCategory
);

router.patch(
  "/:id/toggle",
  authMiddleware,
  authorizeRoles("admin"),
  toggleCategoryStatus
);

module.exports = router;