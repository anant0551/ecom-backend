
import mongoose, {Schema} from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  // image: { type: String }, // Store image URL
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
