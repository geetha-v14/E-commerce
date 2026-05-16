const Cart = require("./Cart.model");

const Product = require("../product/product.model");

const addToCartService =
    async ({
        userId,
        productId,
        quantity,
    }) => {

        const product = await Product.findById(productId);

        if (!product) {

            throw new Error(
                "Product not found"
            );

        }

        if (product.stock < quantity) {

            throw new Error(
                "Insufficient stock"
            );

        }

        let cart =
            await Cart.findOne({
                user: userId,
            });

        // Create cart if not exists
        if (!cart) {

            cart = await Cart.create({
                user: userId,
                items: [],
            });

        }

        const existingItem =
            cart.items.find((item) =>
                item.product.toString() === productId
            );

        // Update quantity if already exists
        if (existingItem) {

            const totalQuantity = existingItem.quantity + quantity;

            if (totalQuantity > product.stock) {

                throw new Error(
                    `Only ${product.stock} items available`
                );

            }

            existingItem.quantity = totalQuantity;

        } else {

            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                price: product.discountPrice || product.price,
            });

        }

        await cart.save();

        return cart;

    };


const updateCartQuantityService =
    async ({
        userId,
        productId,
        quantity,
    }) => {

        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {

            throw new Error(
                "Cart not found"
            );

        }

        const item = cart.items.find(
            (item) =>
                item.product.toString() ===
                productId
        );

        if (!item) {

            throw new Error(
                "Cart item not found"
            );

        }

        const product =
            await Product.findById(
                productId
            );

        if (!product) {

            throw new Error(
                "Product not found"
            );

        }

        if (quantity > product.stock) {

            throw new Error(
                `Only ${product.stock} items available`
            );

        }

        item.quantity = quantity;

        await cart.save();

        return cart;

    };

const removeCartItemService = async ({
    userId,
    productId,
}) => {

    const cart = await Cart.findOne({
        user: userId,
    });

    if (!cart) {

        throw new Error(
            "Cart not found"
        );

    }

    cart.items = cart.items.filter((item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    return cart;

};

const clearCartService = async (userId) => {

    const cart = await Cart.findOne({
        user: userId,
      });

    if (!cart) {

      throw new Error(
        "Cart not found"
      );

    }

    cart.items = [];

    await cart.save();

    return cart;

};

module.exports = { addToCartService, updateCartQuantityService, removeCartItemService, clearCartService, }