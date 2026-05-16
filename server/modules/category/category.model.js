const mongoose = require("mongoose");

const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "Category cannot exceed 50 chars",
      ],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
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

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

categorySchema.pre("save", function () {

  if (this.isModified("name")) {

    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });

  }

});

module.exports = mongoose.model(
  "Category",
  categorySchema
);