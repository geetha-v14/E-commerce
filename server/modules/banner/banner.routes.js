const express =
  require("express");

const router =
  express.Router();

const {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} = require(
  "./banner.controller"
);

const {
  createBannerValidation,
} = require(
  "./banner.validation"
);

const validate =
  require(
    "../../middleware/validateMiddleware"
);

const upload =
  require(
    "../../middleware/uploadMiddleware"
);

const authMiddleware =
  require(
    "../../middleware/authMiddleware"
);

const roleMiddleware =
  require(
    "../../middleware/roleMiddleware"
);



router.get(
  "/",
  getBanners
);


router.post(

  "/",

  authMiddleware,

  roleMiddleware("admin"),

  upload.single("image"),

  createBannerValidation,

  validate,

  createBanner

);


router.put(

  "/:id",

  authMiddleware,

  roleMiddleware("admin"),

  upload.single("image"),

  updateBanner

);


router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware("admin"),

  deleteBanner

);

router.patch(

  "/:id/toggle",

  authMiddleware,

  roleMiddleware("admin"),

  toggleBannerStatus

);


module.exports =
  router;