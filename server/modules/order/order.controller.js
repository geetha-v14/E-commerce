const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");




const { createOrderService,
    getOrderDetailsService,
    getUserOrdersService,
    getAdminOrderDetailsService,
    cancelOrderService,
    getAllOrdersService,
    updateOrderStatusService
} = require("./order.service");

const createOrder = asyncHandler(async (req, res) => {

    const {
        addressId,
        paymentMethod,
    } = req.body;

    const order = await createOrderService({
        userId: req.user._id,
        addressId,
        paymentMethod,
        
    });

 
    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully"
        )
    );

});

const getUserOrders = asyncHandler(async (req, res) => {

    const orders = await getUserOrdersService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched"
        )
    );

});


const getAdminOrderDetails =
    asyncHandler(
        async (req, res) => {

            const order =
                await getAdminOrderDetailsService(
                    req.params.orderId
                );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    order,
                    "Order fetched"
                )
            );

        }
    );

const getOrderDetails = asyncHandler(async (req, res) => {

    const order = await getOrderDetailsService({
        userId: req.user._id,
        orderId: req.params.orderId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched"
        )
    );

});

const cancelOrder = asyncHandler(async (req, res) => {

    const order = await cancelOrderService({
        userId: req.user._id,

        orderId:
            req.params.orderId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order cancelled successfully"
        )
    );

});

const getAllOrders = asyncHandler(async (req, res) => {

    const {
        page,
        limit,
        status,
    } = req.query;

    const result = await getAllOrdersService({
        page,
        limit,
        status,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "All orders fetched"
        )
    );

});


const updateOrderStatus = asyncHandler(async (req, res) => {

        const { status } =
            req.body;

        const order =  await updateOrderStatusService({
                orderId:
                    req.params.orderId,

                status,
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                order,
                "Order status updated"
            )
        );

    });

module.exports = { createOrder, getUserOrders, getOrderDetails, cancelOrder , getAllOrders, 
    updateOrderStatus, getAdminOrderDetails};