import Product from "../models/product.model.js";
import cloudinary from "../utils/Cloudinary.js"; // Cloudinary Config File

// Create a new product with Cloudinary image upload
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;

    // Upload product image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });
      imageUrl = result.secure_url;
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image: imageUrl, // Save Cloudinary image URL
    });

    await product.save();
    console.log("✅ Product Saved:", product);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product details with optional Cloudinary image upload
export const updateProduct = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // Handle Cloudinary image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });

      updatedData.image = result.secure_url; // Update image URL
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product (also deletes image from Cloudinary)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove image from Cloudinary if exists
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; // Extract Cloudinary public ID
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
