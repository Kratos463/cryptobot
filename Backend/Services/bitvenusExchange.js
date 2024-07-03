const axios = require('axios');
const crypto = require('crypto');

const testBitvenusApiConnection = async (apiKey, apiSecret) => {
    console.log("bitvenus reached......")
    try {
        const timestamp = Date.now();
        const recvWindow = 20000;
        const signature = generateSignature(apiSecret, `timestamp=${timestamp}&recvWindow=${recvWindow}`);

        const config = {
            method: 'get',
            url: `${process.env.BITVENUS_API_BASE_URL}/openapi/v1/account`,
            headers: {
                'X-BV-API-KEY': apiKey,
                'X-BV-API-TIMESTAMP': timestamp,
                'X-BV-API-RECV-WINDOW': recvWindow,
                'X-BV-API-SIGNATURE': signature,
            },
            params: {
                recvWindow,
                timestamp,
            }
        };

        console.log('Generated Signature:', signature);
        console.log('Axios Config:', config);

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from Bitvenus API');
            return { success: false, message: 'Empty response from Bitvenus API' };
        }

        console.log('Bitvenus API Response:', response.data);
        return { success: true, message: 'API connection to Bitvenus successful', data: response.data };
    } catch (error) {
        console.error('Error testing Bitvenus API connection:', error.message);
        return { success: false, message: 'Failed to connect to Bitvenus API', error: error.message };
    }
};

function generateSignature(apiSecret, queryString) {
    const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
    return signature;
}

module.exports = {
    testBitvenusApiConnection
};
