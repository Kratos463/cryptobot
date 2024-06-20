const asyncHandler = require('express-async-handler');
const ExchangeConfig = require('../model/exchangeConfigModel');


// --------Saving the exchange and apikey &secret-------------


const Apikeysave = asyncHandler(async (req, res) => {
    
        const { exchangeName, apiKey, apiSecret } = req.body;
    if (!exchangeName || !apiKey || !apiSecret) {
        return res.status(400).json({ success: false, message: 'Exchange name, API key, and API secret are required' });
    }

    const existingKey = await ExchangeConfig.findOne({ userId: req.user.userId, exchangeName });

    if (existingKey) {
        existingKey.apiKey = apiKey;
        existingKey.apiSecret = apiSecret;
        await existingKey.save();
    } else {
        const newKey = new ExchangeConfig({ userId: req.user.userId, exchangeName, apiKey, apiSecret });
        await newKey.save();
    }
    res.json({ success: true, message: 'API Key saved' });
});

module.exports = {
    Apikeysave
};
