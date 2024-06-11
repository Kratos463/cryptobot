const asyncHandler = require('express-async-handler');
const ApiResponse = require('../utils/ApiResponse')
const {
    validateUserInput,
    checkUserExists,
    saveNewUser,
    getCreatedUser } = require('../helpers/userhelper');



const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password, dateOfBirth, phone, country, state } = req.body;
    
    validateUserInput({ fullName, email, password, dateOfBirth, phone, country, state });

    await checkUserExists(fullName, email);

    const user = await saveNewUser({ fullName, email, password, dateOfBirth, phone, country, state, });

    const createdUser = await getCreatedUser(user._id);

    return res.status(201).json(new ApiResponse(200, "User Created", createdUser));
});

module.exports = {
    registerUser
}
