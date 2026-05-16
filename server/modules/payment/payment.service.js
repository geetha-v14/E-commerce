const Order = require("../order/order.model");

const crypto = require("crypto");

const razorpayInstance = require("../../config/razorpay");

const createRazorpayOrderService = async (orderId) => {

    const order =
        await Order.findById(
            orderId
        );

    if (!order) {

        throw new Error(
            "Order not found"
        );

    }

    const options = {

        amount:
            Math.round(
                order.totalAmount * 100
            ),

        currency: "INR",

        receipt:
            order.orderNumber,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    return razorpayOrder;

};

const verifyPaymentService =
    async ({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    }) => {

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",

                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(razorpay_order_id + "|" + razorpay_payment_id)
                .digest("hex");

        if (
            generatedSignature !== razorpay_signature
        ) {

            throw new Error(
                "Invalid payment signature"
            );

        }

        const order = await Order.findOne({
            razorpayOrderId:
                razorpay_order_id,
        });

        if (!order) {

            throw new Error(
                "Order not found"
            );

        }

        order.paymentStatus = "PAID";

        order.razorpayPaymentId = razorpay_payment_id;

        order.razorpaySignature = razorpay_signature;

        order.paidAt = new Date();

        await order.save();

        return order;

    };

module.exports = {
    createRazorpayOrderService,
    verifyPaymentService,
};