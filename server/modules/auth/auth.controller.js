const jwt = require("jsonwebtoken");

const User = require("../user/user.model");

const asyncHandler = require("../../utils/asyncHandler");

const ApiError =
    require("../../utils/ApiError");

const ApiResponse =
    require("../../utils/ApiResponse");

const {
    generateAccessToken,
    generateRefreshToken,
} = require("../../utils/generateTokens");

const cookieOptions =
  require("../../constants/cookieOptions");

const registerUser = asyncHandler(
    async (req, res) => {

        const { name, email, password } =
            req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(
                400,
                "User already exists"
            );
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const accessToken =
            generateAccessToken(user._id);

        const refreshToken =
            generateRefreshToken(user._id);

        user.refreshToken = refreshToken;

        await user.save();

        const createdUser =
            await User.findById(user._id)
                .select("-password -refreshToken");

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                },
                "User registered successfully"
            )
        );

    }
);

const loginUser = asyncHandler(
    async (req, res) => {

        const { email, password } =
            req.body;

        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            );
        }

        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new ApiError(
                401,
                "Invalid credentials"
            );
        }

        const accessToken =
            generateAccessToken(user._id);

        const refreshToken =
            generateRefreshToken(user._id);

        user.refreshToken = refreshToken;

        user.lastLogin = new Date();

        await user.save();

        const loggedInUser =
            await User.findById(user._id)
                .select("-password -refreshToken");

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                },
                "Login successful"
            )
        );

    }
);

const getCurrentUser = asyncHandler(
    async (req, res) => {

        return res.status(200).json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched"
            )
        );

    }
);
const refreshAccessToken =
  asyncHandler(async (req, res) => {

    const incomingRefreshToken =
      req.cookies.refreshToken;

    if (!incomingRefreshToken) {

      throw new ApiError(
        401,
        "Refresh token missing"
      );

    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {

      throw new ApiError(
        401,
        "Invalid refresh token"
      );

    }

    if (
      incomingRefreshToken !==
      user.refreshToken
    ) {

      throw new ApiError(
        401,
        "Refresh token expired"
      );

    }

    const newAccessToken =
      generateAccessToken(user._id);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          accessToken: newAccessToken,
        },
        "Access token refreshed"
      )
    );

});

const logoutUser = asyncHandler(
  async (req, res) => {

    const user = await User.findById(
      req.user._id
    );

    user.refreshToken = "";

    await user.save();

    res.clearCookie(
      "refreshToken",
      cookieOptions
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Logged out successfully"
      )
    );

});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshAccessToken,
    logoutUser,
};