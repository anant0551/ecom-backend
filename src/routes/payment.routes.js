import express from "express"
import { processPayment, verifyPayment } from "../controllers/payment.controller.js"
import { authenticateUser } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/process", authenticateUser, processPayment);
router.get("/verify/:paymentId", authenticateUser, verifyPayment); // Fixed method & added paymentId param

export default router;
