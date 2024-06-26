const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const axios = require('axios');
const crypto = require('crypto');

const handleWebhook = asyncHandler(async (req, res) => {
    const { userId, botId } = req.params;
    const { action } = req.body; // Assuming the webhook sends a JSON body with the 'action' field ('buy' or 'sell')
    console.log(userId, botId);

    try {
        // Fetch the bot details
        const bot = await Bot.findOne({ _id: botId });

        if (!bot) {
            console.log("No bot found..");
            return res.status(404).send('Bot not found');
        }

        console.log("Found bot:", bot);


        const { cryptoPair, strategy, leverage } = bot;

        const side = action.toLowerCase() === 'buy' ? 'Buy' : 'Sell';

        const orderType = 'Market';
        const qty = '1';

        // Generate API signature
        const apiKey = process.env.BYBIT_API_KEY;
        const apiSecret = process.env.BYBIT_API_SECRET;
        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const signature = generateSignature(apiKey, apiSecret, timestamp, recvWindow, side, cryptoPair, orderType, qty);

        // Prepare order payload
        const orderPayload = {
            category: strategy.toLowerCase(), // e.g., 'linear' for futures
            symbol: cryptoPair,
            side,
            orderType,
            qty,
            timeInForce: 'GTC',
            positionIdx: 0,
        };

        // Configure Axios request
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
            return res.status(400).send('Failed to place order on Bybit');
        }

        console.log('Order placed successfully:', response.data);
        return res.status(200).send('Webhook processed and order placed successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
});

function generateSignature(apiKey, apiSecret, timestamp, recvWindow, side, symbol, orderType, qty) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}side=${side}&symbol=${symbol}&orderType=${orderType}&qty=${qty}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
    return signature;
}

module.exports = {
    handleWebhook
};
