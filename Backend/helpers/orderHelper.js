const axios = require('axios');
const crypto = require('crypto');
const CryptoJS = require('crypto-js')


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
        timestamp: Date.now()
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

// -----------Place order for Bingx exchange ----------------------- 

const placeBingXOrder = async (apiKey, apiSecret, orderPayload) => {
    try {
        console.log("Reached here...");
        const timestamp = Date.now().toString();
        console.log(orderPayload);

        let payload = {
            symbol: orderPayload.symbol,
            side: orderPayload.side,
            positionSide: orderPayload.positionSide,
            type: orderPayload.type,
            quantity: orderPayload.quantity
        };

        // Add optional parameters based on order type
        if (orderPayload.type === 'TAKE_PROFIT_MARKET' || orderPayload.type === 'STOP_MARKET') {
            payload.stopPrice = orderPayload.stopPrice;
        }

        if (orderPayload.type === 'TAKE_PROFIT_MARKET') {
            payload.price = orderPayload.price;
            payload.workingType = 'MARK_PRICE';
        }

        payload.timestamp = timestamp;

        console.log("Payload:", payload);

        const signature = generateBingXSignature(apiSecret, timestamp, payload);

        const config = {
            method: 'post',
            url: 'https://open-api.bingx.com/openApi/swap/v2/trade/order/test',
            headers: {
                'X-BX-APIKEY': apiKey,
                'X-BX-SIGNATURE': signature,
                'Content-Type': 'application/json'
            },
            data: payload,
        };

        console.log("Request Config:", config);
        const response = await axios(config);
        console.log('BingX Order Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error placing order with BingX API:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to generate BingX signature
function generateBingXSignature(apiSecret, timestamp, payload) {
    const queryString = `recvWindow=0&symbol=${payload.symbol}&timestamp=${timestamp}`;
    const hmac = crypto.createHmac('sha256', apiSecret);
    hmac.update(queryString);
    return hmac.digest('hex');
}



function generateBybitSignature(apiKey, apiSecret, timestamp, recvWindow, orderPayload) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}side=${orderPayload.side}&symbol=${orderPayload.symbol}&orderType=${orderPayload.orderType}&qty=${orderPayload.qty}`;
    return crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
}

module.exports = {
    placeBybitOrder,
    placeCoinDCXOrder,
    placeBingXOrder,
};
