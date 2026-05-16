const Order = require("./order.model");

const Cart = require("../cart/Cart.model");

const Product = require("../product/product.model");

const User = require("../user/user.model");

const createOrderService =
    async ({
        userId,
        addressId,
        paymentMethod,

    }) => {

        const user = await User.findById(userId);

        if (!user) {

            throw new Error(
                "User not found"
            );

        }

        const cart =
            await Cart.findOne({
                user: userId,
            }).populate(
                "items.product"
            );

        if (
            !cart ||
            cart.items.length === 0
        ) {

            throw new Error(
                "Cart is empty"
            );

        }

        const selectedAddress = user.addresses.id(
            addressId
        );

        if (!selectedAddress) {

            throw new Error(
                "Address not found"
            );

        }

        let subtotal = 0;

        const orderItems = [];

        // Validate stock + prepare snapshot
        for (const item of cart.items) {

            const product = item.product;

            if (product.stock < item.quantity) {

                throw new Error(
                    `${product.title} out of stock`
                );

            }

            subtotal += item.price * item.quantity;

            orderItems.push({
                product: product._id,

                title: product.title,

                image:
                    product.images?.[0]
                        ?.url || "",

                price: item.price,

                quantity:
                    item.quantity,
            });

        }

        // Shipping logic
        const shippingCharge = subtotal > 500 ? 0 : 50;

        const tax = Number((subtotal * 0.18).toFixed(2));

        const totalAmount =
            subtotal +
            shippingCharge +
            tax;

        // Create order
        const order = await Order.create({
            user: userId,

            orderItems,

            shippingAddress:
                selectedAddress.toObject(),

            paymentMethod,

            subtotal,

            shippingCharge,

            tax,

            totalAmount,

            orderNumber:
                `ORD-${Date.now()}`,
        });

        for (const item of orderItems) {

            await Product.findByIdAndUpdate(

                item.product,

                {

                    $inc: {

                        stock: -item.quantity,

                        soldCount: item.quantity,

                    },

                }

            );

        }

        // Reduce stock
        // for (const item of cart.items) {

        //     await Product.findByIdAndUpdate(
        //         item.product._id,
        //         {
        //             $inc: {
        //                 stock: -item.quantity,
        //             },
        //         }
        //     );

        // }

        // Clear cart
        cart.items = [];

        await cart.save();

        return order;

    };

const getUserOrdersService = async (userId) => {

    const orders =
        await Order.find({
            user: userId,
        })
            .sort({
                createdAt: -1,
            });

    return orders;

};

const getOrderDetailsService = async ({ userId, orderId, }) => {

    const order =
        await Order.findOne({
            _id: orderId,
            user: userId,
        });

    if (!order) {

        throw new Error(
            "Order not found"
        );

    }

    return order;

};

const cancelOrderService = async ({
    userId,
    orderId,
}) => {

    const order =
        await Order.findOne({
            _id: orderId,
            user: userId,
        });

    if (!order) {

        throw new Error(
            "Order not found"
        );

    }

    // Only processing orders can be cancelled
    if (
        order.orderStatus !==
        "PROCESSING"
    ) {

        throw new Error(
            "Order cannot be cancelled"
        );

    }

    // Restore stock
    for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product,
            {
                $inc: {
                    stock: item.quantity,
                    soldCount: -item.quantity,
                },
            }
        );

    }

    order.orderStatus = "CANCELLED";

    await order.save();

    return order;

};

const getAllOrdersService = async ({
    page = 1,
    limit = 10,
    status,
}) => {

    const query = {};

    if (status) {

        query.orderStatus =
            status;

    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
        .populate(
            "user",
            "name email"
        )
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const totalOrders =
        await Order.countDocuments(
            query
        );

    return {
        orders,
        totalOrders,
        currentPage: Number(page),
        totalPages: Math.ceil(totalOrders / limit),
    };

};

const updateOrderStatusService = async ({
    orderId,
    status,
}) => {

    const order = await Order.findById(orderId);

    if (!order) {

        throw new Error(
            "Order not found"
        );

    }

    order.orderStatus = status;

    // Auto mark delivered
    if (
        status === "DELIVERED"
    ) {

        order.deliveredAt = new Date();

    }

    await order.save();

    return order;

};

module.exports = {
    createOrderService,
    getUserOrdersService,
    getOrderDetailsService,
    cancelOrderService,
    getAllOrdersService,
    updateOrderStatusService,
}