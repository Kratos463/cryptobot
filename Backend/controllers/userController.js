const asyncHandler = require('express-async-handler');
const User = require('../model/userModel')
const ApiResponse = require('../utils/ApiResponse')
const temporaryUserStore = require('../helpers/temporaryUserStore')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');


const {
    validateUserInput,
    checkUserExists,
    saveNewUser,
    getCreatedUser,
    generateVerificationToken,
    sendVerificationEmail,
    verifyToken,
} = require('../helpers/userhelper');

// -----------sending email vericafication----------

const Emailverification = asyncHandler(async (req, res) => {

    const { email } = req.body;
    const verificationToken = generateVerificationToken();
    temporaryUserStore.set(verificationToken, { email, verified: false });
    await sendVerificationEmail(email, verificationToken);
    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
})


// -------------------User Registration------------------------------

const registerUser = asyncHandler(async (req, res) => {

    const { fullname, email, password } = req.body;
    const userExists = await checkUserExists(fullname, email);
    if (userExists) {

        return res.status(400).json({ message: "User with email or username already exists" });
    }
    let createdUser;
    try {
        createdUser = await User.create({ fullname, email, password });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Failed to register user. Please try again later.' });
    }
    // for (const [token, user] of temporaryUserStore.entries()) {
    //     if (user.email === email) {
    //         temporaryUserStore.delete(token);
    //     }
    // }


    res.status(201).json({
        message: 'User registered successfully.',
        user: createdUser,

    });
});



// ----------------email verification-----------------

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    try {
        const userData = temporaryUserStore.get(token);

        if (!userData) {
            return res.status(404).json({ message: 'Invalid or expired verification token' });
        }

        const user = await User.findOne({ email: userData.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.emailVerified = true;
        await user.save();

        // Remove the token from the temporary store after successful verification
        temporaryUserStore.delete(token);

        const styledMessage = `
      <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50; font-size: 22px; margin-bottom: 10px;">Email Verified Successfully</h2>
        <p style="font-size: 16px; line-height: 1.5;"> You can now proceed to log in.</p>
      </div>
    `;

        return res.status(200).json({ message: styledMessage });

    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




// -------------------Check email verification--------------------------


const checkEmail = asyncHandler(async (req, res) => {

    const { email } = req.body;
    const user = Array.from(temporaryUserStore.values()).find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    if (user.verified) {
        return res.status(200).json({ verified: true });
    } else {
        return res.status(200).json({ verified: false });
    }
})

// -------------------Login user--------------------

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(!user.isBlock){
        return res.status(401).json({message:"Accesss denied"})
    }
    if (!user.emailVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Token expiration time
    );

    res.status(200).json({ token, user });
});


// -------------fetching user Data--------------


const userData = (req, res) => {

    const userId = req.user.userId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
}



// ------------Logout----------------

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });

})


// --------Update user profile---------------

const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { fullname, phone, address, country, state, city, zipcode } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullname = fullname || user.fullname;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.country = country || user.country;
        user.state = state || user.state;
        user.city = city || user.city;
        user.zipcode = zipcode || user.zipcode;

        const updatedUser = await user.save();

        res.status(200).json({
            message: 'User profile updated successfully.',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Failed to update user profile. Please try again later.' });
    }
});



module.exports = {
    registerUser,
    verifyEmail,
    Emailverification,
    checkEmail,
    loginUser,
    userData,
    logout,
    updateUserProfile,
}
