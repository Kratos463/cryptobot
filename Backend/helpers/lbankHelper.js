const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const HmacSHA256_Sign = (preparedStr, secretKey) => {
    const sha256_HMAC = crypto.createHmac('sha256', secretKey);
    const hash = sha256_HMAC.update(preparedStr).digest('hex');
    return hash;
};

const generateEchostr = () => {
    return uuidv4().replace(/-/g, '').substring(0, 30); // Generating a 30 character string
};

// -----------Placing  order in lBank---------

const placeLBankOrder = async (apiKey, apiSecret, orderPayload) => {
    try {
        const timestamp = Date.now().toString();
        const echostr = generateEchostr();
        const signatureMethod = 'HmacSHA256';

        // Extract symbol information from the symbol object
        const symbolName = orderPayload.symbol;
     
        const params = {
            api_key: apiKey,
            symbol: symbolName,
            type: orderPayload.type,
            price: orderPayload.price,
            amount: orderPayload.quantity,
            timestamp: timestamp,
            echostr: echostr,
            signature_method: signatureMethod,
        };

        const paramString = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');

        // MD5 digest
        const preparedStr = crypto.createHash('md5').update(paramString).digest('hex').toUpperCase();

        // Generate the signature
        const sign = HmacSHA256_Sign(preparedStr, apiSecret);
        params.sign = sign;
        const data = new URLSearchParams(params).toString();

        const config = {
            method: 'post',
            url: `${process.env.LBANK_API_BASE_URL}/v2/supplement/create_order_test.do`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from LBank API');
            return { success: false, message: 'Empty response from LBank API' };
        }

        if (response.data.result === 'true') {
            return { success: true, message: 'Order placed successfully on LBank', data: response.data };
        } else {
            return { success: false, message: response.data.msg || 'Failed to place order on LBank', data: response.data };
        }
    } catch (error) {
        console.error('Error placing order with LBank API:', error.message);
        return { success: false, message: 'Failed to place order on LBank', error: error.message };
    }
};

module.exports = { placeLBankOrder };

