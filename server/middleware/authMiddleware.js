const jwt = require("jsonwebtoken");

const User = require("../modules/user/user.model");

const asyncHandler =
  require("../utils/asyncHandler");

const ApiError =
  require("../utils/ApiError");

const authMiddleware = asyncHandler(
  async (req, res, next) => {

    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(
        401,
        "Unauthorized access"
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(
        401,
        "User not found"
      );
    }

    req.user = user;

    next();

  }
);

module.exports = authMiddleware;