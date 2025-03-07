import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No valid token provided.' });
        }

        // Extract token (removing 'Bearer ')
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next(); // Continue to next middleware
    } catch (error) {
        console.error("❌ Authentication Error:", error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
