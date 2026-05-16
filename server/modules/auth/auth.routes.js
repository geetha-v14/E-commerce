const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
} = require("./auth.controller");

const validate =
  require("../../middleware/validateMiddleware");

const authMiddleware =
  require("../../middleware/authMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("./auth.validation");

const  authorizeRoles  =
  require("../../middleware/roleMiddleware");

router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.get(
  "/admin-test",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome admin",
    });
  }
);

router.post(
  "/refresh-token",
  refreshAccessToken
);

router.post(
  "/logout",
  authMiddleware,
  logoutUser
);

module.exports = router;