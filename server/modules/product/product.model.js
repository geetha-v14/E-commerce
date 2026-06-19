const mongoose = require("mongoose");

const slugify = require("slugify");

const variantSchema = new mongoose.Schema(
  {
    size: String,

    material: String,

    color: String,

    stock: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);


const reviewSchema = new mongoose.Schema(
  {
    user: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title required"],
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    brand: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",

    },

    categorySlug: {
      type: String,
      lowercase: true,
    },

    subcategorySlug: {
      type: String,
      lowercase: true,
    },

    images: [
      {
        url: String,
        public_id: String,
        _id: false,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      default: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    variants: [variantSchema],

    ratings: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    numReviews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    tags: [String],

    seoTitle: String,

    seoDescription: String,
  },
  {
    timestamps: true,
  }
);




productSchema.pre("save", function () {

  if (this.isModified("title")) {

    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });

  }

});

module.exports = mongoose.model(
  "Product",
  productSchema
);