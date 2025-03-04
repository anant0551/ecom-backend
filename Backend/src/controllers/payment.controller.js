const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    try {
        const { amount, token } = req.body;
        const charge = await stripe.charges.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            source: token.id,
            description: "E-commerce payment"
        });
        res.json(charge);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
