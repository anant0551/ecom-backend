import paymentService from "../services/payment.service.js"

// Controller for processing payment
export const processPayment = async (req, res) => {
  try {
    const response = await paymentService.processPayment(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller for verifying payment status
export const verifyPayment = async (req, res) => {
  try {
    const response = await paymentService.verifyPayment(req, res);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
