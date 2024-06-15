const asyncHandler = require('express-async-handler');
const User = require('../model/userModel')
const ApiResponse = require('../utils/ApiResponse')
const temporaryUserStore = require('../helpers/temporaryUserStore')
const {
    validateUserInput,
    checkUserExists,
    saveNewUser,
    getCreatedUser,
    generateVerificationToken,
    sendVerificationEmail,
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

    const userVerified = Array.from(temporaryUserStore.values()).find(user => user.email === email && user.verified);

    if (!userVerified) {
        return res.status(400).json({ message: 'Email not verified. Please verify your email before registering.' });
    }

    const createdUser = await User.create({ fullname, email, password, emailVerified: true });
    console.log(createdUser);

    // Clean up the temporary store
    for (const [token, user] of temporaryUserStore.entries()) {
        if (user.email === email) {
            temporaryUserStore.delete(token);
        }
    }

    res.status(201).json(new ApiResponse(200, 'User registered successfully.', createdUser));
});


// ----------------email verification-----------------

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    try {
        const userData = temporaryUserStore.get(token);
       
        if (!userData) {
            return res.status(404).json({ message: 'Invalid or expired verification token' });
        }
        // after verification changing the  email verified to true
        userData.verified = true;
        temporaryUserStore.set(token, userData);
        return res.status(200).json({ message: 'Email verified successfully, user created.' });

    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// -------------------Check email verification--------------------------


const checkEmail =asyncHandler(async(req,res)=>{

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


module.exports = {
    registerUser,
    verifyEmail,
    Emailverification,
    checkEmail
}
