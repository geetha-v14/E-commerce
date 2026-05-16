const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const roleMiddleware = require("../../middleware/roleMiddleware")

const { createOrder, getUserOrders, getOrderDetails, cancelOrder, getAllOrders, updateOrderStatus } = require("./order.controller");

router.post(
    "/",
    authMiddleware,
    createOrder
);

router.get(
    "/my-orders",
    authMiddleware,
    getUserOrders
);

router.get(
    "/:orderId",
    authMiddleware,
    getOrderDetails
);

router.patch(
    "/:orderId/cancel",
    authMiddleware,
    cancelOrder
);

router.get(
    "/admin/all",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOrders
);

router.patch(
    "/admin/:orderId/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateOrderStatus
);

module.exports = router;