const asyncHandler = require('express-async-handler');
const User = require('../../model/userModel');


// -----------Fetching user list -----------

const UserList = asyncHandler(async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json({ userData });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error in fetching Users' })

    }
})

// ------------Blocking user -----------

const Block_user = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
    const { isBlock } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Failed to fetch user' })
        }
        user.isBlock = isBlock;
        await user.save();
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'failed to update user' })
    }

})

module.exports = { UserList,Block_user }