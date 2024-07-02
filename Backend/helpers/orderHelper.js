const axios = require('axios');
const crypto = require('crypto');

// -------Order place to bybit exchange-------------

const placeBybitOrder = async (apiKey, apiSecret, orderPayload) => {
    const timestamp = Date.now().toString();
    const recvWindow = '20000';
    const signature = generateBybitSignature(apiKey, apiSecret, timestamp, recvWindow, orderPayload);

    const config = {
        method: 'post',
        url: `${process.env.BYBIT_API_BASE_URL}/v5/order/create`,
        headers: {
            'X-BAPI-API-KEY': apiKey,
            'X-BAPI-TIMESTAMP': timestamp,
            'X-BAPI-RECV-WINDOW': recvWindow,
            'X-BAPI-SIGN': signature,
        },
        data: {
            symbol: orderPayload.symbol,
            side: orderPayload.side,
            orderType: orderPayload.orderType,
            qty: orderPayload.qty,
            price: orderPayload.price,
            timeInForce: orderPayload.timeInForce,
            stopLoss: orderPayload.stopLoss,
            takeProfit: orderPayload.takeProfit,
            positionIdx: orderPayload.positionIdx,
        }
    };

    const response = await axios(config);

    if (response.data.retCode !== 0) {
        throw new Error(`Bybit API Error: ${response.data.retMsg}`);
    }

    return response.data;
};

// ----------Order placing to CoinDCX --------------------

const placeCoinDCXOrder = async (apiKey, apiSecret, orderPayload) => {
    const timestamp = Date.now();
    const payload = {
        side: orderPayload.side,
        order_type: orderPayload.orderType,
        market: orderPayload.symbol,
        price_per_unit: orderPayload.price,
        total_quantity: orderPayload.qty,
        timestamp:Date.now()
    };

    const payloadJSON = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', apiSecret).update(payloadJSON).digest('hex');

    const headers = {
        'Content-Type': 'application/json',
        'X-AUTH-APIKEY': apiKey,
        'X-AUTH-SIGNATURE': signature,
    };

    const config = {
        method: 'post',
        url: `${process.env.COINDCX_API_BASE_URL}/exchange/v1/orders/create`,
        headers,
        data: payload,
    };

    const response = await axios(config);

    if (response.data.message !== 'Order placed successfully') {
        throw new Error(`CoinDCX API Error: ${response.data.message}`);
    }

    return response.data;
};

function generateBybitSignature(apiKey, apiSecret, timestamp, recvWindow, orderPayload) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}side=${orderPayload.side}&symbol=${orderPayload.symbol}&orderType=${orderPayload.orderType}&qty=${orderPayload.qty}`;
    return crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
}

module.exports = {
    placeBybitOrder,
    placeCoinDCXOrder,
};
