const Banner =
    require("./banner.model");

const cloudinary =
    require("../../config/cloudinary");

const asyncHandler =
    require("../../utils/asyncHandler");

const ApiResponse =
    require("../../utils/ApiResponse");

const ApiError =
    require("../../utils/ApiError");


const createBanner = asyncHandler(
    async (req, res) => {

        const {
            title,
            subtitle,
            link,
            position,
        } = req.body;


        if (!req.file) {

            throw new ApiError(
                400,
                "Banner image required"
            );

        }


        // upload image to cloudinary

        const result =
            await cloudinary.uploader.upload(

                req.file.path,

                {
                    folder:
                        "megamart/banners",
                }

            );


        const banner =
            await Banner.create({

                title,

                subtitle,

                link,

                position,

                image: {

                    url: result.secure_url,

                    public_id:
                        result.public_id,

                },

            });


        res.status(201).json(

            new ApiResponse(
                201,
                banner,
                "Banner created successfully"
            )

        );

    });

const getBanners = asyncHandler(async (req, res) => {

    const banners =
        await Banner.find({
            isActive: true,
        })
            .sort({
                position: 1,
                createdAt: -1,
            });


    res.status(200).json(

        new ApiResponse(
            200,
            banners,
            "Banners fetched successfully"
        )

    );

});

const updateBanner =  asyncHandler(    async (req, res) => {

            const banner =
                await Banner.findById(
                    req.params.id
                );


            if (!banner) {

                throw new ApiError(
                    404,
                    "Banner not found"
                );

            }


            const {
                title,
                subtitle,
                link,
                position,
                isActive,
            } = req.body;


            // replace image if uploaded

            if (req.file) {

                // delete old image

                await cloudinary.uploader.destroy(
                    banner.image.public_id
                );


                // upload new image

                const uploadedImage =
                    await cloudinary.uploader.upload(

                        req.file.path,

                        {
                            folder:
                                "megamart/banners",
                        }

                    );


                banner.image = {

                    url:
                        uploadedImage.secure_url,

                    public_id:
                        uploadedImage.public_id,

                };

            }


            if (title !== undefined) {
                banner.title = title;
            }

            if (subtitle !== undefined) {
                banner.subtitle = subtitle;
            }

            if (link !== undefined) {
                banner.link = link;
            }

            if (position !== undefined) {
                banner.position = position;
            }

            if (isActive !== undefined) {
                banner.isActive = isActive;
            }


            await banner.save();


            res.status(200).json(

                new ApiResponse(
                    200,
                    banner,
                    "Banner updated successfully"
                )

            );

        });

const deleteBanner = asyncHandler(
    async (req, res) => {

      const banner =
        await Banner.findById(
          req.params.id
        );


      if (!banner) {

        throw new ApiError(
          404,
          "Banner not found"
        );

      }


      // delete cloudinary image

      await cloudinary.uploader.destroy(
        banner.image.public_id
      );


      await banner.deleteOne();


      res.status(200).json(

        new ApiResponse(
          200,
          null,
          "Banner deleted successfully"
        )

      );

});

const toggleBannerStatus = asyncHandler(
    async (req, res) => {

      const banner =
        await Banner.findById(
          req.params.id
        );


      if (!banner) {

        throw new ApiError(
          404,
          "Banner not found"
        );

      }


      banner.isActive =
        !banner.isActive;

      await banner.save();


      res.status(200).json(

        new ApiResponse(
          200,
          banner,
          "Banner status updated"
        )

      );

});
module.exports = { createBanner ,
    getBanners,
    updateBanner,
    deleteBanner,
    toggleBannerStatus
}