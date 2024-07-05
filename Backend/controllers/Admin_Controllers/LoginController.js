const asyncHandler = require('express-async-handler');
const User = require('../../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isAdmin = user.isAdmin === true;
        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, isAdmin });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = {
    AdminLogin
}
