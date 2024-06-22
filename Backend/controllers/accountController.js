
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const User = require('../model/userModel'); 
const { findExchangeConfig } = require('../helpers/exchangeConfigHelper');

// ---------Get Account Balance from Bybit----------------

const getAccountBalance = asyncHandler(async (req, res) => {
    const { exchangeName, strategyType } = req.body;
    const userId = req.user.userId; 

    try {
        const { apiKey, apiSecret } = await findExchangeConfig(userId, exchangeName);
        
        const endpoint = strategyType === 'Futures' ? '/v2/private/wallet/balance' : '/v2/private/wallet/balance';
        const baseUrl = exchangeName === 'mainnet' ? 'https://api.bybit.com' : 'https://api-testnet.bybit.com';
        const url = `${baseUrl}${endpoint}`;

        const timestamp = Date.now();
        const params = `api_key=${apiKey}&timestamp=${timestamp}`;
        const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');

        const response = await axios.get(url, {
            headers: {
                'X-BYBIT-APIKEY': apiKey,
                'X-BYBIT-TIMESTAMP': timestamp,
                'X-BYBIT-SIGNATURE': signature
            },
            params: {
                api_key: apiKey,
                timestamp,
                sign: signature
            }
        });

        res.json({ balance: response.data.result });
    } catch (error) {
        console.error('Failed to fetch account balance:', error.message);
        res.status(500).json({ error: 'Failed to fetch account balance' });
    }
});

module.exports = {
    getAccountBalance
};
