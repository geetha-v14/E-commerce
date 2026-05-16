const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const roleMiddleware = require("../../middleware/roleMiddleware");

const { getDashboardStats, } = require("./dashboard.controller");

router.get(
    "/stats",
    authMiddleware,
    roleMiddleware("admin"),
    getDashboardStats
);

module.exports = router;