const mongoose =
  require("mongoose");


const bannerSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    image: {

      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },

    },

    link: {
      type: String,
      default: "/",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    position: {
      type: Number,
      default: 0,
    },

  },

  {
    timestamps: true,
  }

);


module.exports =
  mongoose.model(
    "Banner",
    bannerSchema
);