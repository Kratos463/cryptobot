const User = require('../model/userModel')
const ApiError = require('../utils/ApiError');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');




//------------validate user input---------------

const validateUserInput = (userData) => {
    const {
        fullName, email, password } = userData;
    if
        ([fullName, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }
}

// -----------Check the user exists--------------

const checkUserExists = async (fullname, email) => {
    const existedUser = await User.findOne({
        $or: [{ fullname }, { email }]
    }).lean().exec();
    
    return existedUser !== null;
}



// -----------Save new user to Database------------

const saveNewUser = async (userData) => {

    const user = new User({
        ...userData,

    });
    await user.save();
    return user;
}


// --------Retreive the user without the password----------

const getCreatedUser = async (userId) => {
    const createdUser = await User.findById(userId).select("-password").lean().exec();
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return createdUser;
};

// --------Generating verification token for email verification -----------

function generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}

// -------sending verification email----------

const   sendVerificationEmail = async (email, verificationToken) => {
    // creating node mailer transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    // sending verification email
    let info = await transporter.sendMail({
        from: '"Cryptobot" noreply@shopatrno.com',
        to: email,
        subject: 'Verify Your Email Address',
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Email Verification</h2>
        <p>Dear User,</p>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <p style="text-align: center;">
        <a href="http://localhost:3000/Registration/VerifyEmailPage?token=${verificationToken}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </p>
        <p>If the button above doesn't work, copy and paste the following link into your web browser:</p>
        <p style="word-wrap: break-word;"><a href="http://localhost:3000/Registration/VerifyEmailPage?token=${verificationToken}" style="color: #4CAF50;">http://localhost:8001/verify-email?token=${verificationToken}</a></p>
        <p>Best regards,<br>The CryptoBot Team</p>
        <hr style="border: 1px solid #4CAF50;">
        <p style="font-size: 12px; color: #777;">If you did not create an account, please ignore this email.</p>
    </div>`
    });

    console.log('Verification email sent:', info.messageId);

}

// ------ verify token ---------------

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        
        req.user = decoded;
          next();
            
    });
};





module.exports = {
    validateUserInput,
    checkUserExists,
    saveNewUser,
    getCreatedUser,
    generateVerificationToken,
    sendVerificationEmail,
    verifyToken

}