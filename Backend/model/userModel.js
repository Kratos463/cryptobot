const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10;

const userSchema = new mongoose.Schema(

    {
        fullName: {
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
                    // Password must be at least 8 characters long and contain at least one uppercase letter,
                    // one lowercase letter, one special character, and one number
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.`
            }

        },
        phone: {
            type: String,
            required: true,

        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        idFront: {
            type: String,
            required: false,
        },
        idBack: {
            type: String,
            required: false,
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
         emailVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        createdAt: {
             type: Date,
              default: Date.now,
               expires: '1d' }
    }



)
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



const user = mongoose.model('User', userSchema)
module.exports = user;