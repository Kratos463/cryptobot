const axios = require('axios');
const crypto = require('crypto');


const testBybitApiConnection = async (apiKey, apiSecret) => {
    try {
        console.log(process.env.BYBIT_API_BASE_URL)
        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const signature = generateSignature(apiKey, apiSecret, timestamp, recvWindow);

        const config = {
            method: 'get',
            url: `${process.env.BYBIT_API_BASE_URL}/v5/user/query-api`,
            headers: {
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': recvWindow,
                'X-BAPI-SIGN': signature,
            }
        };

        console.log('Generated Signature:', signature);
        console.log('Axios Config:', config);

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from Bybit API');
            return { success: false, message: 'Empty response from Bybit API' };
        }

        if (response.data.retCode !== 0) {
            console.error('Bybit API Error:', response.data.retMsg);
            return { success: false, message: response.data.retMsg };
        }

        console.log('Bybit API Response:', response.data);
        return { success: true, message: 'API connection to Bybit successful' };
    } catch (error) {
        console.error('Error testing Bybit API connection:', error.message);
        return { success: false, message: 'Failed to connect to Bybit API', error: error.message };
    }
};

function generateSignature(apiKey, apiSecret, timestamp, recvWindow) {
    const paramStr = `${timestamp}${apiKey}${recvWindow}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(paramStr).digest('hex');
    return signature;
}

module.exports = {
    testBybitApiConnection
};
