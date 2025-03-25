import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";

configDotenv();
const app = express();

// ✅ Move CORS middleware to the top
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // ✅ Ensure JSON body parsing before routes

// ✅ Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("❌ ERROR:", error);
    process.exit(1);
  });

// ✅ Import Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";

// ✅ Use Routes (After CORS is set)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);

// ✅ Home Route (Test if the server is running)
app.get("/", (req, res) => {
  res.send("🔥 API is running...");
});
