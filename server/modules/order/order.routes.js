const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const roleMiddleware = require("../../middleware/roleMiddleware")

const { createOrder, getUserOrders, getOrderDetails, cancelOrder,
    getAllOrders, updateOrderStatus, getAdminOrderDetails} = require("./order.controller");

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
    "/admin/all",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOrders
);

router.get(
    "/admin/:orderId",
    authMiddleware,
    roleMiddleware("admin"),
    getAdminOrderDetails
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

router.patch(
    "/admin/:orderId/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateOrderStatus
);

module.exports = router;