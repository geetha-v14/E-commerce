const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const { getDashboardStatsService, } = require("./dashboard.service");

const getDashboardStats = asyncHandler(async (req, res) => {

    const stats =
        await getDashboardStatsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            stats,
            "Dashboard stats fetched"
        )
    );

});

module.exports = {
    getDashboardStats,
};