const roleMiddleware = (role) => {
    return (req, res, next) => {
        console.log("🛠 Checking Role Middleware: ", req.user); // Debugging
        if (req.user && req.user.isAdmin === true) {
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    };
};

export default roleMiddleware;
