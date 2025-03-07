import User  from '../models/user.model.js'
import bcrypt  from 'bcryptjs'
import jwt  from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        console.log("📝 Received Data:", req.body); // Debugging log

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("⚠️ User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Hashed Password:", hashedPassword);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        
        console.log("🔥 Saved User to MongoDB:", savedUser); // Check if user is saved

        res.status(201).json({ message: "User registered successfully!", user: savedUser });
    } catch (error) {
        console.error("❌ Error Saving User:", error);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Include isAdmin in the token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },  // Add isAdmin
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
