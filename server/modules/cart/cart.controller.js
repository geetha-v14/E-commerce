const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const ApiError = require("../../utils/ApiError");

const Cart = require("./Cart.model");

const { addToCartService, updateCartQuantityService, removeCartItemService, clearCartService, } = require("./cart.service");

const addToCart = asyncHandler(async (req, res) => {

    const { productId, quantity, } = req.body;

    if (!productId || !quantity) {

        throw new ApiError(
            400,
            "Product and quantity required"
        );

    }

    const cart = await addToCartService({
        userId: req.user._id,
        productId,
        quantity: Number(quantity),
    });

    return res.status(200).json(new ApiResponse(200,
        cart,
        "Item added to cart"
    )
    );

});


const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate({
        path: "items.product",

        select:
            "title slug images price stock",
    });

    if (!cart) {

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    items: [],
                },
                "Cart is empty"
            )
        );

    }

    // Calculate totals
    const subtotal = cart.items.reduce((acc, item) =>
        acc +
        item.price * item.quantity,
        0
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                cart,
                subtotal,
            },
            "Cart fetched"
        )
    );

});

const updateCartQuantity = asyncHandler(async (req, res) => {

    const {
        productId,
        quantity,
    } = req.body;

    const cart = await updateCartQuantityService({
        userId: req.user._id,
        productId,
        quantity: Number(quantity),
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart updated"
        )
    );

});

const removeCartItem = asyncHandler(async (req, res) => {

    const cart = await removeCartItemService({
        userId: req.user._id,
        productId: req.params.productId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                cart,
                subtotal: 0,
            },

            "Item removed from cart"
        )
    );

});

const clearCart = asyncHandler(async (req, res) => {

    const cart = await clearCartService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                cart,
                subtotal: 0,
            },
            "Cart cleared"
        )
    );

});

module.exports = { addToCart, getCart, updateCartQuantity, removeCartItem, clearCart, };