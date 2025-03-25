import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      trim: true,
      maxlength: 500 // Limits review length
    },
    likes: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        comment: { type: String, maxlength: 300 },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
