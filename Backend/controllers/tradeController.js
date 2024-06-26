const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const axios = require('axios');
const crypto = require('crypto');
const { findExchangeConfigbyId } = require('../helpers/exchangeConfigHelper');
const ShortIdMapping = require('../model/shortIdMapping')


const handleWebhook = asyncHandler(async (req, res) => {

    const { shortId } = req.params;
    try {
        const mapping = await ShortIdMapping.findOne({ shortId });
        if (!mapping) {
            return res.status(404).send('Invalid short ID');
        }

        const { userId, botId } = mapping;
        const { symbol, side, qty, price, orderType, stopLoss, takeProfit } = req.body;
        const bot = await Bot.findOne({ _id: botId });
        
        if (!bot) {
            console.log("Bot not found..");
            return res.status(404).send('Bot not found');
        }

        const { exchangeConfig, category, isLeverage } = bot;
        const { apiKey, apiSecret } = await findExchangeConfigbyId(exchangeConfig);

        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const signature = generateSignature(apiKey, apiSecret, timestamp, recvWindow, side, symbol, orderType, qty);

        const orderPayload = {
            category,
            symbol,
            side,
            orderType,
            isLeverage,
            stopLoss,
            takeProfit,
            price,
            qty,
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
