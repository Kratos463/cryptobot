const axios = require('axios');
const CryptoJS = require('crypto-js');

const getSignature = (timestamp, method, requestPath, secretKey, body = '') => {
    const prehashString = timestamp + method.toUpperCase() + requestPath + body;
    const hash = CryptoJS.HmacSHA256(prehashString, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
};

const testDeepcoinApiConnection = async (apiKey, apiSecret, instType = 'SPOT', ccy) => {
    try {
        const timestamp = new Date().toISOString();
        const method = 'GET';
        const requestPath = '/deepcoin/account/balances';
        const body = ''; 
        const signature = getSignature(timestamp, method, requestPath, apiSecret, body);
        const apiPassphrase = 'Aleena@1234';

        const response = await axios.get(`${process.env.DEEPCOIN_API_BASE_URL}${requestPath}`, {
            params: {
                instType,
                ccy,
            },
            headers: {
                'DC-ACCESS-KEY': apiKey,
                'DC-ACCESS-TIMESTAMP': timestamp,
                'DC-ACCESS-SIGN': signature,
                'DC-ACCESS-PASSPHRASE': apiPassphrase,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching account balances:', error);
        throw error;
    }
};

module.exports = {
    testDeepcoinApiConnection
};
