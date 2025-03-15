import {configDotenv} from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import express from 'express'; // Import express from 'express' module);

// // const app = express();



// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
configDotenv();
const app = express();
// const PORT =  5001;

connectDB()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`dbserver is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("ERROR",error);
    process.exit(1);
})
app.use(express.json());
// Import Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";
// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
// Middleware to parse JSON
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
    
    

    
    // Home route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
