const axios = require('axios');
const crypto = require('crypto');


const testXtApiConnection = async (apiKey, apiSecret) => {
    try {
        const symbol = 'btc_usdt';
        const timestamp = Date.now();
        const recvWindow = 5000; // Optional parameter
        const path = `/spot/v4/balance`;
        const queryString = `symbol=${symbol}&timestamp=${timestamp}&recvWindow=${recvWindow}`;
        const signaturePayload = `${path}#${queryString}`;
        const signature = crypto.createHmac('sha256', apiSecret).update(signaturePayload).digest('hex');

        const config = {
            method: 'get',
            url: `${process.env.XT_COM_API_BASE_URL}${path}`,
            headers: {
                'validate-appkey': apiKey,
                'validate-timestamp': timestamp,
                'validate-signature': signature,
                'validate-recvwindow': recvWindow,
            },
            params: {
                symbol: symbol,
                timestamp: timestamp,
                recvWindow: recvWindow,
            }
        };

        console.log('Generated Signature:', signature);
        console.log('Axios Config:', config);

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from XT.com API');
            return { success: false, message: 'Empty response from XT.com API' };
        }

        console.log('XT.com API Response:', response.data);
        return { success: true, message: 'API connection to XT.com successful', data: response.data };
    } catch (error) {
        console.error('Error fetching asset from XT.com:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Failed to connect to XT.com API', error: error.message };
    }
};

module.exports = { testXtApiConnection };
