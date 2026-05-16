const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const { addToCart, getCart, updateCartQuantity, removeCartItem, clearCart } = require("./cart.controller");

router.post(
    "/",
    authMiddleware,
    addToCart
);

router.get(
    "/",
    authMiddleware,
    getCart
);

router.put(
    "/",
    authMiddleware,
    updateCartQuantity
);

router.delete(
    "/item/:productId",
    authMiddleware,
    removeCartItem
);

router.delete(
    "/clear",
    authMiddleware,
    clearCart
);

module.exports = router;