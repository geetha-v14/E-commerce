import Banner from "../models/Banner.js";

export const getBanners = async (
  req,
  res
) => {
  try {
    const banners = await Banner.find({
      status: true,
    });

    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};