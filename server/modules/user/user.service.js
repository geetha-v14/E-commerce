const User = require("./user.model");

const getAllUsersService = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {

  const query = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total =
    await User.countDocuments(query);

  return {
    users,
    total,
    currentPage: page,
    totalPages: Math.ceil(
      total / limit
    ),
  };
};

module.exports = {
  getAllUsersService,
};