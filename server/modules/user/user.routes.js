const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const roleMiddleware = require("../../middleware/roleMiddleware");

const { getAllUsers, toggleUserBlock, getUserById, changeUserRole, getUserDetails } = require("./user.controller");

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

router.get(
    "/admin/all",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers
);

router.get(
    "/admin/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getUserById
);
router.get(
    "/admin/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getUserDetails
);
router.patch(
    "/admin/:id/block",
    authMiddleware,
    roleMiddleware("admin"),
    toggleUserBlock
);

router.patch(
    "/admin/:id/role",
    authMiddleware,
    roleMiddleware("admin"),
    changeUserRole
);



module.exports = router;