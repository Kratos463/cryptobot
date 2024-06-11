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



const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password, dateOfBirth, phone, country, state } = req.body;

    validateUserInput({ fullName, email, password, dateOfBirth, phone, country, state });

    await checkUserExists(fullName, email);

    const verificationToken = generateVerificationToken();

    // temporarily store user data
    temporaryUserStore.set(verificationToken, {
        fullName, email, password, dateOfBirth, phone, country, state
    });


    sendVerificationEmail(email, verificationToken);

    // const createdUser = await getCreatedUser(user._id);

    return res.status(201).json(new ApiResponse(200, "User Created", "Please verify your email address to complete registration."));
});

// ----email verification-----------------

const verifyEmail = asyncHandler(async (req, res) => {
    
    const { token } = req.query;
    try {
        const userData = temporaryUserStore.get(token);
        if (!userData) {
            return res.status(404).json({ message: 'Invalid or expired verification token' });
        }
        // after verification changing the  email verified to true
        userData.emailVerified = true;

        // Create the user in the database
        const user = await saveNewUser(userData);
        temporaryUserStore.delete(token);

        return res.status(200).json({ message: 'Email verified successfully, user created.' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = {
    registerUser,
    verifyEmail
}
