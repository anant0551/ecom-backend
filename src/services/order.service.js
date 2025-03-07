const Order = require('../models/order.model');

const placeOrder = async (orderData) => {
    return await Order.create(orderData);
};

const getOrders = async () => {
    return await Order.find().populate('user').populate('items.product');
};

const getOrderById = async (id) => {
    return await Order.findById(id).populate('user').populate('items.product');
};

const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = { placeOrder, getOrders, getOrderById, updateOrderStatus };
