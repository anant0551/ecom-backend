import Cart from '../models/cart.model.js'

// Add a product to the cart
export const addToCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;

        // ✅ Check if required fields exist
        if (!productId || !userId) {
            return res.status(400).json({ message: "productId and userId are required" });
        }

        // ✅ Create a new cart item
        const cartItem = new Cart({ productId, userId, quantity: quantity || 1 });
        await cartItem.save();

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch all cart items
export const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true, runValidators: true });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
