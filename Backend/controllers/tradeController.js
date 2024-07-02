const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const { findExchangeConfigbyId } = require('../helpers/exchangeConfigHelper');
const ShortIdMapping = require('../model/shortIdMapping');
const { placeBybitOrder, placeCoinDCXOrder } = require('../helpers/orderHelper');

const handleWebhook = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    try {
        // Find the bot ID and user ID by the mapping
        const mapping = await ShortIdMapping.findOne({ shortId });
        if (!mapping) {
            return res.status(404).send('Invalid short ID');
        }

        const { userId, botId } = mapping;
        console.log("userid and botid",userId, botId)

        // Get details from the webhook URL
        const { symbol, side, qty, price, orderType, stopLoss, takeProfit } = req.body;
        const bot = await Bot.findOne({ _id: botId });

        if (!bot) {
            console.log("Bot not found..");
            return res.status(404).send('Bot not found');
        }
console.log("bot is",bot)
        // Extract details from the bot
        const { exchangeConfig, category, isLeverage } = bot;

        // Get the exchange API key and secret
        const { apiKey, apiSecret, exchangeName } = await findExchangeConfigbyId(exchangeConfig);
        console.log(exchangeName)

        // Order payload
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

        let response;
        if (exchangeName === 'Bybit') {
            response = await placeBybitOrder(apiKey, apiSecret, orderPayload);
        } else if (exchangeName === 'CoinDCX') {
            response = await placeCoinDCXOrder(apiKey, apiSecret, orderPayload);
        } else {
            return res.status(400).send('Unsupported exchange');
        }

        console.log('Order placed successfully:', response);
        return res.status(200).send('Webhook processed and order placed successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = {
    handleWebhook
};
