const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Enables CORS
app.use(morgan("dev")); // Logs HTTP requests
app.use(helmet()); // Secures HTTP headers

// Routes
app.use("/api", routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
