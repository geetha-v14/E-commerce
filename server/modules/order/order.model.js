const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Product",

            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },
    }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,
        },

        orderItems: [
            orderItemSchema,
        ],

        shippingAddress: {
            fullName: String,
            phone: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            pincode: String,
            country: String,
        },

        paymentMethod: {
            type: String,

            enum: [
                "COD",
                "RAZORPAY",
                "STRIPE",
            ],

            required: true,
        },

        paymentStatus: {
            type: String,

            enum: [
                "PENDING",
                "PAID",
                "FAILED",
            ],

            default: "PENDING",
        },

        orderStatus: {
            type: String,

            enum: [
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
            ],

            default: "PROCESSING",
        },

        subtotal: {
            type: Number,
            required: true,
        },

        shippingCharge: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        orderNumber: {
            type: String,
            unique: true,
        },

        razorpayOrderId: String,

        razorpayPaymentId: String,

        razorpaySignature: String,

        paidAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);