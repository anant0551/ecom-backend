const Cart = require('../models/cart.model');

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cartItem = new Cart({ user: userId, product: productId, quantity });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id }).populate('product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
