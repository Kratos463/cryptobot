const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const axios = require('axios');
const crypto = require('crypto');
const { findExchangeConfigbyId } = require('../helpers/exchangeConfigHelper')

const handleWebhook = asyncHandler(async (req, res) => {
    const { userId, botId } = req.params;
    const { action } = req.body; // Assuming the webhook sends a JSON body with the 'action' field ('buy' or 'sell')
    console.log(userId, botId);

    try {
        // Fetch the bot details
        const bot = await Bot.findOne({ _id: botId });
        if (!bot) {
            console.log("Bot not found..");
            return res.status(404).send('Bot not found');
        }
        console.log("Found bot:", bot);

        const { cryptoPair, strategy, orderType, orderQuantity, exchangeConfig, leverage } = bot;
        const { apiKey, apiSecret } = await findExchangeConfigbyId(exchangeConfig);
        const side = action.toLowerCase() === 'buy' ? 'Buy' : 'Sell';


        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const signature = generateSignature(apiKey, apiSecret, timestamp, recvWindow, side, cryptoPair, orderType, orderQuantity);


        const orderPayload = {
            category: strategy.toLowerCase(), //  'linear' for futures
            symbol: cryptoPair,
            side,
            orderType,
            qty: orderQuantity,
            timeInForce: 'GTC',
            positionIdx: 0,
        };

        const config = {
            method: 'post',
            url: `${process.env.BYBIT_API_BASE_URL}/v5/order/create`,
            headers: {
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': recvWindow,
                'X-BAPI-SIGN': signature,
            },
            data: orderPayload
        };

        // Send order request to Bybit
        const response = await axios(config);

        if (response.data.retCode !== 0) {
            console.error('Bybit API Error:', response.data.retMsg);
            return res.status(400).send('Failed to place order on Bybit',);
        }

        console.log('Order placed successfully:', response.data);
        return res.status(200).send('Webhook processed and order placed successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
});

function generateSignature(apiKey, apiSecret, timestamp, recvWindow, side, symbol, orderType, orderQuantity) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}side=${side}&symbol=${symbol}&orderType=${orderType}&qty=${orderQuantity}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
    return signature;
}

module.exports = {
    handleWebhook
};
