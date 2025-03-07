
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Role-based Access Control (Admin, User)
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
