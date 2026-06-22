const User = require("./user.model");

const Order = require("../order/order.model")

const asyncHandler = require("../../utils/asyncHandler");

const ApiError = require("../../utils/ApiError");

const ApiResponse = require("../../utils/ApiResponse");

const {
    getAllUsersService,
} = require("./user.service");

const addAddress = asyncHandler(async (req, res) => {

    const user = await User.findById(
        req.user._id
    );

    if (!user) {

        throw new ApiError(
            404,
            "User not found"
        );

    }

    // If new address is default
    if (req.body.isDefault) {

        user.addresses.forEach((address) => {
            address.isDefault = false;
        }
        );

    }

    user.addresses.push(req.body);

    await user.save();

    return res.status(201).json(
        new ApiResponse(
            201,
            user.addresses,
            "Address added successfully"
        )
    );

});

const getAddresses = asyncHandler(async (req, res) => {

    const user = await User.findById(
        req.user._id
    ).select("addresses");

    return res.status(200).json(
        new ApiResponse(
            200,
            user.addresses,
            "Addresses fetched"
        )
    );

});

const setDefaultAddress = asyncHandler(async (req, res) => {

    const user = await User.findById(
        req.user._id
    );

    user.addresses.forEach((address) => {

        address.isDefault = address._id.toString() === req.params.addressId;

    }
    );

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            user.addresses,
            "Default address updated"
        )
    );

});


const deleteAddress = asyncHandler(async (req, res) => {

    const user = await User.findById(
        req.user._id
    );

    user.addresses = user.addresses.filter((address) =>
        address._id.toString() !== req.params.addressId
    );

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            user.addresses,
            "Address deleted"
        )
    );

});
const getAllUsers = asyncHandler(
    async (req, res) => {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 10;

        const search =
            req.query.search || "";

        const result =
            await getAllUsersService({
                page,
                limit,
                search,
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Users fetched"
            )
        );

    }
);

const getUserById = asyncHandler(
    async (req, res) => {

        const user =
            await User.findById(
                req.params.id
            ).select(
                "-password -refreshToken"
            );

        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User fetched"
            )
        );

    }
);

const toggleUserBlock =
    asyncHandler(async (req, res) => {

        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {

            throw new ApiError(
                404,
                "User not found"
            );

        }

        user.isBlocked =
            !user.isBlocked;

        await user.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User status updated"
            )
        );

    });

const changeUserRole =
    asyncHandler(async (req, res) => {

        const role = req.body?.role;

        const user =
            await User.findById(
                req.params.id
            );


        if (!role) {
            throw new ApiError(
                400,
                "Role is required"
            );
        }

        if (!user) {

            throw new ApiError(
                404,
                "User not found"
            );

        }



        user.role = role;

        await user.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "Role updated"
            )
        );

    });

const getUserDetails =
    asyncHandler(async (req, res) => {

        const user =
            await User.findById(
                req.params.id
            )
                .populate(
                    "wishlist",
                    "title price images"
                );

        if (!user) {

            throw new ApiError(
                404,
                "User not found"
            );

        }

        const orders =
            await Order.find({
                user: user._id,

            })
                .sort({
                    createdAt: -1,
                });

                
        console.log("Orders found:", orders.length);
        console.log(orders);


        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    user,
                    orders,
                },
                "User fetched"
            )
        );

    });

module.exports = {
    addAddress,
    getAddresses,
    setDefaultAddress,
    deleteAddress,

    getAllUsers,
    getUserById,
    toggleUserBlock,
    changeUserRole,
    getUserDetails,
};