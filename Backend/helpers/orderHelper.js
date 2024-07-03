const axios = require('axios');
const crypto = require('crypto');
const CryptoJS = require('crypto-js')
const Base64 = require('crypto-js/enc-base64');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const { v4: uuidv4 } = require('uuid');

const generateEchostr = () => {
    return uuidv4().replace(/-/g, '').substring(0, 30);
};



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

        // Fetch the server time
        const serverTimeUrl = `${process.env.BINGX_API_BASE_URL}/openApi/swap/v2/server/time`;
        const serverTimeResponse = await axios.get(serverTimeUrl);
        const timestamp = serverTimeResponse.data.data.serverTime.toString(); // Ensure timestamp is string
        console.log("Server Timestamp:", timestamp);

        // Construct payload
        let payload = {
            symbol: orderPayload.symbol,
            side: orderPayload.side,
            positionSide: orderPayload.positionSide,
            type: orderPayload.type,
            quantity: orderPayload.quantity,
            timestamp: timestamp,
            recvWindow: '5000', // Add recvWindow to payload
        };

        // Add optional parameters based on order type
        if (orderPayload.type === 'TAKE_PROFIT_MARKET' || orderPayload.type === 'STOP_MARKET') {
            payload.stopPrice = orderPayload.stopPrice;
        }

        if (orderPayload.type === 'TAKE_PROFIT_MARKET') {
            payload.price = orderPayload.price;
            payload.workingType = 'MARK_PRICE';
        }

        console.log("Payload:", payload);

        // Sort the parameters alphabetically for the queryString
        const getParameters = (payload, urlEncode) => {
            let parameters = "";
            const keys = Object.keys(payload).sort(); // Sort the keys
            keys.forEach(key => {
                if (urlEncode) {
                    parameters += key + "=" + encodeURIComponent(payload[key]) + "&";
                } else {
                    parameters += key + "=" + payload[key] + "&";
                }
            });
            if (parameters) {
                parameters = parameters.substring(0, parameters.length - 1);
            }
            return parameters;
        };

        const queryString = getParameters(payload, false); // Use unencoded parameters for signature generation
        const queryStringEncoded = getParameters(payload, true); // Use encoded parameters for URL
        console.log("Query String (Unencoded):", queryString);
        console.log("Query String (Encoded):", queryStringEncoded);
        const path = "/openApi/swap/v2/trade/order/test";


        // Generate signature using Base64 and hmacSHA256
        let originString = `POST${path}${queryString}`;
        let signature = hmacSHA256(originString, apiSecret);
        signature = Base64.stringify(signature);
        signature = encodeURIComponent(signature);
        console.log("Generated Signature:", signature);

        // Construct URL with signature
        const url = `${process.env.BINGX_API_BASE_URL}${path}?${queryStringEncoded}&signature=${signature}`;
        console.log("Request URL:", url);

        // Configure axios request
        const config = {
            method: 'post',
            url: url,
            headers: {
                'X-BX-APIKEY': apiKey,
            },
            data: payload,
            transformResponse: (resp) => {
                console.log("Original response:", resp);
                return resp;
            }
        };

        // Make API request
        const response = await axios(config);
        console.log('BingX Order Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error placing order with BingX API:', error.response ? error.response.data : error.message);
        throw error;
    }
};
// --------------Placing order for Lbank Exchange-----------------

const placeLBankOrder = async (apiKey, apiSecret, orderPayload) => {
    try {
        const timestamp = Date.now().toString();
        const echostr = generateEchostr(); // Ensure generateEchostr is defined correctly

        // Construct the request parameters
        const params = {
            api_key: apiKey,
            symbol: orderPayload.symbol,
            type: orderPayload.type,
            price: orderPayload.price,
            amount: orderPayload.amount,
            timestamp: timestamp,
            echostr: echostr,
            signature_method: 'HmacSHA256',
        };

        // Generate the signature
        const signature = generateLBankSignature(apiSecret, params);

        // Include the signature in the request parameters
        params.sign = signature;

        // Build the Axios config for the request
        const config = {
            method: 'post',
            url: 'https://api.lbkex.com/v2/supplement/create_order', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams(params).toString(),
        };

        // Make the API request
        const response = await axios(config);

        if (response.data.result !== 'true') {
            throw new Error(`LBank API Error: ${response.data.msg}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error placing order with LBank API:', error.message);
        throw error;
    }
};


const generateLBankSignature = (apiSecret, params) => {
    const orderedParams = Object.keys(params).sort().reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});

    const paramString = new URLSearchParams(orderedParams).toString();
    return crypto.createHmac('sha256', apiSecret).update(paramString).digest('hex');
};




function generateBybitSignature(apiKey, apiSecret, timestamp, recvWindow, orderPayload) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}side=${orderPayload.side}&symbol=${orderPayload.symbol}&orderType=${orderPayload.orderType}&qty=${orderPayload.qty}`;
    return crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
}

module.exports = {
    placeBybitOrder,
    placeCoinDCXOrder,
    placeBingXOrder,
    placeLBankOrder,
};
