const asyncHandler = require('express-async-handler');
const CryptoPair = require('../model/cryptopairModel'); 
const ExchangeConfig = require('../model/exchangeConfigModel');
const axios = require('axios');

const getCryptoPairs = async () => {
    try {
        const response = await axios.get('https://api.bybit.com/v2/public/symbols');
        if (response.data && response.data.result) {
            return response.data.result.map(symbol => ({
                name: symbol.name,
                baseCurrency: symbol.base_currency,
                quoteCurrency: symbol.quote_currency,
                status: symbol.status
            }));
        } else {
            console.error('No data found in response');
            return [];
        }
    } catch (error) {
        console.error('Error fetching trading pairs:', error);
        return [];
    }
};

// getCryptoPairs().then(pairs => console.log(pairs));





// -----------Saving the crypto pair selected by user---------------------

const saveCryptoPair = asyncHandler(async (req, res) => {
    const { pairName, exchangeConfigId } = req.body;
    const userId = req.user.userId; 

   
    if (!pairName || !exchangeConfigId) {
        return res.status(400).json({ success: false, message: 'Pair name and exchange config ID are required' });
    }

    // Check if the exchange configuration exists
    const exchangeConfig = await ExchangeConfig.findById(exchangeConfigId);
    if (!exchangeConfig) {
        return res.status(404).json({ success: false, message: 'Exchange configuration not found' });
    }

    // Create and save the new crypto pair
    const newCryptoPair = new CryptoPair({
        pairName,
        exchangeConfig: exchangeConfigId,
        user: userId
    });

    await newCryptoPair.save();

    res.status(201).json({ success: true, message: 'Crypto pair saved successfully', cryptoPair: newCryptoPair });
});

module.exports = {
    saveCryptoPair
};
