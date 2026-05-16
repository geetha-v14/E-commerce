const Order = require("../order/order.model");

const User = require("../user/user.model");

const Product = require("../product/product.model");

const getDashboardStatsService = async () => {

    // Total Revenue
    const revenueResult =
        await Order.aggregate([
            {
                $match: {
                    orderStatus: {
                        $ne: "CANCELLED",
                    },
                },
            },

            {
                $group: {
                    _id: null,

                    totalRevenue: {
                        $sum:
                            "$totalAmount",
                    },
                },
            },
        ]);

    const totalRevenue =
        revenueResult[0]
            ?.totalRevenue || 0;

    // Counts
    const totalOrders =
        await Order.countDocuments();

    const totalUsers =
        await User.countDocuments();

    const totalProducts =
        await Product.countDocuments();

    // Recent Orders
    const recentOrders =
        await Order.find()
            .populate(
                "user",
                "name email"
            )
            .sort({
                createdAt: -1,
            })
            .limit(5);

    // Monthly Sales
    const monthlySales =
        await Order.aggregate([
            {
                $match: {
                    orderStatus: {
                        $ne: "CANCELLED",
                    },
                },
            },

            {
                $group: {
                    _id: {
                        month: {
                            $month:
                                "$createdAt",
                        },

                        year: {
                            $year:
                                "$createdAt",
                        },
                    },

                    revenue: {
                        $sum:
                            "$totalAmount",
                    },

                    orders: {
                        $sum: 1,
                    },
                },
            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

    // Order Status Counts
    const orderStatuses =
        await Order.aggregate([
            {
                $group: {
                    _id:
                        "$orderStatus",

                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

    //Top selling
    const topProducts = await Order.aggregate([

        {
            $match: {
                orderStatus: {
                    $ne: "CANCELLED",
                },
            },
        },

        {
            $unwind:
                "$orderItems",
        },

        {
            $group: {

                _id:
                    "$orderItems.product",

                totalSold: {
                    $sum:
                        "$orderItems.quantity",
                },

                title: {
                    $first:
                        "$orderItems.title",
                },

                image: {
                    $first:
                        "$orderItems.image",
                },
            },
        },

        {
            $sort: {
                totalSold: -1,
            },
        },

        {
            $limit: 5,
        },
    ]);

    return {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts,
        recentOrders,
        monthlySales,
        orderStatuses,
        topProducts
    };

};


module.exports = {
    getDashboardStatsService,
};