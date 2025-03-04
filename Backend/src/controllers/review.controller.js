const Review = require('../models/review.model');

exports.addReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;
        const review = new Review({ product: productId, user: userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
