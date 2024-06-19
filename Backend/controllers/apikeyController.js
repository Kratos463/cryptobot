const asyncHandler = require('express-async-handler');
const ApiKey = require('../model/apiKey');

const Apikeysave = asyncHandler(async (req, res) => {
    console.log("its reached here....", req.user);

    const { apiKey, apiSecret } = req.body;
   
    const existingKey = await ApiKey.findOne({ userId: req.user.userId });
   

    if (existingKey) {
        existingKey.apiKey = apiKey;
        existingKey.apiSecret = apiSecret;
        await existingKey.save();
    } else {
        const newKey = new ApiKey({ userId: req.user.userId, apiKey, apiSecret });
        await newKey.save();
    }
    res.json({ success: true, message: 'API Key saved' });
});

module.exports = {
    Apikeysave
};
