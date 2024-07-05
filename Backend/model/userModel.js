const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.`,
        },
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    zipcode: {
        type: String,
    },
    secretKey: {
        type: String,
    },
    is2FAEnabled: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    twofaSecret: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    bots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bot',
    }],
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
