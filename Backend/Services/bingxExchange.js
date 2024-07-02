const axios = require('axios');
const CryptoJS = require('crypto-js');

const testBingXApiConnection = async (apiKey, apiSecret) => {
    try {
        // Step 1: Fetch server time from BingX API
        const serverTimeUrl = `${process.env.BINGX_API_BASE_URL}/openApi/swap/v2/server/time`;
        const serverTimeResponse = await axios.get(serverTimeUrl);
        const serverTime = serverTimeResponse.data.data.serverTime.toString(); 

        // Step 2: Generate signature using fetched timestamp
        const signature = generateSignature(apiSecret, serverTime);

        // Step 3: Make the actual API request
        const balanceUrl = `${process.env.BINGX_API_BASE_URL}/openApi/swap/v2/user/balance`;
        const config = {
            method: 'get',
            url: balanceUrl,
            headers: {
                'X-BX-APIKEY': apiKey,
                'X-BX-TIMESTAMP': serverTime,
                'X-BX-SIGNATURE': signature,
            },
        };

        console.log('Axios Config:', config);

        const response = await axios(config);

        console.log('Response Status:', response.status);
        console.log('BingX API Response:', response);

        return { success: true, message: 'API connection to BingX successful' };
    } catch (error) {
        console.error('Error testing BingX API connection:', error.message);
        return { success: false, message: 'Failed to connect to BingX API', error: error.message };
    }
};

function generateSignature(apiSecret, timestamp) {
    const data = `timestamp=${timestamp}`;
    const hash = CryptoJS.HmacSHA256(data, apiSecret);
    return hash.toString(CryptoJS.enc.Hex);
}

module.exports = {
    testBingXApiConnection
};
