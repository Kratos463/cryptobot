const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10;

const userSchema = new mongoose.Schema(

    {
        fullName:{
            type:String,
            required:true,
            trim:true,

        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,

        },
        phone:{
            type:String,
            required:true,

        },
        country:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        idFront:{
            type:String,
            required:false,
        },
        idBack:{
            type:String,
            required:false,
        },
        dateOfBirth:{
            type:Date,
            required:true
        }

    }



)
// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
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



const user =mongoose.model('User',userSchema)
module.exports=user;