const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const qrcode = require('qrcode-svg');
const OTPAuth = require('otpauth');

const generateSecret = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.twofaEnabled) {
            return res.status(400).json({
                message: '2FA already verified and enabled',
                twofaEnabled: user.twofaEnabled,
            });
        }

        const secret = new OTPAuth.Secret({ issuer: 'Cryptobot' });
        user.twofaSecret = secret.base32;
        await user.save();

        const totp = new OTPAuth.TOTP({ secret, issuer: 'Cryptobot', label: user.email });

        const qrCode = new qrcode({
            content: totp.toString(),
            padding: 4,
            width: 200,
            height: 200,
            color: '#000000',
            background: '#ffffff',
        });

        const qrImageDataUrl = qrCode.svg();

        return res.json({
            message: '2FA secret generation successful',
            secret: secret.base32,
            qrImageDataUrl: qrImageDataUrl,
            twofaEnabled: user.twofaEnabled,
        });
    } catch (error) {
        console.error('Error generating 2FA secret:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const verify_otp = asyncHandler(async (req, res) => {
    
    const userId = req.user.userId;
    const { otp } = req.body;
    
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.twofaSecret) {
            return res.status(400).json({ message: '2FA not set up for this user' });
        }

        const secret = OTPAuth.Secret.fromBase32(user.twofaSecret);

        const totp = new OTPAuth.TOTP({
            secret: secret,
        });

        const generatedToken = totp.generate();

        const isValid = totp.validate({
            token: otp,
            window: 1,
        });
        
        if (isValid === null) {
            return res.status(400).json({ message: 'Invalid OTP token' });
        }
        user.is2FAEnabled = true;
        await user.save();
       
        return res.json({
            success: '2FA verification successful',
            twofaEnabled: user.twofaEnabled,
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    generateSecret,
    verify_otp
};
