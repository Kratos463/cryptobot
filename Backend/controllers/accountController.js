const asyncHandler = require('express-async-handler');
const axios = require('axios');
const crypto = require('crypto');
const { findExchangeConfig } = require('../helpers/exchangeConfigHelper');



// -------Fetching the wallet Balance----------

const getAccountBalance = asyncHandler(async (req, res) => {
    console.log("Handler reached...");

   
    const { exchangeName, strategyType, accountType, coin } = req.body;

    const userId = req.user.userId;

    try {
        const { apiKey, apiSecret } = await findExchangeConfig(userId, exchangeName);
        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const signature = generateSignature(apiKey, apiSecret, timestamp, recvWindow, accountType, coin);

        const config = {
            method: 'get',
            url: `${process.env.BYBIT_API_BASE_URL}/v5/account/wallet-balance`,
            headers: {
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': recvWindow,
                'X-BAPI-SIGN': signature,
            },
            params: {
                accountType,
                coin,
            }
        };

        const response = await axios(config);
        const totalWalletBalance = response.data.result.list[0].totalWalletBalance;

        res.json({ balance: totalWalletBalance});
        console.log(totalWalletBalance);

    } catch (error) {
        console.error('Failed to fetch account balance:', error.message);
        res.status(500).json({ error: 'Failed to fetch account balance' });
    }
});


function generateSignature(apiKey, apiSecret, timestamp, recvWindow, accountType, coin) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}accountType=${accountType}&coin=${coin}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
    return signature;
}


module.exports = {
    getAccountBalance
};
