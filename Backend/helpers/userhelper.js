const User = require('../model/userModel')
const ApiError = require('../utils/ApiError')


//------------validate user input---------------

const validateUserInput = (userData) => {
  

    const {
        fullName, email, password, dateOfBirth, phone, country, state } = userData;
    if
        ([fullName, email, password, dateOfBirth, phone, country, state].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }
}

// -----------Check the user exists--------------

const checkUserExists = async (fullName, email) => {

    const existedUser = await User.findOne({
        $or: [{ fullName }, { email }]
    }).lean().exec();
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

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


module.exports = {
    validateUserInput,
    checkUserExists,
    saveNewUser,
    getCreatedUser
}