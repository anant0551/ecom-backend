const Product = require('../models/product.model');

const createProduct = async (productData) => {
    return await Product.create(productData);
};

const getProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
