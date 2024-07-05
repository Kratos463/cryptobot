const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const { findExchangeConfigbyId } = require('../helpers/exchangeConfigHelper');
const ShortIdMapping = require('../model/shortIdMapping');
const { placeBybitOrder,
    placeCoinDCXOrder,
    placeBingXOrder, } = require('../helpers/orderHelper');
const { placeLBankOrder } = require('../helpers/lbankHelper')

// -------Handling the webhook url----------------

const handleWebhook = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    try {
        // Find the bot ID and user ID by the mapping
        const mapping = await ShortIdMapping.findOne({ shortId });
        if (!mapping) {
            return res.status(404).send('Invalid short ID');
        }

        const { userId, botId } = mapping;

        // Get details from the webhook URL
        const { symbol,
            side,
            qty,
            price,
            orderType,
            stopLoss,
            takeProfit,
            positionSide,
            type,
            quantity, } = req.body;

        const bot = await Bot.findOne({ _id: botId });

        if (!bot) {
            console.log("Bot not found..");
            return res.status(404).send('Bot not found');
        }
        const { exchangeConfig, category, isLeverage } = bot;

        // Get the exchange API key and secret
        const { apiKey, apiSecret, exchangeName } = await findExchangeConfigbyId(exchangeConfig);

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
            positionSide,
            type,
            quantity,
            timeInForce: 'GTC',
            positionIdx: 0,
        };

        let response;
        if (exchangeName === 'Bybit') {
            response = await placeBybitOrder(apiKey, apiSecret, orderPayload);
        } else if (exchangeName === 'CoinDCX') {
            response = await placeCoinDCXOrder(apiKey, apiSecret, orderPayload);
        } else if (exchangeName === 'BingX') {
            response = await placeBingXOrder(apiKey, apiSecret, orderPayload);
        } else if (exchangeName === 'LBank') {
            response = await placeLBankOrder(apiKey, apiSecret, orderPayload);
        }
        else {
            return res.status(400).send('Unsupported exchange');
        }
        console.log('LBank API response:', response.data);

        if (response.data.success === true) {
            console.log('Order placed successfully:', response.data);
            return res.status(200).json({ success: true, message: 'Order placed successfully on LBank', data: response.data });
        } else {
            console.log('Failed to place order:', response.data.msg || 'Unknown error');
            return res.status(400).json({ success: false, message: response.data.msg || 'Failed to place order on LBank', data: response.data });
        }
        
    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = {
    handleWebhook
};
