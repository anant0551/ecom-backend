import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category Model
    stock: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] }, // Array of image URLs
    rating: { type: Number, default: 0, min: 0, max: 5 }, // Product rating (0-5)
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
        name: { type: String },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
