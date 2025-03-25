import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    orderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order", 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true, 
      min: 0 // Ensures non-negative payment amount
    },
    paymentStatus: { 
      type: String, 
      enum: ["Success", "Failed", "Pending"], 
      default: "Pending" 
    },
    paymentMethod: { 
      type: String, 
      enum: ["Credit Card", "Debit Card", "PayPal", "UPI", "Net Banking", "Cash on Delivery"], 
      required: true 
    },
    transactionId: { 
      type: String, 
      unique: true, 
      sparse: true // Ensures uniqueness only if transactionId exists
    },
    failureReason: { 
      type: String, 
      default: null // Stores reason for failed transactions
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
