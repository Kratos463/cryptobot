const asyncHandler = require('express-async-handler');
const ExchangeConfig = require('../model/exchangeConfigModel');
const { testBybitApiConnection } = require('../utils/apiUtils');
const {getAccountInformation} = require('../utils/GetAccountinfo')

const Apikeysave = asyncHandler(async (req, res) => {
    const { exchangeName, apiKey, apiSecret } = req.body;

   
    if (!exchangeName || !apiKey || !apiSecret) {
        return res.status(400).json({ success: false, message: 'Exchange name, API key, and API secret are required' });
    }

    const testResult = await getAccountInformation(apiKey, apiSecret);
    if (!testResult.success) {
        return res.status(400).json({ success: false, message: 'Failed to test Bybit API connection', error: testResult.message });
    }

    if (testResult.message === 'Invalid API key provided') {
        return res.status(400).json({ success: false, message: 'Invalid API key provided' });
    }

    // Check if there's an existing configuration for this exchange and user
    let existingConfig = await ExchangeConfig.findOne({ userId: req.user.userId, exchangeName });

    if (existingConfig) {
        // Exchange configuration already exists, update API key and secret
        existingConfig.apiKey = apiKey;
        existingConfig.apiSecret = apiSecret;
        await existingConfig.save();
        return res.json({ success: true, message: 'API Key updated' });
    } else {
        // No existing configuration found, create a new one
        const newConfig = new ExchangeConfig({ userId: req.user.userId, exchangeName, apiKey, apiSecret });
        existingConfig = await newConfig.save();
        return res.json({ success: true, message: 'API Key saved' });
    }
});




const getApiconfig =asyncHandler(async(req,res)=>{
    const { userId, exchangeName } = req.body;

    try {
        const config = await ExchangeConfig.findOne({ userId, exchangeName });
        if (!config) {
            return res.status(404).json({ error: 'Exchange configuration not found' });
        }
        res.json(config);
    } catch (err) {
        console.error('Error fetching exchange configuration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = {
    Apikeysave,
    getApiconfig
};
