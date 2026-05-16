const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const { createRazorpayOrderService, verifyPaymentService, } = require("./payment.service");

const createRazorpayOrder = asyncHandler(async (req, res) => {

    const { orderId } = req.body;

    const razorpayOrder = await createRazorpayOrderService(orderId);

    return res.status(200).json(
        new ApiResponse(
            200,
            razorpayOrder,
            "Razorpay order created"
        )
    );

});

const verifyPayment = asyncHandler(async (req, res) => {

    const order = await verifyPaymentService(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Payment verified successfully"
        )
    );

});

module.exports = {
    createRazorpayOrder,
    verifyPayment,
};