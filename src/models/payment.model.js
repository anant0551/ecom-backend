import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Success", "Failed", "Pending"], default: "Pending" },
  paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "UPI"], required: true },
}, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);
