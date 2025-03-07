import Razorpay from "razorpay"
import { configDotenv } from "dotenv";
configDotenv();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Process Payment
const processPayment = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Razorpay works in paisa (1 INR = 100 paisa)
      currency,
      receipt, // Unique order ID
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Verify Payment Status
const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await razorpay.payments.fetch(paymentId);
    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default{ processPayment, verifyPayment };