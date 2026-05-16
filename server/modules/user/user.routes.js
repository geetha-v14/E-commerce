const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const {
    addAddress,
    getAddresses,
    setDefaultAddress,
    deleteAddress,
} = require("./user.controller");

router.post(
    "/addresses",
    authMiddleware,
    addAddress
);

router.get(
    "/addresses",
    authMiddleware,
    getAddresses
);

router.patch(
    "/addresses/:addressId/default",
    authMiddleware,
    setDefaultAddress
);

router.delete(
    "/addresses/:addressId",
    authMiddleware,
    deleteAddress
);

module.exports = router;