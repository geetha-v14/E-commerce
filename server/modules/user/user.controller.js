const User = require("./user.model");

const asyncHandler = require("../../utils/asyncHandler");

const ApiError = require("../../utils/ApiError");

const ApiResponse = require("../../utils/ApiResponse");

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

module.exports = {
  addAddress,
  getAddresses,
  setDefaultAddress,
  deleteAddress,
};